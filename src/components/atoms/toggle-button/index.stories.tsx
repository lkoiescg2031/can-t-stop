import type { Meta, StoryObj } from "@storybook/react";

import ToggleButton from "@/components/atoms/toggle-button";
import Dice from "@/components/atoms/dice";

const meta = {
  title: "ATOMS/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 토글 형태 */
export const Default: Story = {
  args: {
    children: <Dice>{3}</Dice>,
    defaultSelected: undefined,
    disabled: undefined,
  },
};

/** 기본값으로 선택한 경우 */
export const SelectedState: Story = {
  args: {
    ...Default.args,
    defaultSelected: true,
  },
};

/** 토글 비활성화 상태 */
export const DisabledState: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
