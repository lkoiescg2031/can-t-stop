"use client";

import Button from "@/components/atoms/button";
import Dice from "@/components/atoms/dice";
import Marker from "@/components/atoms/marker";
import ToggleButton from "@/components/atoms/toggle-button";
import TrailNumber from "@/components/atoms/trail-number";
import Board from "@/components/molecules/board";
import CampMarker from "@/components/molecules/markers/camp-marker";
import PickaxeMarker from "@/components/molecules/markers/pickaxe-marker";
import { EMPTY_BOARD } from "@/models/board";
import classNames from "classnames";
import React, { useReducer } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface GamePlayingProps {}

interface InitAction {
  type: "INIT";
}

interface RollingAction {
  type: "ROLLING";
}

interface SelectAction {
  type: "UPDATE_SELECT";
  targetIndx: number;
  newValue: boolean;
}

interface ApplyAction {
  type: "APPLY";
}

type ConsoleAction = InitAction | RollingAction | SelectAction | ApplyAction;

interface ConsoleInitState {
  state: "init";
  dice: [undefined, undefined, undefined, undefined];
}

interface ConsoleSelectState {
  state: "select";
  dice: number[];
  selected: boolean[];
}

interface ConsoleContinueState {
  state: "continue";
  dice: [undefined, undefined, undefined, undefined];
}

type ConsoleState =
  | ConsoleInitState
  | ConsoleSelectState
  | ConsoleContinueState;

const INIT_STATE: ConsoleInitState = {
  state: "init",
  dice: [undefined, undefined, undefined, undefined],
};

function consoleReducer(
  prevState: ConsoleState,
  action: ConsoleAction
): ConsoleState {
  switch (action.type) {
    case "INIT": {
      return INIT_STATE;
    }
    case "ROLLING": {
      const newState: ConsoleSelectState = {
        state: "select",
        dice: [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ],
        selected: [false, false, false, false],
      };

      return newState;
    }
    case "UPDATE_SELECT": {
      if (prevState.state !== "select") {
        return prevState;
      }

      const newSelected = Array.from(prevState.selected);
      newSelected[action.targetIndx] = action.newValue;

      return {
        ...prevState,
        selected: newSelected,
      };
    }
    case "APPLY": {
      return {
        state: "continue",
        dice: [undefined, undefined, undefined, undefined],
      };
    }
  }
  return prevState;
}

export default function GamePlaying(
  props: GamePlayingProps
): React.ReactElement {
  const [consoleState, dispatch] = useReducer(consoleReducer, INIT_STATE);

  return (
    <StyledDiv>
      <div className={classNames("game-view")}>
        <Board board={EMPTY_BOARD} />
      </div>
      <div className={classNames("console")}>
        <div className={classNames("dice-console")}>
          {consoleState.state === "select" && (
            <div className={classNames("trail-view")}>
              <TrailNumber>
                {consoleState.selected.reduce(
                  (acc, selected, index) =>
                    acc + (selected ? consoleState.dice[index] : 0),
                  0
                )}
              </TrailNumber>
              <TrailNumber>
                {consoleState.selected.reduce(
                  (acc, selected, index) =>
                    acc + (selected ? 0 : consoleState.dice[index]),
                  0
                )}
              </TrailNumber>
            </div>
          )}

          {consoleState.dice.map((diceNumber, index) => (
            <>
              {consoleState.state !== "select" && <Dice>{diceNumber}</Dice>}
              {consoleState.state === "select" && (
                <ToggleButton
                  onToggleChanged={(newValue) =>
                    dispatch({
                      type: "UPDATE_SELECT",
                      targetIndx: index,
                      newValue,
                    })
                  }
                >
                  <Dice>{diceNumber}</Dice>
                </ToggleButton>
              )}
            </>
          ))}
        </div>
        <div className={classNames("submit-console")}>
          {consoleState.state === "init" && (
            <Button onClick={() => dispatch({ type: "ROLLING" })}>
              Rolling
            </Button>
          )}
          {consoleState.state === "select" && (
            <Button
              onClick={() => dispatch({ type: "APPLY" })}
              disabled={
                consoleState.selected.filter((selected) => selected).length !==
                2
              }
            >
              Climbing
            </Button>
          )}
          {consoleState.state === "continue" && (
            <>
              <Button onClick={() => dispatch({ type: "ROLLING" })}>
                Rolling
              </Button>
              <Button>Camping</Button>
            </>
          )}
        </div>
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
    ${tw`flex relative w-screen h-screen`}

    .game-view {
      ${tw`w-full h-full p-[100px]`}
    }

    .console {
      ${tw`absolute bottom-0 right-0 p-4 m-4`}

      .dice-console {
        ${tw`flex flex-row`}

        .trail-view {
          ${tw`flex flex-col justify-around`}
        }
      }

      .submit-console {
        ${tw`flex justify-center`}
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
