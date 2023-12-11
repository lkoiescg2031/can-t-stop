"use client";

import Button from "@/components/atoms/button";
import Dice from "@/components/atoms/dice";
import Marker from "@/components/atoms/marker";
import Board from "@/components/molecules/board";
import CampMarker from "@/components/molecules/markers/camp-marker";
import PickaxeMarker from "@/components/molecules/markers/pickaxe-marker";
import { EMPTY_BOARD } from "@/models/board";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface GamePlayingProps {}

export default function GamePlaying(
  props: GamePlayingProps
): React.ReactElement {
  return (
    <StyledDiv>
      <div className={classNames("game-view")}>
        <Board board={EMPTY_BOARD} />
      </div>
      <div className={classNames("console")}>
        <div className={classNames("dice-console", "dice-group-1")}>
          4<Dice>{1}</Dice>
          <div style={{ width: "3rem", height: "3rem" }}></div>
          <Dice>{3}</Dice>
          <div style={{ width: "3rem", height: "3rem" }}></div>
        </div>
        <div className={classNames("dice-console", "dice-group-1")}>
          6<div style={{ width: "3rem", height: "3rem" }}></div>
          <Dice>{2}</Dice>
          <div style={{ width: "3rem", height: "3rem" }}></div>
          <Dice>{4}</Dice>
        </div>
        <Button disabled>Select</Button>
      </div>
      <div className={classNames("info-box")}>
        <div className={classNames("turn-info")}>
          <Marker player={1} />
          <PickaxeMarker />
          <PickaxeMarker />
          <PickaxeMarker />
        </div>
        <div className={classNames("player-info", "player1")}>
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
          <CampMarker player={1} />
        </div>
        <div className={classNames("player-info", "player2")}>
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
          <CampMarker player={2} />
        </div>
        <div className={classNames("player-info", "player3")}>
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
          <CampMarker player={3} />
        </div>
        <div className={classNames("player-info", "player4")}>
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
          <CampMarker player={4} />
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  & {
    ${tw`flex relative w-[100vw] h-[100vh]`}

    .game-view {
      ${tw`w-full h-full p-[100px]`}
    }

    .console {
      ${tw`absolute bottom-0 right-0`}
      .dice-console {
        ${tw`flex`}
      }
    }
    .info-box {
      ${tw`absolute top-0 right-0`}
      ${tw`flex flex-col`}
      .turn-info,
      .player-info {
        ${tw`flex`}
      }
    }
  }
`;
