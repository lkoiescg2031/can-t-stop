"use client";

import classNames from "classnames";
import React, { ReactNode } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface TrailProps {
  className?: string;
  children?: ReactNode;
}

export default function Trail(props: TrailProps): React.ReactElement {
  return (
    <StyledTrail className={classNames("trail", props.className)}>
      {props.children}
    </StyledTrail>
  );
}

const StyledTrail = styled.div`
  &.trail {
    ${tw`flex flex-col-reverse justify-start`}
    & > *:not(:last-of-type) {
      ${tw`mt-2`}
    }
  }
`;
