"use client";

import Marker from "@/components/atoms/marker";
import classNames from "classnames";
import React, { ReactElement, PropsWithChildren } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface InfoBoxProps {
  className?: string;
  turn?: number;
  scores?: Record<number, number[]>;
}

export default function InfoBox(
  props: PropsWithChildren<InfoBoxProps>
): ReactElement {
  return (
    <StyledInfoBox className={classNames("info-box", props.className)}>
      {props.turn !== undefined && (
        <div className={classNames("turn", "info")}>
          <Marker player={props.turn} /> &nbsp;의 턴입니다.
        </div>
      )}
      {props.scores !== undefined && (
        <div className={classNames("scores", "info")}>
          {Object.entries(props.scores).map(([player, score], index) => (
            <Marker
              className={classNames("score")}
              key={`score-${index}`}
              player={parseInt(player, 10)}
            >
              {score.length}
            </Marker>
          ))}
        </div>
      )}
      <div className={classNames("message", "info")}>{props.children}</div>
    </StyledInfoBox>
  );
}

const StyledInfoBox = styled.div`
  &.info-box {
    ${tw`font-medium text-2xl`}

    .info {
      ${tw`p-3`}
    }

    .turn {
      ${tw`flex flex-row justify-center align-middle`}
    }

    .scores {
      ${tw`flex flex-row justify-center`}

      .score {
        ${tw`mx-2`}

        &.player-1,
        &.player-2,
        &.player-3 {
          ${tw`text-white`}
        }
      }
    }
    .message {
      ${tw`text-center`}
    }
  }
`;
