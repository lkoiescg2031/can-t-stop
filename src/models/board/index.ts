import { MarkerType } from "@/models/marker";
import { IPos } from "@/models/pos";

/** 맵 전체의 정보, board[trailNumber][high] : 해당 지점에 설치되어있는 기물의 목록 */
export type BoardType = MarkerType[][][];

/** trail이 가질수 있는 값의 범위 (2 ~ 12) */
export const MIN_TRAIL_NUMBER = 2;
export const MAX_TRAIL_NUMBER = 12;

/** 각 trail이 가질수 있는 최대 spot의 크기를 버장 */
export const MAX_TRAIL_HIGHS: Record<number, number> = {
  2: 3,
  3: 5,
  4: 7,
  5: 9,
  6: 11,
  7: 13,
  8: 11,
  9: 9,
  10: 7,
  11: 5,
  12: 3,
};

/** 가장 초기의 Board의 상태 (아무런 기물도 얹어져 있지 않음) */
export const EMPTY_BOARD = [
  [[], [], []], // trailNumber : 2
  [[], [], [], [], []], // trailNumber : 3
  [[], [], [], [], [], [], []], // trailNumber : 4
  [[], [], [], [], [], [], [], [], []], // trailNumber : 5
  [[], [], [], [], [], [], [], [], [], [], []], // trailNumber : 6
  [[], [], [], [], [], [], [], [], [], [], [], [], []], // trailNumber : 8
  [[], [], [], [], [], [], [], [], [], [], []], // trailNumber : 7
  [[], [], [], [], [], [], [], [], []], // trailNumber : 9
  [[], [], [], [], [], [], []], // trailNumber : 10
  [[], [], [], [], []], // trailNumber : 11
  [[], [], []], // trailNumber : 12
];

export function appendMarker(
  board: BoardType,
  pos: IPos,
  marker: MarkerType
): BoardType {
  const newBoard = JSON.parse(JSON.stringify(board));

  newBoard[pos.trail][pos.hight].push(marker);

  return newBoard;
}

