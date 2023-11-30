import type { Meta, StoryObj } from "@storybook/react";

import Camp from "./index";

const meta = {
  title: "ATOMS/Camp",
  component: Camp,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Camp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
