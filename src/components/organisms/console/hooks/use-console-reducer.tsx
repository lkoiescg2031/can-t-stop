import { Dispatch, Reducer, useEffect, useReducer } from "react";

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

type __ConsoleAction =
  | ConsoleAction
  | {
      type: "___CHANGE_EVENT_HANDLER";
      newHandler?: ConsoleChangeHandler;
    };

type __ConsoleState = ConsoleState & {
  onStateChanged?: ConsoleChangeHandler;
};

export type ConsoleChangeHandler = (event: {
  newState: ConsoleState;
  prevState: ConsoleState;
  action: ConsoleAction;
}) => void;

function consoleReducer(
  prevState: __ConsoleState,
  action: __ConsoleAction
): __ConsoleState {
  const newState: ConsoleState = ((): ConsoleState => {
    switch (action.type) {
      case "INIT": {
        return INIT_STATE;
      }
      case "ROLLING": {
        const newDices = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ];

        newDices.sort();

        const newState: ConsoleSelectState = {
          state: "select",
          dice: newDices,
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

  if (action.type === "___CHANGE_EVENT_HANDLER") {
    return {
      ...newState,
      onStateChanged: action.newHandler,
    };
  }

  if (prevState.onStateChanged) {
    prevState.onStateChanged({ newState, prevState, action });
  }

  return {
    ...newState,
    onStateChanged: prevState.onStateChanged,
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
    Reducer<__ConsoleState, __ConsoleAction>
  >(consoleReducer, {
    ...(params?.defaultState || INIT_STATE),
    onStateChanged: params?.onStateChanged,
  });

  useEffect(() => {
    dispatch({
      type: "___CHANGE_EVENT_HANDLER",
      newHandler: params?.onStateChanged,
    });
  }, [params?.onStateChanged]);

  return [consoleState, dispatch];
}
