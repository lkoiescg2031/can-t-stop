import type { Meta, StoryObj } from "@storybook/react";
import Board from "@/components/organisms/board";
import { EMPTY_BOARD, appendMarker } from "@/models/board";

/** 게임 플레이 보드 (게임진행관련 로직 포함) */
const meta = {
  title: "ORGANISMS/Board",
  component: Board,
  tags: ["autodocs"],
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

/** board 위에 어떠한 기물도 올라와있지 않는 상태 */
export const Default: Story = {
  args: {
    board: EMPTY_BOARD,
  },
};

let PEAK_MARKER_BOARD = appendMarker(EMPTY_BOARD, { trail: 0, hight: 2 }, 3);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 1, hight: 4 }, 1);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 2, hight: 6 }, 2);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 3, hight: 8 }, 3);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 4, hight: 10 }, 1);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 5, hight: 12 }, 2);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 6, hight: 10 }, 3);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 7, hight: 8 }, 1);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 8, hight: 6 }, 2);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 9, hight: 4 }, 3);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 10, hight: 2 }, 1);

/** 꼭대기에 모든 켐프가 설치되어 있는 상태 */
export const PeakMarkerBoard: Story = {
  args: {
    board: PEAK_MARKER_BOARD,
  },
};
