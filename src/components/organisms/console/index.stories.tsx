import type { Meta, StoryObj } from "@storybook/react";

import Console from "@/components/organisms/console";

/** 게임 조종 컨트롤러 */
const meta = {
  title: "ORGANISMS/Console",
  component: Console,
  decorators: [
    (Story) => <div className="relative w-[300px] h-[200px]">{Story()}</div>,
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 초기 상태 */
export const InitialState: Story = {
  args: {},
};

export const SelectState: Story = {
  args: {
    defaultState: {
      state: "select",
      dice: [4, 5, 6, 2],
      selected: [false, true, false, false],
    },
  },
};

export const ContinueState: Story = {
  args: {
    defaultState: {
      state: "continue",
      dice: [undefined, undefined, undefined, undefined],
    },
  },
};
