"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import tw from "twin.macro";

export interface DiceProps {
  className?: string;
  /** 주사위 에 표시 될 숫자 (min : 1, max : 6, 값이 없는 경우: 주사위가 굴려지는 중) */
  children?: number;
}

export default function Dice(props: DiceProps): React.ReactElement {
  const [selectedPip, setSelectedPip] = useState<number | undefined>(
    props.children
  );

  useEffect(() => {
    // if Dice property is changed, then it will update state
    // this process need for Dice component's number state sync
    if (typeof props.children === "number") {
      setSelectedPip(props.children);
      return;
    }

    //XXX how to make unit test in this case. we need to consider this case
    const intervalId = setInterval(() => {
      while (true) {
        const newPip = Math.floor(Math.random() * 6 + 1);

        if (selectedPip !== newPip) {
          setSelectedPip(newPip);
          break;
        }
      }
    }, 250);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.children, setSelectedPip]);

  return (
    <StyledDiceDiv className={classNames("dice", props.className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(
          "dice-icon",
          selectedPip ? `dice-${selectedPip}` : ""
        )}
        viewBox="0 0 24 24"
        preserveAspectRatio="none"
      >
        {typeof selectedPip === "number" &&
          DICE_NUMBER_TO_PIP_LOCATION[selectedPip].map(
            (dicePIPProps, index) => (
              <path key={`pip-${index}`} {...dicePIPProps} />
            )
          )}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 4C1 2.34315 2.34315 1 4 1H20C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"
        />
      </svg>
    </StyledDiceDiv>
  );
}

const StyledDiceDiv = styled.div`
  &.dice {
    ${tw`w-12 h-12`}
    .dice-icon {
      ${tw`w-full h-full fill-black`}
    }
  }
`;

/**
 * dice pip's location
 *  -------------
 * |  1       3  |
 * |             |
 * |  4   5   6  |
 * |             |
 * |  7       9  |
 *  -------------
 */

const PIP: Record<number, string> = {
  1: "M5.05518 7.05518C5.05518 5.95061 5.95061 5.05518 7.05518 5.05518C8.15975 5.05518 9.05518 5.95061 9.05518 7.05518C9.05518 8.15975 8.15975 9.05518 7.05518 9.05518C5.95061 9.05518 5.05518 8.15975 5.05518 7.05518Z",
  3: "M16.9451 5.05518C15.8405 5.05518 14.9451 5.95061 14.9451 7.05518C14.9451 8.15975 15.8405 9.05518 16.9451 9.05518C18.0496 9.05518 18.9451 8.15975 18.9451 7.05518C18.9451 5.95061 18.0496 5.05518 16.9451 5.05518Z",
  4: "M5.05518 11.9736C5.05518 10.8691 5.95061 9.97363 7.05518 9.97363C8.15975 9.97363 9.05518 10.8691 9.05518 11.9736C9.05518 13.0782 8.15975 13.9736 7.05518 13.9736C5.95061 13.9736 5.05518 13.0782 5.05518 11.9736Z",
  5: "M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z",
  6: "M16.9451 9.97363C15.8405 9.97363 14.9451 10.8691 14.9451 11.9736C14.9451 13.0782 15.8405 13.9736 16.9451 13.9736C18.0496 13.9736 18.9451 13.0782 18.9451 11.9736C18.9451 10.8691 18.0496 9.97363 16.9451 9.97363Z",
  7: "M7.05518 14.8921C5.95061 14.8921 5.05518 15.7875 5.05518 16.8921C5.05518 17.9967 5.95061 18.8921 7.05518 18.8921C8.15975 18.8921 9.05518 17.9967 9.05518 16.8921C9.05518 15.7875 8.15975 14.8921 7.05518 14.8921Z",
  9: "M14.9451 16.8921C14.9451 15.7875 15.8405 14.8921 16.9451 14.8921C18.0496 14.8921 18.9451 15.7875 18.9451 16.8921C18.9451 17.9967 18.0496 18.8921 16.9451 18.8921C15.8405 18.8921 14.9451 17.9967 14.9451 16.8921Z",
};

const DICE_NUMBER_TO_PIP_LOCATION: Record<
  number,
  { d: string }[]
> /* Record<diceNumber, pipLocations> */ = {
  1: [{ d: PIP[5] }],
  2: [{ d: PIP[1] }, { d: PIP[9] }],
  3: [{ d: PIP[1] }, { d: PIP[5] }, { d: PIP[9] }],
  4: [{ d: PIP[1] }, { d: PIP[3] }, { d: PIP[7] }, { d: PIP[9] }],
  5: [
    { d: PIP[1] },
    { d: PIP[3] },
    { d: PIP[5] },
    { d: PIP[7] },
    { d: PIP[9] },
  ],
  6: [
    { d: PIP[1] },
    { d: PIP[3] },
    { d: PIP[4] },
    { d: PIP[6] },
    { d: PIP[7] },
    { d: PIP[9] },
  ],
};
