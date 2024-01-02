import type { Meta, StoryObj } from "@storybook/react";

import GamePlaying from "@/components/templates/game-playing";

const meta = {
  title: "TEMPLATES/GamePlaying",
  component: GamePlaying,
  // tags: ["autodocs"],
} satisfies Meta<typeof GamePlaying>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
