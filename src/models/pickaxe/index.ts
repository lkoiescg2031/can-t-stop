import { IPos } from "@/models/pos";

/** 현제 플레이어가 설치한 곡갱이의 위치 (설치 되지 않은 곡갱이는 undefined 로 표기)  */
export type AllPickaxesType = [IPos?, IPos?, IPos?];
