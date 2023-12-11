import { MarkerType } from "@/models/marker";
import { IPos } from "@/models/pos";

/** 맵 전체의 정보, board[trailNumber][high] : 해당 지점에 설치되어있는 기물의 목록 */
export type BoardType = Record<number, MarkerType[][]>;

/** 가장 초기의 Board의 상태 (아무런 기물도 얹어져 있지 않음) */
export const EMPTY_BOARD: BoardType = {
  2: [[], [], []],
  3: [[], [], [], [], []],
  4: [[], [], [], [], [], [], []],
  5: [[], [], [], [], [], [], [], [], []],
  6: [[], [], [], [], [], [], [], [], [], [], []],
  7: [[], [], [], [], [], [], [], [], [], [], [], [], []],
  8: [[], [], [], [], [], [], [], [], [], [], []],
  9: [[], [], [], [], [], [], [], [], []],
  10: [[], [], [], [], [], [], []],
  11: [[], [], [], [], []],
  12: [[], [], []],
};

export function appendMarker(
  board: BoardType,
  pos: IPos,
  marker: MarkerType
): BoardType {
  const newBoard = JSON.parse(JSON.stringify(board));

  newBoard[pos.trail][pos.hight].push(marker);

  return newBoard;
}
