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
  },
};

// FIXME 스토리북 수정
export const SelectState: Story = {
  args: {
    ...InitialState.args,
  },
};

// FIXME 스토리북 수정
export const ContinueState: Story = {
  args: {
    ...InitialState.args,
  },
};
