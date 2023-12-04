"use client";

import { Player } from "@/models/player";
import classNames from "classnames";
import React, { ReactNode } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface MarkerProps {
  className?: string;
  player?: Player;
  children?: ReactNode;
}

export default function Marker(props: MarkerProps): React.ReactElement {
  return (
    <StyledMarkerDiv
      className={classNames(
        "marker",
        props.player && `player-${props.player}`,
        props.className
      )}
    >
      {props.children}
    </StyledMarkerDiv>
  );
}

const StyledMarkerDiv = styled.div`
  &.marker {
    ${tw`w-10 h-10 rounded-full flex items-center justify-center outline-none bg-player-none`}

    &.player-1 {
      ${tw`bg-player-1`}
    }

    &.player-2 {
      ${tw`bg-player-2`}
    }

    &.player-3 {
      ${tw`bg-player-3`}
    }

    &.player-4 {
      ${tw`bg-player-4`}
    }
  }
`;
