import { BoardType } from "@/models/board";
import { AllCamps, CampDictionType, MAX_CAMP } from "@/models/camp";
import { AllPickaxesType, MAX_PICKAXES } from "@/models/pickaxe";
import { AllDices } from "@/models/dice";
import { AllScores } from "@/models/score";
import { areEqual } from "@/models/pos";

/** turn 에 사용되는 값, 게임 시작 준비 상태 의미 */
export const GAME_READY_CODE = -1;

/** turn 에 사용되는 값, 게임 종료 상태 의미 */
export const GAME_END_CODE = -2;

/** 전체 플레이어 수 */
export const TOTAL_PLAYER = 4;

/** 정복해야하는 trail 수 */
export const GOAL_CONQUER_TRAIL = 3;

export interface IGame {
  /** 현재 진행중인 플레이어의 차례 (0 : 게임 시작 전, 음수 값 : 해당 플레이어의 승리로 게임 종료) */
  turn: number;
  /** board의 전체의 정보, board[trailNumber][high] : 해당 지점에 설치되어있는 기물의 목록 */
  board: BoardType;
  /** 모든 주사위의 상태 */
  dices: AllDices;

  // 게임 가공 정보
  /** 플레이어의 점수를 기록, scores[플레이어 번호]: 해당 플레이어의 점수 */
  scores: AllScores;
  /** 현제 플레이어가 설치한 곡갱이의 위치 목록 (설치 되지 않은 곡갱이는 undefined 로 표기)  */
  pickaxes: AllPickaxesType;
  /** 플레이어마다 설치한 캠프의 위치 사전, camp[플레이어 번호]: 해당 플레이어가 설치한 켐프의 위치 */
  camps: CampDictionType;
}
/**
 * 다음 플레이어의 차레를 계산해서 반환
 * @param currentTurnPlayer 현제 플레이어의 차례
 * @returns 다음 플레이어의 차례
 */
export function getNextTurn(currentTurnPlayer: number): number {
  let nextPlayer = currentTurnPlayer + 1;

  if (nextPlayer > TOTAL_PLAYER) {
    nextPlayer = 1;
  }

  return nextPlayer;
}

/**
 * 게임 board 검증에 필요한 값들
 */
interface AssertBoardParam {
  newPickaxes: AllPickaxesType;
  prevPickaxes: AllPickaxesType;
  currentPlayerCamp: AllCamps;
}

/**
 * 현재 생성된 board가 올바른 값인지 검증하는 로직
 * @returns board가 올바르지 않다면 true, 올바르다면 false
 */

export function isInvalidBoard(params: AssertBoardParam): boolean {
  // - rule1. 새로 배치한 pickaxe의 개수는 전체 pickaxe를 넘을 수 없다.
  const isOverflowPickaxes = params.newPickaxes.length > MAX_PICKAXES;

  // - rule2. pickaxe가 적어도 하나 이상 이동되었어야 한다.
  const isAllPickaxeSame =
    params.newPickaxes.length === params.prevPickaxes.length &&
    params.newPickaxes.every((newPickaxe) =>
      params.prevPickaxes.some((prevPickaxe) =>
        areEqual(newPickaxe, prevPickaxe)
      )
    );

  // - rule3. camping + pickaxe의 합이 MAX_CAMP를 넘을 수 없다.
  const isOverflowTrails =
    Array.from(
      new Set([
        ...params.newPickaxes.map(({ trail }) => trail),
        ...params.currentPlayerCamp.map(({ trail }) => trail),
      ])
    ).length > MAX_CAMP;

  // 3개 중 하나라도 만족하지 않으면 실패
  return isOverflowPickaxes || isAllPickaxeSame || isOverflowPickaxes;
}
