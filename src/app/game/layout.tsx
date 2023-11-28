import BoardLayout from "@/components/layouts/board-layout";
import React, { PropsWithChildren, ReactElement } from "react";

export interface GameLayoutProps {
  /* Prop Types */
}

export default function GameLayout(
  props: PropsWithChildren<GameLayoutProps>
): ReactElement {
  return <BoardLayout>{props.children}</BoardLayout>;
}
