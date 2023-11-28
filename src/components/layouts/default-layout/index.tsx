import React, { PropsWithChildren, ReactElement } from "react";
import GlobalStyles from "@/styles/global-styles";
import StyledComponentsRegistry from "@/lib/registry";

import "@/styles/global/index.css";

export interface DefaultLayoutProps {
  className?: string;
}

export default function DefaultLayout(
  props: PropsWithChildren<DefaultLayoutProps>
): ReactElement {
  return (
    <html lang="ko">
      <body className={props.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {props.children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
