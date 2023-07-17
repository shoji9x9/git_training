import type { Meta, StoryObj } from "@storybook/react";

import { NormalCheckbox } from "../../../components/01_atoms/NormalCheckbox";
import { useState } from "react";

const meta = {
  title: "01_atoms/NormalCheckbox",
  component: NormalCheckbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: {
        type: "none",
      },
    },
    onClick: {
      control: {
        type: "none",
      },
    },
  },
} satisfies Meta<typeof NormalCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: ({ ...args }) => {
    const [checked, setChecked] = useState(false);

    return (
      <meta.component
        {...args}
        checked={checked}
        onClick={() => setChecked((checked) => !checked)}
      ></meta.component>
    );
  },
};

export const OnChange: Story = {
  render: ({ ...args }) => {
    const [checked, setChecked] = useState(false);
    const [log, setLog] = useState("");

    return (
      <>
        <meta.component
          {...args}
          checked={checked}
          onClick={() => setChecked((checked) => !checked)}
          onChange={() => setLog((log) => log + "onChange, ")}
        ></meta.component>
        {log}
      </>
    );
  },
};
