"use client";

import React, { MouseEventHandler, PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import Camp from "../camp";
import Pickaxe from "../pickaxe";

type TrailNumberType = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface StyledSpotContainerProps {
  isClickable?: boolean;
  onClick?: MouseEventHandler;
}

export interface SpotProps extends StyledSpotContainerProps {
  trailNumber?: TrailNumberType;
  className?: string;
}

/**
 * 베이스캠프
 */
export default function Spot(
  props: PropsWithChildren<SpotProps>
): React.ReactElement {
  return (
    <StyledSpotContainer
      className={classNames("spot-container", props.className)}
      isClickable={props.isClickable}
      onClick={props.onClick}
    >
      <div
        className={classNames("spot", {
          clickable: props.isClickable || props.onClick,
        })}
      >
        {props.children}
        {props.trailNumber && (
          <span className={classNames("spot-number")}>{props.trailNumber}</span>
        )}
      </div>
    </StyledSpotContainer>
  );
}

//FIXME 맥 환경에서 클릭시 커서 생기는 이슈 있음
const StyledSpotContainer = styled.div<StyledSpotContainerProps>`
  &.spot-container {
    .spot {
      ${tw`w-14 h-14 rounded-full flex flex-row justify-center items-center bg-slate-100 `}

      &.clickable {
        ${tw`cursor-pointer outline hover:outline-amber-400`}
      }

      .spot-number {
        ${tw`flex font-bold text-2xl text-slate-700 cursor-default`}
      }
    }
  }
`;