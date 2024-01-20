import type { Meta, StoryObj } from "@storybook/react";

import InfoBox from "@/components/organisms/info-box";

/**  */
const meta = {
  title: "ORGANISMS/InfoBox",
  component: InfoBox,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    turn: 2,
    scores: { 1: [], 2: [], 3: [], 4: [] },
    children: "기본 메세지입니다.",
  },
};

export const PrevStart: Story = {
  args: {
    ...Default.args,
    turn: undefined,
    scores: undefined,
  },
};

export const PlayerTurn: Story = {
  args: {
    ...Default.args,
    turn: 1,
  },
};
