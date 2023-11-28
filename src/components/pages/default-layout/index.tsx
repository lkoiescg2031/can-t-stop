import React, { PropsWithChildren, ReactElement } from "react";
import "@/styles/global/index.css";
import GlobalStyles from "@/styles/global-styles";
import StyledComponentsRegistry from "@/lib/registry";

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
