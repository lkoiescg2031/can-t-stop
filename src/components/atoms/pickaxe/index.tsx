"use client";

import React, { PropsWithChildren } from "react";

import classNames from "classnames";
import styled from "styled-components";

export interface PickaxeProps {
  className?: string;
}

/**
 * 캔트 스탑 주사위 굴림 표시용 말
 */
export default function Pickaxe(
  props: PropsWithChildren<PickaxeProps>
): React.ReactElement {
  return (
    <StyledPickaxeContainer
      className={classNames("pickaxe-container", props.className)}
    >
      <svg
        className={classNames("pickaxe")}
        width="30px"
        height="30px"
        viewBox="0 -1 36 36"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(45)"
      >
        <path
          d="M27.6 14.2426092L27.6 15.6852683C27.6 16.2158254 27.1970563 16.6459269 26.7 16.6459269L21.3 16.6459269C20.8029437 16.6459269 20.4 16.2158254 20.4 15.6852683L20.4 14.2426092C11.4042134 14.9678356 6 18.0459827 6 16.6339865 6 15.1676293 14.906129 9.9124942 22.2 9.07386223L22.2 8.96065854C22.2 8.43010148 22.6029437 8 23.1 8L24.9 8C25.3970563 8 25.8 8.43010148 25.8 8.96065854L25.8 9.0732069C33.093871 9.9124942 42 15.1676293 42 16.6339865 42 18.0459827 36.5957866 14.9678356 27.6 14.2426092zM22.5 18L25.5 18C26.0522847 18 26.5 18.4477153 26.5 19L26.5 39.5C26.5 40.8807119 25.3807119 42 24 42L24 42C22.6192881 42 21.5 40.8807119 21.5 39.5L21.5 19C21.5 18.4477153 21.9477153 18 22.5 18z"
          fill="#4A4A4A"
          fill-rule="evenodd"
          transform="translate(-6 -8)"
        />
      </svg>
      {props.children}
    </StyledPickaxeContainer>
  );
}

const StyledPickaxeContainer = styled.div`
  &.pickaxe-container {
  }
`;
