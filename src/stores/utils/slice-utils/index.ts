import { StateCreator } from "zustand";

export type ImmerStateCreator<T> = StateCreator<
  T,
  [["zustand/immer", never], never],
  [],
  T
>;

type AnyFunc = (...args: any) => any;

// type AutoGenerateFunc 

// function isAutoGenerateFunction(value:any): value is 

export function autoCreateSlice<ActionState extends object, Origin>(
  state: ActionState
): ImmerStateCreator<Origin> {
  return (...args): Origin => {
    const T: Origin = {} as Origin;

    return T;
  };
}
