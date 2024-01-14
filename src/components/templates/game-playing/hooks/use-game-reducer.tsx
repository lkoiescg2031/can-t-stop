import React, { Dispatch, Reducer, useReducer } from "react";

import {
  BoardType,
  appendMarker,
  createBoard,
  findMarker,
  removeMarker,
} from "@/models/board";
import { CampDictionType } from "@/models/camp";
import { AllDices } from "@/models/dice";
import {
  GOAL_CONQUER_TRAIL,
  IGame,
  getNextTurn,
  isInvalidBoard,
} from "@/models/game";
import { AllPickaxesType, MAX_PICKAXES } from "@/models/pickaxe";
import { IPos } from "@/models/pos";
import { AllScores } from "@/models/score";

interface GameInitAction {
  type: "INIT";
}

interface DiceAction {
  type: "DICE";
  dices: AllDices;
}

interface PickaxeAction {
  type: "PICKAXE";
}

interface CampingAction {
  type: "CAMPING";
}

type GameAction = GameInitAction | DiceAction | PickaxeAction | CampingAction;

/** 게임 시작 시 제일 처음 상태 */
const INIT_DICE: AllDices = [{}, {}, {}, {}];
const INIT_BOARD: BoardType = createBoard();
const INIT_SCORES: AllScores = { 1: [], 2: [], 3: [], 4: [] };
const INIT_PICKAXES: AllPickaxesType = [];
const INIT_CAMPS: CampDictionType = { 1: [], 2: [], 3: [], 4: [] };
const INIT_STATE: IGame = {
  // 주 관심사
  // TODO 지금 플레이 상태를 표기하는 값 하나 필요 playState ???
  turn: 1,
  dices: INIT_DICE,
  board: INIT_BOARD,

  // turn, dices, board로 부터 계산되어져 나온 값들
  scores: INIT_SCORES,
  pickaxes: INIT_PICKAXES,
  camps: INIT_CAMPS,
};

function reducer(prevState: IGame, action: GameAction): IGame {
  switch (action.type) {
    case "INIT": {
      return INIT_STATE;
    }
    case "DICE": {
      return {
        ...prevState,
        dices: action.dices,
      };
    }
    case "PICKAXE": {
      const currentPlayer = prevState.turn;

      // 이전 값
      const prevBoard = prevState.board;
      const prevPickaxes = prevState.pickaxes;
      const prevDices = prevState.dices;

      //새 최신 값
      let newBoard = createBoard(prevBoard);
      let newPickaxes: IPos[] = [];

      const selectedTrailNumbers = [
        prevDices
          .filter((dice) => dice.selected)
          .map((dice) => dice.pip || 0)
          .reduce((acc, number) => acc + number, 0), // 첫번째 trailNumber
        prevDices
          .filter((dice) => !dice.selected)
          .map((dice) => dice.pip || 0)
          .reduce((acc, number) => acc + number, 0), // 2번째 trailNumber
      ];

      /**
       * 사이드 이펙트가 있는 로직
       * @param pickaxeMoveResults trailNumber에 pickaxe 가 어떻게 움직였는지 정보를 저장
       * @param newBoard pickaxe의 동작이 포함
       */
      const pickaxeMoveResults = selectedTrailNumbers.map((trailNumber) => {
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

          // 이전에 켐핑한적이 있다면 다음 위치는 camp 다음 지점으로 변경
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

      // board 보정 단계
      const isTrailSelectable = newPickaxes.length === MAX_PICKAXES + 1;

      // case 1: 이전에 선택한 trailNumber가 2개 인 경우
      if (isTrailSelectable && prevPickaxes.length === 2) {
        //FIXME trail을 선택해야하는 단계인 지 확인 및 맞는 action 추가
        return prevState;
      }
      // case 2: 이전에 선택한 trailNumber가 3개 인 경우
      else if (isTrailSelectable && prevPickaxes.length === 3) {
        const removeTrailIndex = pickaxeMoveResults.findIndex(
          (result) => result === "new"
        );

        const removeTrail = selectedTrailNumbers[removeTrailIndex];

        newBoard = removeMarker(
          newBoard,
          {
            trail: removeTrail,
            height: 0,
          },
          "pickaxe"
        );
      }

      // board 검증 단계
      const isFailToClimb = isInvalidBoard({
        prevPickaxes,
        newPickaxes,
        currentPlayerCamp: prevState.camps[currentPlayer],
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

        return {
          ...prevState,
          turn: getNextTurn(currentPlayer), // 턴증가
          board: pickaxeRemovedBoard,
          dices: INIT_DICE, // dices 초기화
          pickaxes: [], // pickaxe 초기화
        };
      }

      return {
        ...prevState,
        board: newBoard,
        dices: INIT_DICE,
        pickaxes: newPickaxes,
      };
    }
    case "CAMPING": {
      const currentPlayer = prevState.turn;

      let newBoard = createBoard(prevState.board);
      let newCurrentPlayerCamps: IPos[] = [];
      let newPlayerScore: number[] = [];

      // 새 board 를 만듬
      prevState.pickaxes.forEach((prevPickaxePos) => {
        newBoard = removeMarker(newBoard, prevPickaxePos, "pickaxe");
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

        return INIT_STATE;
      }

      return {
        ...prevState,
        turn: getNextTurn(currentPlayer), // 다음 차례 계산
        board: newBoard, // 마카가 모두 현재 플레이어의 board로 교체된 board 반환
        dices: INIT_DICE, // 주사위 초기화

        pickaxes: [], // pickaxe 위치 모두 제거
        camps: {
          ...prevState.camps,
          [currentPlayer]: newCurrentPlayerCamps, // 현제 플레이어의 camp 위치 계산
        },
        scores: {
          ...prevState.scores,
          [currentPlayer]: newPlayerScore, // 점수 계산
        },
      };
    }
  }

  return prevState;
}

export default function useGameReducer(): [IGame, Dispatch<GameAction>] {
  const [game, dispatch] = useReducer<Reducer<IGame, GameAction>>(
    reducer,
    INIT_STATE
  );

  return [game, dispatch];
}
