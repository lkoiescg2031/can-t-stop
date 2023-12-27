import type { Meta, StoryObj } from "@storybook/react";

import PickaxeMarker from "@/components/molecules/pickaxe-marker";

/** 곡갱이 마커 */
const meta = {
  title: "MOLECULES/PickaxeMarker",
  component: PickaxeMarker,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof PickaxeMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
