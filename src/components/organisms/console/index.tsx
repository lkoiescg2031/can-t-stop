"use client";

import classNames from "classnames";
import React from "react";
import TrailNumber from "@/components/atoms/trail-number";
import ToggleButton from "@/components/atoms/toggle-button";
import Button from "@/components/atoms/button";
import Dice from "@/components/atoms/dice";
import styled from "styled-components";
import tw from "twin.macro";
import useConsoleReducer, {
  ConsoleChangeHandler,
  ConsoleState,
} from "@/components/organisms/console/hooks/use-console-reducer";

export interface ConsoleProps {
  className?: string;
  defaultState?: ConsoleState;
  onConsoleUpdate?: ConsoleChangeHandler;
}

export default function Console(props: ConsoleProps): React.ReactElement {
  const [console, dispatch] = useConsoleReducer({
    defaultState: props.defaultState,
    onStateChanged: props.onConsoleUpdate,
  });

  return (
    <StyledConsoleLayoutDiv
      className={classNames("console-layout", props.className)}
    >
      <div className={classNames("dice-console-area")}>
        {console.state !== "select" &&
          console.dice.map((diceNumber, index) => (
            <Dice key={`dice-${index}`}>{diceNumber}</Dice>
          ))}

        {console.state === "select" && (
          <>
            <div className={classNames("trail-view")}>
              <TrailNumber>
                {console.selected.reduce(
                  (acc, selected, index) =>
                    acc + (selected ? console.dice[index] : 0),
                  0
                )}
              </TrailNumber>
              <TrailNumber>
                {console.selected.reduce(
                  (acc, selected, index) =>
                    acc + (selected ? 0 : console.dice[index]),
                  0
                )}
              </TrailNumber>
            </div>
            {console.dice.map((diceNumber, index) => (
              <ToggleButton
                key={`toggle-dice-${index}`}
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
            ))}
          </>
        )}
      </div>
      <div className={classNames("submit-console-area")}>
        {["init", "continue"].includes(console.state) && (
          <Button onClick={() => dispatch({ type: "ROLLING" })}>Rolling</Button>
        )}
        {console.state === "select" && (
          <Button
            onClick={() => dispatch({ type: "APPLY" })}
            disabled={
              console.selected.filter((selected) => selected).length !== 2
            }
          >
            Climbing
          </Button>
        )}
        {console.state === "continue" && (
          <Button onClick={() => dispatch({ type: "CAMPING" })}>Camping</Button>
        )}
      </div>
    </StyledConsoleLayoutDiv>
  );
}

const StyledConsoleLayoutDiv = styled.div`
  &.console-layout {
    ${tw`flex flex-col justify-around`}
    ${tw`absolute bottom-0 right-0`}
    ${tw`w-[280.47px] h-[160px] m-4`}
    .dice-console-area {
      ${tw`w-full flex justify-around`}
      .trail-view {
        ${tw`min-w-[30px] flex flex-col justify-around items-center`}
      }
    }

    .submit-console-area {
      ${tw`w-full flex justify-around`}
    }
  }
`;
