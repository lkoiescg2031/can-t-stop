import { MarkerType } from "@/models/marker";
import { IPos } from "@/models/pos";
import { AllPickaxesType } from "@/models/pickaxe";
import { AllCamps } from "@/models/camp";

/** 맵 전체의 정보, board[trailNumber][high] : 해당 지점에 설치되어있는 기물의 목록 */
export type BoardType = Record<number, MarkerType[][]>;

/** 가장 초기의 Board의 상태 (아무런 기물도 얹어져 있지 않음) */
const EMPTY_BOARD: BoardType = {
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

/**
 * 게임 판 정보를 하나 만듭니다. 초기 값이 주어진 경우 deep copy 하여 새 인스턴스를 만듭니다.
 * @param board 초기화될 board의 상태
 * @returns board 인스턴스
 */
export function createBoard(board?: BoardType): BoardType {
  return JSON.parse(JSON.stringify(board || EMPTY_BOARD));
}

/**
 * 보드에서 해당 마커가 있는 height을 찾습니다.
 * @param board 현재 보드 상태
 * @param trailPos 찾을 trail 번호
 * @param marker 찾을 마커 타입
 * @returns 찾은 마커가 있는 위치 (없는 경우 undefined를 리턴)
 */
export function findMarker(
  board: BoardType,
  trailPos: number,
  marker: MarkerType
): IPos | undefined {
  const targetTrail = board[trailPos];

  const height = targetTrail.findIndex((markers) => markers.includes(marker));

  if (height === -1) {
    return undefined;
  }

  return {
    trail: trailPos,
    height,
  };
}

/**
 * 마커가 추가된 상태의 보드를 하나 만듭니다. 새로 만들어진 보드는 deep copy 된 인스턴스 입니다.
 * @param board 추가 될 보드
 * @param pos  추가할 위치
 * @param marker 추가하는 마커
 * @returns 새로운 마커가 추가된 보드
 */
export function appendMarker(
  board: BoardType,
  pos: IPos,
  marker: MarkerType
): BoardType {
  const newBoard = createBoard(board);

  let newSpot = newBoard[pos.trail][pos.height];
  newSpot = [...newSpot, marker];
  newBoard[pos.trail][pos.height] = newSpot;

  return newBoard;
}

/**
 * 마커가 제거된의 보드를 하나 만듭니다. 새로 만들어진 보드는 deep copy 된 인스턴스 입니다.
 * @param board 제거될 마커가 있는 보드
 * @param pos 제거될 위치
 * @param marker 제거해야하는 마커
 * @returns 마커가 제거된 새로운 보드
 */
export function removeMarker(
  board: BoardType,
  pos: IPos,
  marker: MarkerType
): BoardType {
  const newBoard = createBoard(board);
  const targetSpot = newBoard[pos.trail][pos.height];

  newBoard[pos.trail][pos.height] = targetSpot.filter(
    (origin) => origin !== marker
  );

  return newBoard;
}
