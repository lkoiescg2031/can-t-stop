import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/atoms/button";

/** 버튼 */
const meta = {
  title: "ATOMS/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 버튼*/
export const Default: Story = {
  args: {
    children: "roll dice",
  },
};

/** 큰 버튼 */
export const LargeSizeButton: Story = {
  args: {
    children: "large size button",
  },
};

/** 비활성 버튼 */
export const DisabledButton: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
