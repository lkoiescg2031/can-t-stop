import type { Meta, StoryObj } from "@storybook/react";

import PickaxeIcon from "@/components/atoms/pickaxe-icon";

/** 곡갱이 아이콘 */
const meta = {
  title: "ATOMS/PickaxeIcon",
  component: PickaxeIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof PickaxeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
