"use client";

import classNames from "classnames";
import React, { ReactNode } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface UiBoardProps {
  className?: string;
  children?: ReactNode;
}

export default function UIBoard(props: UiBoardProps): React.ReactElement {
  return (
    <StyledBoard className={classNames("board", props.className)}>
      {props.children}
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  &.board {
    ${tw`flex flex-row justify-between`}
    & > *:not(:last-of-type) {
      ${tw`mr-2`}
    }
  }
`;
