import { IPos } from "@/models/pos";

/** 플레이어마다 설치한 캠프의 위치, camp[플레이어 번호]: 해당 플레이어가 설치한 켐프의 위치 */
export type AllCamps = IPos[];
export type CampDictionType = Record<number, AllCamps>;

/** 게임에서 허용된 최대 캠프 수 */
export const MAX_CAMP = 10;
