import type { Meta, StoryObj } from "@storybook/react";

import Spot from "@/components/molecules/spot";
import PickaxeMarker from "@/components/molecules/pickaxe-marker";
import CampMarker from "@/components/molecules/camp-marker";

/** 게임 판에 말이 이동할 수 있는 지점을 표시하는 컴포넌트 */
const meta = {
  title: "MOLECULES/Spot",
  component: Spot,
  argTypes: {},
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Spot>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Spot 의 가장 기본적인 형태 */
export const Default: Story = {
  args: {},
};

/** 클릭 가능한 상태의 Spot */
export const ClimbableSpot: Story = {
  args: {
    isClimbable: true,
  },
};

/** 빈 지점에 어떤 플레이어가 등반 중인 상태 */
export const SpotWithPickaxe: Story = {
  render: (args) => (
    <Spot {...args}>
      <PickaxeMarker />
    </Spot>
  ),
};

/** 어떤 플레이어가 캠핑 중인 상태 */
export const SpotWith1Player: Story = {
  render: (args) => (
    <Spot {...args}>
      <CampMarker player={1} />
    </Spot>
  ),
};

/** 어떤 플레이어가 캠핑 중이고 다른 플레이어가 클릭 가능한 상태 */
export const ClimbableSpotWith1Player: Story = {
  args: ClimbableSpot.args,
  render: SpotWith1Player.render,
};

/** 2명의 플레이어가 캠핑 중인 상태*/
export const SpotWith2Player: Story = {
  render: (args) => (
    <Spot {...args}>
      <CampMarker player={1} />
      <CampMarker player={2} />
    </Spot>
  ),
};

/** 3명의 플레이어가 캠핑 중인 상태*/
export const SpotWith3Player: Story = {
  render: (args) => (
    <Spot {...args}>
      <CampMarker player={1} />
      <CampMarker player={2} />
      <CampMarker player={3} />
    </Spot>
  ),
};

/** 어떤 3명의 플레이어가 캠핑 중이고 다른 플레이어가 클릭 가능한 상태 */
export const ClimbableSpotWith3Player: Story = {
  args: ClimbableSpot.args,
  render: SpotWith3Player.render,
};

/** 모든 플레이어가 캠핑 중인 상태 */
export const SpotWith4Player: Story = {
  render: (args) => (
    <Spot {...args}>
      <CampMarker player={1} />
      <CampMarker player={2} />
      <CampMarker player={3} />
      <CampMarker player={4} />
    </Spot>
  ),
};

/** 3 플레이어가 캠핑 중이고 한 플레이어가 클라이밍 중인 상태 */
export const SpotWithPickaxeAnd3Player: Story = {
  render: (args) => (
    <Spot {...args}>
      <PickaxeMarker />
      <CampMarker player={1} />
      <CampMarker player={2} />
      <CampMarker player={3} />
    </Spot>
  ),
};

/** 봉우리 지점의 Spot */
export const PeakSpot: Story = {
  args: {
    peakNumber: 3,
  },
};

/** 봉우리 번호가 12번 일 때 (2자리 수 UI/UX 확인) */
export const MaxPeakNumber: Story = {
  args: {
    peakNumber: 12,
  },
};

/** 봉우리에 어떤 플레이어가 등반이 가능할 때 */
export const ClimbablePeak: Story = {
  args: {
    ...MaxPeakNumber.args,
    ...ClimbableSpot.args,
  },
};

/** 봉우리에 어떤 플레이어가 등반 중일 때 */
export const PeakWithPickaxe: Story = {
  args: {
    ...PeakSpot.args,
    children: <PickaxeMarker />,
  },
};

/** 어떤 플레이어가 등반한 후 캠프까지 설치했을 때 */
export const ConqueredPeak: Story = {
  args: {
    ...MaxPeakNumber.args,
    children: <CampMarker player={1} />,
  },
};
