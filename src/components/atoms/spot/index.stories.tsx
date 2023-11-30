import type { Meta, StoryObj } from "@storybook/react";

import Spot from "./index";

const meta = {
  title: "ATOMS/Spot",
  component: Spot,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Spot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SpotWithTrailNumber: Story = {
  args: {
    trailNumber: 3,
  },
};

export const SpotWithMaxTrailNumber: Story = {
  args: {
    trailNumber: 12,
  },
};

export const ClickableSpot: Story = {
  args: {
    ...SpotWithTrailNumber.args,
    isClickable: true,
  },
};

export const OnlyClickableCallbackSpot: Story = {
  args: {
    ...SpotWithTrailNumber.args,
    onClick: () => {},
  },
};
