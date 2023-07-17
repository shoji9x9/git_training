import type { Meta, StoryObj } from "@storybook/react";

import { ContainedButton } from "../../../components/01_atoms/ContainedButton";

const meta = {
  title: "01_atoms/ContainedButton",
  component: ContainedButton,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ContainedButton>;

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
