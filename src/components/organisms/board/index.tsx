"use client";

import React, { PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";
import tw from "twin.macro";
import { MAX_TRAIL_HIGHS, BoardType } from "@/models/board";
import Spot from "@/components/atoms/spot";
import CampMarker from "@/components/molecules/marker/camp-marker";
import PickaxeMarker from "@/components/molecules/marker/pickaxe-marker";

export interface BoardProps {
  className?: string;
  board: BoardType;
}

export default function Board(
  props: PropsWithChildren<BoardProps>
): React.ReactElement {
  return (
    <StyledBoard className={classNames("board", props.className)}>
      <div className={classNames("trails")}>
        {props.board.map((trail, trailIndex) => (
          <div className={classNames("trail")} key={`trail-${trailIndex + 2}`}>
            {trail.map((markers, spotIndex) => (
              <Spot
                key={`spot-${trailIndex + 2}-${spotIndex}`}
                className={classNames("trail-item")}
                isClimbable={false}
                peakNumber={
                  spotIndex === MAX_TRAIL_HIGHS[trailIndex + 2] - 1
                    ? trailIndex + 2
                    : undefined
                }
              >
                {markers.map((marker, markerIndex) => {
                  if (marker == "pickaxe") {
                    return <PickaxeMarker key={`marker-${markerIndex}`} />;
                  } else if (typeof marker === "number") {
                    return (
                      <CampMarker
                        key={`marker-${markerIndex}`}
                        player={marker}
                      />
                    );
                  }

                  throw new Error(
                    `unexpected marker value : ${marker}(${typeof marker})`
                  );
                })}
              </Spot>
            ))}
          </div>
        ))}
      </div>
      {props.children}
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  &.board {
    .trails {
      ${tw`flex flex-row justify-between`}
      .trail {
        ${tw`flex flex-col-reverse justify-start`}
        .trail-item {
          ${tw`mt-2`}
        }
      }
    }
  }
`;
