"use client";
//TODO storybook 추가
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import styled from "styled-components";
import tw from "twin.macro";

import type { IGame } from "@/models/game";
import classNames from "classnames";

export interface GameDevToolProps {
  className?: string;
  game: IGame;
}

export default function GameDevTool(
  props: PropsWithChildren<GameDevToolProps>
): ReactElement {
  const prevGameRef = useRef<IGame>();
  const [showConsole, setShowConsole] = useState<boolean>(true);

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  useEffect(() => {
    prevGameRef.current = props.game;
  }, [props.game]);

  return (
    <StyledGameDevToolContainer className={classNames("dev-tool")}>
      {showConsole || (
        <button onClick={toggleConsole}>
          <svg width="10" height="10" viewBox="0 0 24 24">
            <path d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z" />
          </svg>
        </button>
      )}
      {showConsole && (
        <div onClick={toggleConsole} className={classNames("dev-tool-console")}>
          <div className={classNames("dev-tool-console-tap")}>
            <span className={classNames("title")}>now</span>
            {Object.entries(props.game).map(([key, value]) => (
              <div
                key={`dev-tool-console-${key}`}
                className={classNames("dev-key-value")}
              >
                <pre>
                  {key} : {JSON.stringify(value, null, "\t")}
                </pre>
              </div>
            ))}
          </div>

          {prevGameRef.current && (
            <div className={classNames("dev-tool-console-tap")}>
              <span className={classNames("title")}>pre</span>
              {Object.entries(prevGameRef.current).map(([key, value]) => (
                <div
                  key={`dev-tool-console-${key}`}
                  className={classNames("dev-key-value")}
                >
                  <pre>
                    {key} : {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </StyledGameDevToolContainer>
  );
}

const StyledGameDevToolContainer = styled.div`
  &.dev-tool {
    ${() => tw`absolute top-0 left-0 p-2`}
    ${() => tw`text-xs`}

    .dev-tool-console {
      ${() => tw`flex bg-stone-800/25 p-4`}
      .dev-tool-console-tap {
        ${() => tw`mr-10`}
        .title {
          ${() => tw`mb-2 font-bold text-sm`}
        }
        .dev-key-value {
          ${() => tw`flex items-start`}
          .key-expand-button {
            ${() => tw`mr-1`}
          }
        }
      }
    }
  }
`;
