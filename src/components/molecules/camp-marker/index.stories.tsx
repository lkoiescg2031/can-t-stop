import type { Meta, StoryObj } from "@storybook/react";

import CampMarker from "@/components/molecules/camp-marker";

/** 베이스 캠프 */
const meta = {
  title: "MOLECULES/CampMarker",
  component: CampMarker,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CampMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 플레이어 1의 베이스 캠프 */
export const Player1: Story = {
  args: {
    player: 1,
  },
};

/** 플레이어 2의 베이스 캠프 */
export const Player2: Story = {
  args: {
    player: 2,
  },
};

/** 플레이어 3의 베이스 캠프 */
export const Player3: Story = {
  args: {
    player: 3,
  },
};

/** 플레이어 4의 베이스 캠프 */
export const Player4: Story = {
  args: {
    player: 4,
  },
};
