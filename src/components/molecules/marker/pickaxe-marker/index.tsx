"use client";

import React, { PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import Marker from "@/components/atoms/marker";
import PickaxeIcon from "@/components/atoms/icon/pickaxe-icon";

export interface PickaxeMarkerProps {
  className?: string;
}

/**
 * 곡갱이 표시 마커
 */
export default function PickaxeMarker(
  props: PropsWithChildren<PickaxeMarkerProps>
): React.ReactElement {
  return (
    <StyledPickaxeMarker
      className={classNames("pickaxe-marker", props.className)}
    >
      <PickaxeIcon className={classNames("icon")} />
      {props.children}
    </StyledPickaxeMarker>
  );
}

const StyledPickaxeMarker = styled(Marker)`
  &.pickaxe-marker {
    .icon {
      ${tw`w-5 h-5 fill-spot`}
    }
  }
`;
