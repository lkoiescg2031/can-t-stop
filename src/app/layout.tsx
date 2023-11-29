import type { Metadata } from "next";
import DefaultLayout from "@/components/layouts/default-layout";
import React, { PropsWithChildren, ReactElement } from "react";

export const metadata: Metadata = {
  title: "Can't stop",
  description: "Board game Can't stop",
};

export default function RootLayout(props: PropsWithChildren): ReactElement {
  return <DefaultLayout>{props.children}</DefaultLayout>;
}
