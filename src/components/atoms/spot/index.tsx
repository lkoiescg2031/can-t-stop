"use client";

import React, { Children, MouseEventHandler, PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import { PeakNumberType } from "@/models/spot";
import { Player } from "@/models/player";

export interface SpotProps {
  peakNumber?: PeakNumberType;
  conqueror?: Player;
  onClimb?: MouseEventHandler;
  className?: string;
}

export default function Spot(
  props: PropsWithChildren<SpotProps>
): React.ReactElement {
  return (
    <StyledSpot
      className={classNames(
        "spot",
        {
          climbable: !!props.onClimb,
        },
        props.className
      )}
      onClick={props.onClimb}
    >
      {props.peakNumber && (
        <span
          className={classNames("peak-number", {
            "has-child": Children.count(props.children) > 0,
          })}
        >
          {props.peakNumber}
        </span>
      )}
      {Children.count(props.children) > 0 && (
        <div
          className={classNames(
            "marker-container",
            `child-count-${Children.count(props.children)}`
          )}
        >
          {props.children}
        </div>
      )}
    </StyledSpot>
  );
}

//FIXME 맥 환경에서 클릭시 커서 생기는 이슈 있음
const StyledSpot = styled.div`
  &.spot {
    ${tw`w-16 h-16 rounded-full bg-spot border-none outline-none`}
    ${tw`flex flex-col justify-center items-center`}

    &.climbable {
      ${tw`cursor-pointer outline-amber-400 hover:animate-bounce`}
    }

    .peak-number {
      ${tw`font-bold text-2xl text-white`}
      ${tw`flex cursor-default`}
        
      &.has-child {
        ${tw`text-base`}
      }
    }

    .marker-container {
      ${tw`h-10`}
      ${tw`flex relative`}

      .marker {
        ${tw`border-2 border-solid border-spot`}
        ${tw`absolute`}

        &:nth-of-type(1) {
          ${tw`z-[40] left-0`}
        }
        &:nth-of-type(2) {
          ${tw`z-[30] left-2`}
        }
        &:nth-of-type(3) {
          ${tw`z-[20] left-4`}
        }
        &:nth-of-type(4) {
          ${tw`z-[10] left-6`}
        }
      }

      &.child-count-1 {
        ${tw`min-w-[2.5rem]`}

        .marker {
          ${tw`border-none`}
        }
      }
      &.child-count-2 {
        ${tw`min-w-[3rem]`}
      }
      &.child-count-3 {
        ${tw`min-w-[3.5rem]`}
      }
      &.child-count-4 {
        ${tw`min-w-[4rem]`}
      }
    }

    &:hover {
      .marker-container {
        .marker {
          ${tw`static border-none mr-1`}

          &:last-of-type {
            ${tw`mr-0`}
          }
        }
      }
    }
  }
`;
