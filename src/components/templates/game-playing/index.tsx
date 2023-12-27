"use client";

import Board from "@/components/organisms/board";
import InfoBox from "@/components/organisms/info-box";
import Console from "@/components/organisms/console";
import { createBoard, findMarker } from "@/models/board";
import classNames from "classnames";
import React, { Reducer, useReducer, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { IGame } from "@/models/game";
import { ConsoleChangeHandler } from "@/components/organisms/console/hooks/use-console-reducer";
import { AllDices } from "@/models/dice";
import { IPos } from "@/models/pos";

interface GameInitAction {
  type: "INIT";
}

interface DiceAction {
  type: "DICE";
  dices: AllDices;
}

interface PickaxeAction {
  type: "PICKAXE";
}

interface CampingAction {
  type: "CAMPING";
}

type GameAction = GameInitAction | DiceAction | PickaxeAction | CampingAction;

/** 게임 시작 시 제일 처음 상태 */
const INIT_STATE: IGame = {
  turn: 1,
  dices: [{}, {}, {}, {}],
  board: createBoard(),

  // turn, dices, board로 부터 계산되어져 나온 값들
  scores: { 1: 0, 2: 0, 3: 0, 4: 0 },
  pickaxes: [undefined, undefined, undefined],
  camp: { 1: [], 2: [], 3: [], 4: [] },
};

function reducer(prevState: IGame, action: GameAction): IGame {
  switch (action.type) {
    case "INIT": {
      return INIT_STATE;
    }
    case "DICE": {
      return {
        ...prevState,
        dices: action.dices,
      };
    }
    case "PICKAXE": {
      const prevBoard = prevState.board;
      const trailNumbers = [
        prevState.dices
          .filter((dice) => dice.selected)
          .map((dice) => dice.pip || 0)
          .reduce((acc, number) => acc + number, 0),
        prevState.dices
          .filter((dice) => !dice.selected)
          .map((dice) => dice.pip || 0)
          .reduce((acc, number) => acc + number, 0),
      ];

      const nextPickaxePosesByTrailNumbers = trailNumbers
        .map((trailNumber) => {
          const peakHeight = prevBoard[trailNumber].length - 1;

          // check peak is empty
          if (prevBoard[trailNumber][peakHeight].length > 0) {
            return undefined;
          }

          return (
            findMarker(prevBoard, trailNumber, "pickaxe") ||
            findMarker(prevBoard, trailNumber, prevState.turn)
          );
        })
        .filter((pos): pos is IPos => typeof pos !== "undefined");

      // 여분의 pickaxe 가 있는 가
      const hasRemainPickaxe = prevState.pickaxes.some(
        (pos) => typeof pos === "undefined"
      );
      // 두 쌍의 trail 중 아직 정복하지 않은 trail 이 있는 가
      const isAllTrailConquered = nextPickaxePosesByTrailNumbers.length === 0;
      // board 위에 있는 pickaxe 중 움직일 수 있는 pickaxe가 있는가
      const hasAnyPickaxeMoveable = prevState.pickaxes
        .filter((pos): pos is IPos => typeof pos !== "undefined")
        .map((pos) => pos.trail)
        .some((trail) => trailNumbers.includes(trail));

      if (isAllTrailConquered || !hasRemainPickaxe || !hasAnyPickaxeMoveable) {
        // TODO 차례를 넘김

        return prevState;
      }

      const newPickaxePoses = [];

      // board 업데이트
      // pickaxe, scores, camp 업데이트

      // dice null 초기화
    }
    case "CAMPING": {
      // 1. 모든 pickaxe 에 대해 아래(2~3)를 반복
      // 2. pickaxe의 위치에 현재 플레이어의 켐프 마커 추가
      // 2-1. 도착지점이라면 score 점수 증가
      // 2-2. score 가 3점 이라면 게임 종료 및 루프를 반복하지 않음 (turn 값 GAME_END_CODE 으로 변경)
      // 3. pickaxe 제거
      // 4. 다음 차레로 이동
    }
  }

  return prevState;
}

export interface GamePlayingProps {
  className?: string;
}

export default function GamePlaying(
  props: GamePlayingProps
): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer<IGame, GameAction>>(
    reducer,
    INIT_STATE
  );

  const handleConsoleUpdate: ConsoleChangeHandler = ({ action, newState }) => {
    switch (action.type) {
      case "INIT": {
        // do anything

        return;
      }
      case "ROLLING": // 주사위가 굴려졌을 때,
      case "UPDATE_SELECT": {
        // 주사위를 그룹 지을 때,
        if (newState.state !== "select") {
          return;
        }

        dispatch({
          type: "DICE",
          dices: newState.dice.map((number, index) => ({
            pip: number,
            selected: newState.selected[index],
          })),
        });

        return;
      }
      case "APPLY": {
        dispatch({
          type: "PICKAXE",
        });

        return;
      }
      case "CAMPING": {
        dispatch({
          type: "CAMPING",
        });

        return;
      }
    }
  };

  return (
    <StyledGamePlayDiv className={classNames("game-playing", props.className)}>
      <div className={classNames("game-view")}>
        <Board board={state.board} />
      </div>
      <div className={classNames("console-area")}>
        <Console onConsoleUpdated={handleConsoleUpdate} />
      </div>
      <div className={classNames("info-area")}>
        <InfoBox turn={state.turn} scores={state.scores}></InfoBox>
      </div>
    </StyledGamePlayDiv>
  );
}

const StyledGamePlayDiv = styled.div`
  &.game-playing {
    ${tw`flex relative w-screen h-screen`}

    .game-view {
      ${tw`w-full h-full px-[25%] py-[5%]`}
    }

    .console-area,
    .info-area {
      ${tw`absolute right-0 p-[3%]`}
    }

    .console-area {
      ${tw`bottom-0 `}
    }

    .info-area {
      ${tw`top-0`}

      .logs {
        ${tw`h-[200px] overflow-auto`}
      }
    }
  }
`;
