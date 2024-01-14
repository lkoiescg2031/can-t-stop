"use client";

import React, { useCallback } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";

import GameDevTool from "@/components/atoms/game-dev-tool";

import useGameReducer from "@/components/templates/game-playing/hooks/use-game-reducer";

import Board from "@/components/organisms/board";
import InfoBox from "@/components/organisms/info-box";
import Console from "@/components/organisms/console";
import type { ConsoleChangeHandler } from "@/components/organisms/console/hooks/use-console-reducer";

export interface GamePlayingProps {
  className?: string;
}

export default function GamePlaying(
  props: GamePlayingProps
): React.ReactElement {
  const [game, dispatch] = useGameReducer();

  const handleConsoleUpdate: ConsoleChangeHandler = useCallback(
    ({ action, newState }) => {
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
    },
    [dispatch]
  );

  return (
    <>
      <StyledGamePlayDiv
        className={classNames("game-playing", props.className)}
      >
        <div className={classNames("game-view")}>
          <Board board={game.board} />
        </div>
        <div className={classNames("console-area")}>
          <Console onConsoleUpdated={handleConsoleUpdate} />
        </div>
        <div className={classNames("info-area")}>
          <InfoBox turn={game.turn} scores={game.scores}></InfoBox>
        </div>
      </StyledGamePlayDiv>
      {process.env.NODE_ENV === "development" && <GameDevTool game={game} />}
    </>
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
