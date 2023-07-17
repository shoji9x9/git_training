import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "../../../components/01_atoms/Tag";

const meta = {
  title: "01_atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "タグ1",
  },
};
