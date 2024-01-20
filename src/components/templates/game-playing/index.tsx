"use client";

import React, { useEffect } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";

import Board from "@/components/organisms/board";
import InfoBox from "@/components/organisms/info-box";
import Console from "@/components/organisms/console";
import { useGlobalStoreSelector } from "@/stores";

export interface GamePlayingProps {
  className?: string;
}

export default function GamePlaying(
  props: GamePlayingProps
): React.ReactElement {
  const stage = useGlobalStoreSelector.use.stage();
  const ready = useGlobalStoreSelector.use.readyGame();
  const start = useGlobalStoreSelector.use.startGame();

  const board = useGlobalStoreSelector.use.board();
  const turn = useGlobalStoreSelector.use.turn();
  const scores = useGlobalStoreSelector.use.scores();

  useEffect(() => {
    switch (stage) {
      case "INIT_GAME": {
        ready();
        start();
        return;
      }
      case "TURN_START":
      case "UPDATE_DICE_GROUP":
      case "SELECT_TRAILS":
      case "SELECT_PLAY":
      default:
        return;
    }
  }, [stage, ready, start]);

  return (
    <StyledGamePlayDiv className={classNames("game-playing", props.className)}>
      <div className={classNames("game-view")}>
        {/* FIXME container 생성 필요 */}
        <Board board={board} />
      </div>
      <div className={classNames("console-area")}>
        <Console />
      </div>
      <div className={classNames("info-area")}>
        {/* FIXME container 생성 필요 */}
        <InfoBox turn={turn} scores={scores} />
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
