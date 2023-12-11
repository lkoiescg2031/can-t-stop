import React, { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import classNames from "classnames";

import WoodTexture from "@/assets/images/wood-texture.jpg";

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
}

export default function Button(
  props: PropsWithChildren<ButtonProps>
): ReactElement {
  return (
    <StyledButton
      className={classNames("button", props.className)}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  &.button {
    //button shape
    ${tw`px-4 p-2 rounded-full`}
    ${tw`outline outline-yellow-950 outline-[3px] outline-offset-[-6px]`}
    ${tw`shadow-md shadow-black`}
    background-image: url(${WoodTexture.src});

    // button text shape
    ${tw`text-2xl font-black text-yellow-950 align-middle`}
    text-shadow: 2px 2px 3px rgba(255,255,255,0.5);

    &:disabled {
      ${tw`opacity-50 cursor-not-allowed`}
      filter: brightness(80%);
    }
  }
`;
