import type { Meta, StoryObj } from "@storybook/react";
import UIBoard from "@/components/atoms/ui-board";

const meta = {
  title: "ATOMS/UIBoard",
  component: UIBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof UIBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
