"use client";

import React, { MouseEventHandler } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";

import { produce } from "immer";

import TrailNumber from "@/components/atoms/trail-number";
import ToggleButton from "@/components/atoms/toggle-button";
import Button from "@/components/atoms/button";
import Dice from "@/components/atoms/dice";

import { GameStage } from "@/models/game";
import type { Dice as DiceType } from "@/models/dice";

import { useGlobalStoreSelector } from "@/stores";

export interface ConsoleProps {
  className?: string;
}

export default function Console(props: ConsoleProps): React.ReactElement {
  const stage = useGlobalStoreSelector.use.stage();
  const dices = useGlobalStoreSelector.use.dices();
  const trails = useGlobalStoreSelector.use.trails();

  const rolling = useGlobalStoreSelector.use.rollDice();
  const selectDiceGroup = useGlobalStoreSelector.use.selectDiceGroup();
  const climbing = useGlobalStoreSelector.use.climbing();
  const camping = useGlobalStoreSelector.use.camping();

  const handleRolling: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    rolling();
  };

  const handleToggleGroup = (diceIndex: number) => (newValue: boolean) => {
    selectDiceGroup(diceIndex, newValue ? 0 : 1);
  };

  const groupingDiceReducer = (
    groupCounter: Record<string, number>,
    dice: DiceType
  ): Record<string, number> =>
    produce(groupCounter, (counter) => {
      const groupId =
        typeof dice.selectedGroup === "undefined"
          ? "unselected"
          : "" + dice.selectedGroup;

      if (!counter[groupId]) {
        counter[groupId] = 1;
      } else {
        counter[groupId] += 1;
      }
    });

  const isClimbable = (): boolean => {
    const { unselected, ...groups } = dices.reduce(groupingDiceReducer, {
      unselected: 0,
    });

    const targetValue = groups[0];

    return (
      unselected === 0 &&
      Object.values(groups).every((count) => count === targetValue)
    );
  };

  const handleClimbing: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    climbing();
  };

  const handleCamping: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    camping();
  };

  return (
    <StyledConsoleDiv className={classNames("console", props.className)}>
      <div className={classNames("dice-console-area")}>
        {["TURN_START", "SELECT_TRAILS", "SELECT_PLAY"].includes(stage) &&
          dices.map((dice, index) => (
            <Dice key={`dice-${index}`}>{dice.pip}</Dice>
          ))}

        {stage === "UPDATE_DICE_GROUP" && (
          <>
            <div className={classNames("trail-view")}>
              {trails.map((trailNumber, index) => (
                <TrailNumber key={`selected-trail-${index}`}>
                  {trailNumber}
                </TrailNumber>
              ))}
            </div>
            {dices.map((dice, diceIndex) => (
              <ToggleButton
                key={`dice-toggle-${diceIndex}`}
                onToggleChanged={handleToggleGroup(diceIndex)}
              >
                <Dice>{dice.pip}</Dice>
              </ToggleButton>
            ))}
          </>
        )}
      </div>
      <div className={classNames("submit-console-area")}>
        {(["TURN_START", "SELECT_PLAY"] as GameStage[]).includes(stage) && (
          <Button onClick={handleRolling}>Rolling</Button>
        )}
        {(["UPDATE_DICE_GROUP"] as GameStage[]).includes(stage) && (
          <Button onClick={handleClimbing} disabled={!isClimbable()}>
            Climbing
          </Button>
        )}
        {(["SELECT_PLAY"] as GameStage[]).includes(stage) && (
          <Button onClick={handleCamping}>Camping</Button>
        )}
      </div>
    </StyledConsoleDiv>
  );
}

const StyledConsoleDiv = styled.div`
  &.console {
    ${tw`flex flex-col justify-around`}
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
