"use client";

import classNames from "classnames";
import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface TrailNumberProps {
  className?: string;
  variant?: "white";
  children?: number;
}

export default function TrailNumber(
  props: TrailNumberProps
): ReactElement | null {
  if (!props.children) {
    return null;
  }

  return (
    <StyledPeakNumber
      className={classNames("trail-number", props.variant, props.className)}
    >
      {props.children}
    </StyledPeakNumber>
  );
}

const StyledPeakNumber = styled.span`
  &.trail-number {
    ${tw`font-bold text-2xl text-spot`}
    ${tw`flex select-none`}
    
    &.white {
      ${tw`text-white`}
    }
  }
`;
