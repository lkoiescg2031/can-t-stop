import { BoardType } from "@/models/board";
import { CampDictionType } from "@/models/camp";
import { AllPickaxesType } from "@/models/pickaxe";
import { AllDices } from "@/models/dice";

export interface IGame {
  /** 현재 진행중인 플레이어의 차례 */
  turn: number;
  /** 굴려서 나온 모든 주사위 값 */
  dices: AllDices;
  /** 현제 플레이어가 설치한 곡갱이의 위치 목록 (설치 되지 않은 곡갱이는 undefined 로 표기)  */
  pickaxe: AllPickaxesType;
  /** 플레이어마다 설치한 캠프의 위치 사전, camp[플레이어 번호]: 해당 플레이어가 설치한 켐프의 위치 */
  camp: CampDictionType;
  /** board의 전체의 정보, board[trailNumber][high] : 해당 지점에 설치되어있는 기물의 목록 */
  board: BoardType;
}
