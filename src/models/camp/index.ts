import { IPos } from "@/models/pos";

/** 플레이어마다 설치한 캠프의 위치, camp[플레이어 번호]: 해당 플레이어가 설치한 켐프의 위치 */
export type CampDictionType = Record<number, IPos[]>;
