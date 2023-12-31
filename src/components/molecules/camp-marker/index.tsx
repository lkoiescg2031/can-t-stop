"use client";

import React, { PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import Marker from "@/components/atoms/marker";
import CampIcon from "@/components/atoms/camp-icon";

export interface CampMarkerProps {
  className?: string;
  player: number;
}

/**
 * 캠프 마커
 */
export default function CampMarker(
  props: PropsWithChildren<CampMarkerProps>
): React.ReactElement {
  return (
    <StyledCampMarker
      className={classNames("camp-marker", props.className)}
      player={props.player}
    >
      <CampIcon className={classNames("icon")} />
      {props.children}
    </StyledCampMarker>
  );
}

const StyledCampMarker = styled(Marker)`
  &.camp-marker {
    .icon {
      ${tw`w-7 h-7 fill-white`}
    }
  }
`;
