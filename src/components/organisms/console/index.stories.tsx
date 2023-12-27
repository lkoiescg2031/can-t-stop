import type { Meta, StoryObj } from "@storybook/react";

import Console from "@/components/organisms/console";

/** 게임 조종 컨트롤러 */
const meta = {
  title: "ORGANISMS/Console",
  component: Console,
  tags: ["autodocs"],
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 초기 상태 */
export const InitialState: Story = {
  args: {
    className: undefined,
    onConsoleUpdated: undefined,
    defaultState: undefined,
  },
};

export const SelectState: Story = {
  args: {
    ...InitialState.args,
    defaultState: {
      state: "select",
      dice: [4, 5, 6, 2],
      selected: [false, true, false, false],
    },
  },
};

export const ContinueState: Story = {
  args: {
    ...InitialState.args,
    defaultState: {
      state: "continue",
      dice: [undefined, undefined, undefined, undefined],
    },
  },
};
