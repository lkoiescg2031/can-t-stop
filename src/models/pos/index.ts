/**
 * board 위에서 특정 위치의 값을 나타내는 object
 */
export interface IPos {
  /** trail 번호 (0 번 부터 시작) */
  trail: number;
  /** trail 상에서의 위치 (0번 부터 시작)  */
  height: number;
}

export function areEqual(pos1?: IPos, pos2?: IPos): boolean {
  if (typeof pos1 !== "undefined" && typeof pos2 !== "undefined") {
    return pos1.trail === pos2.trail && pos1.height === pos2.height;
  } else if ((typeof pos1 === "undefined") !== (typeof pos2 === "undefined")) {
    return false;
  } else {
    return true;
  }
}
