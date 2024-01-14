import { IPos } from "@/models/pos";

/** 현재 플레이어가 설치한 곡괭이의 위치 (설치 되지 않은 곡괭이는 undefined 로 표기)  */
export type AllPickaxesType = IPos[];

/** 게임에서 허옹된 최대 pickaxe 수 */
export const MAX_PICKAXES = 3;
