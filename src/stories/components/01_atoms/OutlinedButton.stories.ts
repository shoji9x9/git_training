import type { Meta, StoryObj } from "@storybook/react";

import { OutlinedButton } from "../../../components/01_atoms/OutlinedButton";

const meta = {
  title: "01_atoms/OutlinedButton",
  component: OutlinedButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OutlinedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: "Button",
  },
};

export const OnClick: Story = {
  args: {
    ...Base.args,
    onClick: () => confirm("登録しますか？"),
  },
};

export const Href: Story = {
  args: {
    ...Base.args,
    href: "https://www.google.com/",
  },
};
