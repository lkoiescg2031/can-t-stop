import GamePlaying from "@/components/templates/game-playing";
import React, { ReactElement } from "react";

export interface GamePlayingPageProps {}

export default function GamePlayingPage(
  props: GamePlayingPageProps
): ReactElement {
  return <GamePlaying />;
}
