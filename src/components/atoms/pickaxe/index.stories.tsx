import type { Meta, StoryObj } from "@storybook/react";

import Pickaxe from "./index";

const meta = {
  title: "ATOMS/Pickaxe",
  component: Pickaxe,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Pickaxe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
