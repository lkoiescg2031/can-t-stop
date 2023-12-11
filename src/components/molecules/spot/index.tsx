"use client";

import React, { Children, MouseEventHandler, PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import TrailNumber from "@/components/atoms/trail-number";

export interface SpotProps {
  className?: string;
  peakNumber?: number;
  isClimbable?: boolean;
  onClick?: MouseEventHandler;
}

export default function Spot(
  props: PropsWithChildren<SpotProps>
): React.ReactElement {
  const countOfChildren = Children.count(props.children);
  const hasChild = countOfChildren > 0;

  return (
    <StyledSpot
      className={classNames(
        "spot",
        {
          climbable: props.isClimbable,
          peak: !!props.peakNumber,
          "has-child": hasChild,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      <TrailNumber className={classNames("peak-number")}>
        {props.peakNumber}
      </TrailNumber>
      {hasChild && (
        <div
          className={classNames(
            "marker-container",
            `child-count-${countOfChildren}`
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

    &.peak.has-child {
      .peak-number {
        ${tw`text-sm`}
      }

      ${tw`bg-player-none`}

      &:has(.player-1) {
        ${tw`bg-player-1`}
      }

      &:has(.player-2) {
        ${tw`bg-player-2`}
      }

      &:has(.player-3) {
        ${tw`bg-player-3`}
      }

      &:has(.player-4) {
        ${tw`bg-player-4`}
      }

      .pickaxe-icon {
        ${tw`w-5/6 h-5/6`}
      }

      .camp-icon {
        ${tw`w-full h-full`}
      }
    }
  }
`;
