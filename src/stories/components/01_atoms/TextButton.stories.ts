import type { Meta, StoryObj } from "@storybook/react";

import { TextButton } from "../../../components/01_atoms/TextButton";

const meta = {
  title: "01_atoms/TextButton",
  component: TextButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "Link",
  },
};

export const OnClick: Story = {
  args: {
    ...Base.args,
    onClick: () => confirm("遷移しますか？"),
  },
};

export const Href: Story = {
  args: {
    ...Base.args,
    href: "https://www.google.com/",
  },
};
