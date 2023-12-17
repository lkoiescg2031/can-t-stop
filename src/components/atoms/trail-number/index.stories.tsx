import type { Meta, StoryObj } from "@storybook/react";

import TrailNumber from "@/components/atoms/trail-number";
import { ReactElement } from "react";

/** 등산로 번호를 표시하는 컴포넌트 */
const meta = {
  title: "ATOMS/TrailNumber",
  component: TrailNumber,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof TrailNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

/** TrailNumber의 가장 기본적인 형태 */
export const Default: Story = {
  args: {
    variant: undefined,
    children: 8,
  },
};

/** TrailNumber의 최솟값 */
export const MinPeakNumber: Story = {
  args: {
    children: 2,
  },
};

/** TrailNumber의 최댓값 */
export const MaxPeakNumber: Story = {
  args: {
    children: 12,
  },
};

/** TrailNumber 흰색 타입 */
export const VariantWhite: Story = {
  args: {
    ...Default.args,
    variant: "white",
  },
  decorators: [
    (Story): ReactElement => <div className="bg-spot p-4">{Story()}</div>,
  ],
};

/** TrailNumber가 없을 때 */
export const NoPeakNumber: Story = {
  args: {
    children: undefined,
  },
};
