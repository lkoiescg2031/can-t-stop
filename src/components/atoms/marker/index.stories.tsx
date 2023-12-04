import type { Meta, StoryObj } from "@storybook/react";

import Marker from "@/components/atoms/marker";

/** 마커 (기물의 단위) <br/>
 *  마커 컴포넌트는 마커의 크기, 외형 등을 결정하는 역할을 한다.
 *  마커의 주인에 따라 마카의 색상이 변경됨
 */
const meta = {
  title: "ATOMS/Marker",
  component: Marker,
  tags: ["autodocs"],
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 주인이 없는 기물 */
export const Default: Story = {
  args: {},
};

/** Player 1 기물 */
export const Player1Marker: Story = {
  args: {
    player: 1,
  },
};

/** Player 2 기물 */
export const Player2Marker: Story = {
  args: {
    player: 2,
  },
};

/** Player 3 기물 */
export const Player3Marker: Story = {
  args: {
    player: 3,
  },
};

/** Player 4 기물 */
export const Player4Marker: Story = {
  args: {
    player: 4,
  },
};
