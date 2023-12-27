import type { Meta, StoryObj } from "@storybook/react";
import Board from "@/components/organisms/board";
import { appendMarker, createBoard } from "@/models/board";

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
    board: createBoard(),
  },
};

let PEAK_MARKER_BOARD = appendMarker(
  Default.args.board,
  { trail: 2, height: 2 },
  3
);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 3, height: 4 }, 1);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 4, height: 6 }, 2);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 5, height: 8 }, 3);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 6, height: 10 },
  1
);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 7, height: 12 },
  2
);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 8, height: 10 },
  3
);
PEAK_MARKER_BOARD = appendMarker(PEAK_MARKER_BOARD, { trail: 9, height: 8 }, 1);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 10, height: 6 },
  2
);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 11, height: 4 },
  3
);
PEAK_MARKER_BOARD = appendMarker(
  PEAK_MARKER_BOARD,
  { trail: 12, height: 2 },
  1
);

/** 꼭대기에 모든 켐프가 설치되어 있는 상태 */
export const PeakMarkerBoard: Story = {
  args: {
    board: PEAK_MARKER_BOARD,
  },
};
