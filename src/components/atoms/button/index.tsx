"use client";

import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import classNames from "classnames";

import WoodTexture from "@/assets/images/wood-texture.jpg";

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export default function Button(
  props: PropsWithChildren<ButtonProps>
): ReactElement {
  return (
    <StyledButton
      type="button"
      //FIXME text-shadow 는 왜 tw 통해서 주입되지 않는 지 확인
      className={classNames("button", "text-shadow", props.className)}
      onClick={props.onClick}
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

    &:disabled {
      ${tw`opacity-50 cursor-not-allowed`}
      filter: brightness(80%);
    }

    &:active {
      ${tw`shadow-inner-bold translate-y-2`}
    }
  }
`;
