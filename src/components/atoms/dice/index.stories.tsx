import type { Meta, StoryObj } from "@storybook/react";

import Dice from "@/components/atoms/dice";

/** 주사위 */
const meta = {
  title: "ATOMS/Dice",
  component: Dice,
  tags: ["autodocs"],
} satisfies Meta<typeof Dice>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 주사위 형태: 주사위가 굴려지는 중 */
export const Default: Story = {
  args: {},
};

/** 주사위가 : 1의 눈이 나왔을 떄 */
export const Dice1: Story = {
  args: {
    children: 1,
  },
};

/** 주사위가 : 2의 눈이 나왔을 떄 */
export const Dice2: Story = {
  args: {
    children: 2,
  },
};

/** 주사위가 : 3의 눈이 나왔을 떄 */
export const Dice3: Story = {
  args: {
    children: 3,
  },
};

/** 주사위가 : 4의 눈이 나왔을 떄 */
export const Dice4: Story = {
  args: {
    children: 4,
  },
};

/** 주사위가 : 5의 눈이 나왔을 떄 */
export const Dice5: Story = {
  args: {
    children: 5,
  },
};

/** 주사위가 : 6의 눈이 나왔을 떄 */
export const Dice6: Story = {
  args: {
    children: 6,
  },
};
