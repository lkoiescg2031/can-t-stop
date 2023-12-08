import type { Meta, StoryObj } from "@storybook/react";
import Trails from "@/components/atoms/trail";

const meta = {
  title: "ATOMS/Trails",
  component: Trails,
  tags: ["autodocs"],
} satisfies Meta<typeof Trails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
