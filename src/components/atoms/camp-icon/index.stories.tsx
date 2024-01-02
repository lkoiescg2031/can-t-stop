import type { Meta, StoryObj } from "@storybook/react";

import CampIcon from "@/components/atoms/camp-icon";

/** 캠프 아이콘 */
const meta = {
  title: "ATOMS/CampIcon",
  component: CampIcon,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CampIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
