import { produce } from "immer";

import {
  appendMarker,
  createBoard,
  findMarker,
  removeMarker,
} from "@/models/board";
import {
  GOAL_CONQUER_TRAIL,
  getNextTurn,
  checkClimbFixable,
  isInvalidBoard,
  GAME_READY_CODE,
  DICE_GROUP_SIZE,
} from "@/models/game";
import { MAX_PICKAXES } from "@/models/pickaxe";

import type { IGame, GameStage } from "@/models/game";
import type { AllPickaxesType } from "@/models/pickaxe";
import type { BoardType } from "@/models/board";
import type { CampDictionType } from "@/models/camp";
import type { AllDices } from "@/models/dice";
import type { IPos } from "@/models/pos";
import type { AllScores } from "@/models/score";

import type { ImmerStateCreator } from "@/stores/utils/slice-utils";

interface IGameState extends IGame {
  /** 플레이어가 그룹핑 중인 또는 선택 중인 등반로의 정보 */
  trails: [number | undefined, number | undefined];
  /** 플레이어의 점수를 기록, scores[플레이어 번호]: 해당 플레이어의 점수 */
  scores: AllScores;
  /** 현제 플레이어가 설치한 곡갱이의 위치 목록 (설치 되지 않은 곡갱이는 undefined 로 표기)  */
  pickaxes: AllPickaxesType;
  /** 플레이어마다 설치한 캠프의 위치 사전, camp[플레이어 번호]: 해당 플레이어가 설치한 켐프의 위치 */
  camps: CampDictionType;
}

interface IGameDispatch {
  readyGame: () => void;
  startGame: () => void;
  rollDice: () => void;
  selectDiceGroup: (selectDiceIdx: number, groupNumber: number) => void;
  climbing: () => void;
  camping: () => void;
}

interface IGameAction extends IGameDispatch {}

export type GameSlice = IGameState & IGameAction;

/** 게임 시작 시 제일 처음 상태 */
const INIT_TURN: number = GAME_READY_CODE;
const INIT_STAGE: GameStage = "INIT_GAME";
const INIT_DICE: AllDices = [{}, {}, {}, {}];
const INIT_BOARD: BoardType = createBoard();
const INIT_SCORES: AllScores = { 1: [], 2: [], 3: [], 4: [] };
const INIT_PICKAXES: AllPickaxesType = [];
const INIT_CAMPS: CampDictionType = { 1: [], 2: [], 3: [], 4: [] };
const INIT_TRAILS: [number | undefined, number | undefined] = [
  undefined,
  undefined,
];

export const INIT_STATE: IGameState = produce(
  {
    // 주 관심사
    turn: INIT_TURN,
    stage: INIT_STAGE,
    dices: INIT_DICE,
    board: INIT_BOARD,

    // turn, dices, board로 부터 계산되어져 나온 값들
    trails: INIT_TRAILS,
    scores: INIT_SCORES,
    pickaxes: INIT_PICKAXES,
    camps: INIT_CAMPS,
  },
  (x) => x
);

export const createGameSlice: ImmerStateCreator<GameSlice> = (set, get) => ({
  ...INIT_STATE,
  readyGame: () =>
    set(
      (state) => {
        state.turn = INIT_TURN;
        state.stage = INIT_STAGE;

        state.dices = INIT_DICE;
        state.board = INIT_BOARD;

        state.scores = INIT_SCORES;
        state.pickaxes = INIT_PICKAXES;
        state.camps = INIT_CAMPS;
      },
      false,
      "GAME/READY_GAME"
    ),
  startGame: () =>
    set(
      (state) => {
        state.turn = 1;
        state.stage = "TURN_START";
      },
      false,
      "GAME/START_GAME"
    ),
  rollDice: () =>
    set(
      (state) => {
        state.stage = "UPDATE_DICE_GROUP";

        const newDices = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ];

        newDices.sort();

        state.dices.forEach((dice, index) => {
          dice.pip = newDices[index];
          dice.selectedGroup = 1;
        });

        for (let idx = 0; idx < DICE_GROUP_SIZE; idx++) {
          state.trails[idx] = state.dices
            .filter((dice) => dice.selectedGroup === idx)
            .map((dice) => dice.pip || 0)
            .reduce((acc, number) => acc + number, 0);
        }
      },
      false,
      "GAME/ROLL_DICE"
    ),
  selectDiceGroup: (selectDiceIdx: number, newGroupNumber: number) =>
    set(
      (state) => {
        state.dices[selectDiceIdx].selectedGroup = newGroupNumber;

        for (let idx = 0; idx < DICE_GROUP_SIZE; idx++) {
          state.trails[idx] = state.dices
            .filter((dice) => dice.selectedGroup === idx)
            .map((dice) => dice.pip || 0)
            .reduce((acc, number) => acc + number, 0);
        }
      },
      false,
      "GAME/SELECT_DICE_GROUP"
    ),
  climbing: () =>
    set(
      (state) => {
        const currentPlayer = state.turn;

        // 이전 값
        const prevBoard = produce(state.board, (x) => x);
        const prevPickaxes = produce(state.pickaxes, (x) => x);

        //새 최신 값
        let newBoard = createBoard(prevBoard);
        let newPickaxes: IPos[] = [];

        /**
         * 사이드 이펙트가 있는 로직
         * @param pickaxeMoveResults trailNumber에 pickaxe 가 어떻게 움직였는지 정보를 저장
         * @param newBoard pickaxe의 동작이 포함
         */
        const allPickaxeMoveResults = state.trails.map((trailNumber) => {
          if (typeof trailNumber === "undefined") {
            console.error("unexpected trail values");
            return;
          }

          const prevPickaxePos = findMarker(newBoard, trailNumber, "pickaxe");

          // trail에 이미 pickaxe 가 있는 경우
          if (prevPickaxePos) {
            // 이전 pickaxe가 이미 꼭대기에 있다면 아무것도 하지 않음
            if (prevPickaxePos.height === newBoard[trailNumber].length - 1) {
              return "none"; // 등반결과 실패
            }
            // 이전 pickaxe의 값을 증가
            newBoard = removeMarker(newBoard, prevPickaxePos, "pickaxe");
            newBoard = appendMarker(
              newBoard,
              {
                trail: prevPickaxePos.trail,
                height: prevPickaxePos.height + 1,
              },
              "pickaxe"
            );

            return "climbing"; // 등반
          }
          // 새로 pickaxe를 놓아야 하는 경우
          else {
            // 다른 사람이 정복한 trail 이면 실패
            const peakHeight = newBoard[trailNumber].length - 1;
            const peak = newBoard[trailNumber][peakHeight];
            const isConqueredTrail = peak.length > 0;

            if (isConqueredTrail) {
              return "none";
            }

            let nextHeight = 0;

            // 이전에 캠핑한적이 있다면 다음 위치는 camp 다음 지점으로 변경
            const campPos = findMarker(newBoard, trailNumber, currentPlayer);

            if (campPos) {
              nextHeight = campPos.height + 1;
            }

            // 새로 pickaxe를 추가
            newBoard = appendMarker(
              newBoard,
              {
                trail: trailNumber,
                height: nextHeight,
              },
              "pickaxe"
            );

            return "new"; // 새로 배치됨
          }
        });

        /**
         * 새로운 모든 pickaxe의 위치를 계산
         * @param newPickaxes 새로운 pickaxe의 위치
         */
        Object.entries(newBoard).forEach(([trailNumberStr, trail]) => {
          const trailNumber = parseInt(trailNumberStr);

          trail.forEach((spot, height) => {
            const hasPickaxe = spot.some((marker) => marker === "pickaxe");

            if (hasPickaxe) {
              newPickaxes = [
                ...newPickaxes,
                {
                  trail: trailNumber,
                  height: height,
                },
              ];
            }
          });
        });

        // pickaxe 보정 가능한 지 확인하는 단계
        const isClimbFixable = checkClimbFixable({ newPickaxes });

        // case 1: 새로 pickaxe를 배치할 수 있지만 사용자가 골라야하는 경우
        if (isClimbFixable && prevPickaxes.length < MAX_PICKAXES) {
          const selectPickaxeCount = newPickaxes.length - prevPickaxes.length;
          //FIXME trail을 선택해야하는 단계인 지 확인 및 맞는 action 추가 (2)
          return;
        }
        // case 2: 이전에 선택한 trailNumber가 3개이고 겹치는 pickaxe가 있는 경우
        else if (isClimbFixable && prevPickaxes.length === MAX_PICKAXES) {
          let pickaxeMoveResults = allPickaxeMoveResults;

          while (true) {
            const removeSelectedTrailIndex = pickaxeMoveResults.findIndex(
              (result) => result === "new"
            );

            if (removeSelectedTrailIndex == -1) {
              break;
            }

            const removeTrail = state.trails[removeSelectedTrailIndex];
            if (typeof removeTrail === "undefined") {
              console.error("예상하지 못한 trail 번호 입니다.");
              return;
            }

            const removePickaxes = findMarker(newBoard, removeTrail, "pickaxe");

            // board 값 보정
            if (!removePickaxes) {
              console.error(
                "pickaxe를 보정 하는 과정에서 newBoard 의 pickaxePos 를 찾을 수 없습니다."
              );
              return;
            }

            newBoard = removeMarker(newBoard, removePickaxes, "pickaxe");

            // newPickaxes 보정
            const allPickaxes = Array.from(newPickaxes);
            const failPickaxeIndex = allPickaxes.findIndex(
              ({ trail }) => trail == removeTrail
            );

            if (failPickaxeIndex === -1) {
              console.error(
                "pickaxe를 보정 하는 과정에서 newPickaxeIndex 의 pickaxePos 를 찾을 수 없습니다."
              );
              return;
            }

            allPickaxes.splice(failPickaxeIndex, 1);
            newPickaxes = [...allPickaxes];

            pickaxeMoveResults.splice(removeSelectedTrailIndex, 1);
          }
        }

        // board 검증 단계
        const isFailToClimb = isInvalidBoard({
          prevPickaxes,
          newPickaxes,
          currentPlayerCamp: state.camps[currentPlayer],
        });

        if (isFailToClimb) {
          // board에서 pickaxes 제거
          let pickaxeRemovedBoard = createBoard(prevBoard);
          prevPickaxes.forEach((pickaxePos) => {
            pickaxeRemovedBoard = removeMarker(
              pickaxeRemovedBoard,
              pickaxePos,
              "pickaxe"
            );
          });

          state.turn = getNextTurn(currentPlayer); // 차례 증가
          state.stage = "TURN_START";
          state.board = pickaxeRemovedBoard; // pickaxe 제거된 게임판 추가
          state.dices = INIT_DICE; // 주사위 초기화
          state.pickaxes = INIT_PICKAXES;

          return;
        }

        state.stage = "SELECT_PLAY";
        state.board = newBoard;
        state.dices = INIT_DICE;
        state.pickaxes = newPickaxes;

        return;
      },
      false,
      "GAME/CLIMBING"
    ),
  camping: () =>
    set(
      (state) => {
        const currentPlayer = state.turn;

        let newBoard = createBoard(state.board);
        let newCurrentPlayerCamps: IPos[] = [];
        let newPlayerScore: number[] = [];

        // 새 board 를 만듬
        state.pickaxes.forEach((prevPickaxePos) => {
          newBoard = removeMarker(newBoard, prevPickaxePos, "pickaxe");

          const trailNumber = prevPickaxePos.trail;
          const prevCampPos = findMarker(newBoard, trailNumber, currentPlayer);
          if (prevCampPos) {
            newBoard = removeMarker(newBoard, prevCampPos, currentPlayer);
          }

          newBoard = appendMarker(newBoard, prevPickaxePos, currentPlayer);
        });

        // 새 캠프의 위치 갱신
        Object.keys(newBoard).forEach((trailNumberStr) => {
          const trailNumber = parseInt(trailNumberStr);

          const camp = findMarker(newBoard, trailNumber, currentPlayer);

          if (camp) {
            newCurrentPlayerCamps = [...newCurrentPlayerCamps, camp];
          }
        });

        // 새 점수를 계산
        newCurrentPlayerCamps.forEach((campPos) => {
          const trail = newBoard[campPos.trail];
          const peakHeight = trail.length - 1;

          if (campPos.height === peakHeight) {
            newPlayerScore = [...newPlayerScore, campPos.trail];
          }
        });

        // 게임 종료 조건 체크
        if (newPlayerScore.length >= GOAL_CONQUER_TRAIL) {
          alert(`${currentPlayer}가 승리하였습니다.`);

          get().readyGame();

          return;
        }

        state.turn = getNextTurn(currentPlayer); // 다음 차례 계산
        state.stage = "TURN_START";
        state.board = newBoard; // 마카가 모두 현재 플레이어의 board로 교체된 board 반환
        state.dices = INIT_DICE; // 주사위 초기화
        state.pickaxes = []; // pickaxe 위치 모두 제거
        state.camps[currentPlayer] = newCurrentPlayerCamps; // 현제 플레이어의 camp 위치 계산
        state.scores[currentPlayer] = newPlayerScore; // 점수 계산
      },
      false,
      "GAME/CAMP"
    ),
});

// 1. 괭이 어떠한 조건 하에서 4개 올라가짐(테스트중)
//    시나리오 찾아야함
//    터짐

// 3. 곡괭이는 캠프 앞에 설치되도록 하기
//    누가 책임 질 것인가 => Board vs reducer

// zustand 마이그레이션 후 처리

// 2. 사용자가 trail을 골라야하는 경우 처리
