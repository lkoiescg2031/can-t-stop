import { Dispatch, Reducer, useReducer } from "react";

interface InitAction {
  type: "INIT";
}

interface RollingAction {
  type: "ROLLING";
}

interface SelectAction {
  type: "UPDATE_SELECT";
  targetIndx: number;
  newValue: boolean;
}

interface ApplyAction {
  type: "APPLY";
}

interface CampingAction {
  type: "CAMPING";
}

type ConsoleAction =
  | InitAction
  | RollingAction
  | SelectAction
  | ApplyAction
  | CampingAction;

interface ConsoleInitState {
  state: "init";
  dice: undefined[];
}

interface ConsoleSelectState {
  state: "select";
  dice: number[];
  selected: boolean[];
}

interface ConsoleContinueState {
  state: "continue";
  dice: undefined[];
}

export type ConsoleState =
  | ConsoleInitState
  | ConsoleSelectState
  | ConsoleContinueState;

const INIT_STATE: ConsoleInitState = {
  state: "init",
  dice: [undefined, undefined, undefined, undefined],
};

export type ConsoleChangeHandler = (event: {
  newState: ConsoleState;
  prevState: ConsoleState;
  action: ConsoleAction;
}) => void;

function consoleReducer(
  onStateChanged?: ConsoleChangeHandler
): (prevState: ConsoleState, action: ConsoleAction) => ConsoleState {
  return (prevState: ConsoleState, action: ConsoleAction): ConsoleState => {
    const newState: ConsoleState = ((): ConsoleState => {
      switch (action.type) {
        case "INIT": {
          return INIT_STATE;
        }
        case "ROLLING": {
          const newState: ConsoleSelectState = {
            state: "select",
            dice: [
              Math.floor(Math.random() * 6) + 1,
              Math.floor(Math.random() * 6) + 1,
              Math.floor(Math.random() * 6) + 1,
              Math.floor(Math.random() * 6) + 1,
            ],
            selected: [false, false, false, false],
          };

          return newState;
        }
        case "UPDATE_SELECT": {
          if (prevState.state !== "select") {
            return prevState;
          }

          const newSelected = Array.from(prevState.selected);
          newSelected[action.targetIndx] = action.newValue;

          return {
            ...prevState,
            selected: newSelected,
          };
        }
        case "APPLY": {
          return {
            state: "continue",
            dice: [undefined, undefined, undefined, undefined],
          };
        }
        case "CAMPING": {
          return INIT_STATE;
        }
      }

      return prevState;
    })();

    if (onStateChanged) {
      onStateChanged({ newState, prevState, action });
    }

    return newState;
  };
}

interface useConsoleReducerParam {
  defaultState?: ConsoleState;
  onStateChanged?: ConsoleChangeHandler;
}

export default function useConsoleReducer(
  params?: useConsoleReducerParam
): [ConsoleState, Dispatch<ConsoleAction>] {
  const [consoleState, dispatch] = useReducer<
    Reducer<ConsoleState, ConsoleAction>
  >(consoleReducer(params?.onStateChanged), params?.defaultState || INIT_STATE);

  return [consoleState, dispatch];
}
