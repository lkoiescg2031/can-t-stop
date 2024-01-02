"use client";

import classNames from "classnames";
import React, { MouseEventHandler, ReactElement, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface ToggleButtonProps {
  className?: string;
  /** 커스텀 스위치 */
  children?: ReactElement;
  /** 토글 선택 불가능 한 상태 */
  disabled?: boolean;
  /** 토글 초기값 */
  defaultSelected?: boolean;
  /** 토글 버튼을 눌렀을 때 동작 */
  onToggleChanged?: (selected: boolean) => void;
}

export default function ToggleButton(props: ToggleButtonProps): ReactElement {
  const [selected, setSelected] = useState<boolean>(!!props.defaultSelected);

  const handleToggleClicked: MouseEventHandler = (e) => {
    if (props.disabled) {
      return;
    }

    const newSelected = !selected;

    setSelected(newSelected);

    if (props.onToggleChanged) {
      props.onToggleChanged(newSelected);
    }
  };

  return (
    <StyledToggleButton
      type="button"
      disabled={props.disabled}
      className={classNames(
        "toggle-button",
        "components-container",
        {
          selected,
          disabled: props.disabled,
        },
        props.className
      )}
      onClick={handleToggleClicked}
    >
      <div className={classNames("toggle-item-container")}>
        {props.children}
      </div>
    </StyledToggleButton>
  );
}

const StyledToggleButton = styled.button`
  &.toggle-button {
    ${tw`inline-block p-2`}

    .toggle-item-container {
      ${tw`rounded-md shadow-emboss-bold`}
      ${tw`transition-spacing mt-[100%]`}
    }

    &.selected {
      .toggle-item-container {
        ${tw`mt-[0] mb-[100%]`}
      }
    }

    &.disabled {
      .toggle-item-container {
        ${tw`shadow-none`}
      }
    }
  }
`;
