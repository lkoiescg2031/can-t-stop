/** 굴려서 나오는 모든 주사위 값 */

interface Dice {
  /** 주사위를 굴려서 나온 눈의 수, undefined 이면 주사위를 굴리지 않은 상태 */
  pip?: number;
  /** 주사위를 선택하였는 지 유무, undefined 이면 주사위를 선택 중이지 않음 */
  selected?: boolean;
}

export type AllDices = Dice[];
