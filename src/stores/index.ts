import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { GameSlice, createGameSlice } from "@/stores/slices/game-slice";
import { createSelectors } from "@/stores/utils/selector-utils";

type GlobalState = GameSlice;

const useGlobalStoreBase = create<GlobalState>()(
  persist(
    immer(
      devtools((...args) => ({
        ...createGameSlice(...args),
      }))
    ),
    {
      name: "game-persist",
    }
  )
);

export const useGlobalStoreSelector = createSelectors(useGlobalStoreBase);
