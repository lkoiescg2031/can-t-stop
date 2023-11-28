import React, { PropsWithChildren, ReactElement } from "react";

export interface BoardLayoutProps {
  /* Prop Types */
}

export default function BoardLayout(
  props: PropsWithChildren<BoardLayoutProps>
): ReactElement {
  return <div>{props.children}</div>;
}
