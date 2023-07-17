import type { Meta, StoryObj } from "@storybook/react";

import { TrushBoxButton } from "../../../components/02_molecules/TrushBoxButton";

const meta = {
  title: "02_molecules/TrushBoxButton",
  component: TrushBoxButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TrushBoxButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const OnClick: Story = {
  args: {
    ...Base.args,
    onClick: () => confirm("削除しますか？"),
  },
};
