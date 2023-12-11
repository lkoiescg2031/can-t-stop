import React, { PropsWithChildren } from "react";

import type { BoardType } from "@/models/board";

import Spot from "@/components/molecules/spot";
import CampMarker from "@/components/molecules/markers/camp-marker";
import PickaxeMarker from "@/components/molecules/markers/pickaxe-marker";
import Trail from "@/components/atoms/trail";
import UIBoard from "@/components/atoms/ui-board";

export interface BoardProps {
  className?: string;
  board: BoardType;
}

export default function Board(
  props: PropsWithChildren<BoardProps>
): React.ReactElement {
  return (
    <UIBoard>
      {Object.entries(props.board).map(([trailNumber, trailData]) => (
        <Trail key={`trail-${trailNumber}`}>
          {trailData.map((markers, spotIndex) => (
            <Spot
              key={`spot-${trailNumber}-${spotIndex}`}
              peakNumber={
                // if spotIndex is last, then render trailNumber
                spotIndex === trailData.length - 1
                  ? parseInt(trailNumber)
                  : undefined
              }
            >
              {markers.map((marker, markerIndex) => {
                if (marker == "pickaxe") {
                  return <PickaxeMarker key={`marker-${markerIndex}`} />;
                } else if (typeof marker === "number") {
                  return (
                    <CampMarker key={`marker-${markerIndex}`} player={marker} />
                  );
                }

                throw new Error(
                  `unexpected marker value : ${marker}(${typeof marker})`
                );
              })}
            </Spot>
          ))}
        </Trail>
      ))}
      {props.children}
    </UIBoard>
  );
}
