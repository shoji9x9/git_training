import type { Meta, StoryObj } from "@storybook/react";

import { NumberField } from "../../../components/01_atoms/NumberField";
import { useState } from "react";

const meta = {
  title: "01_atoms/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: {
        type: "none",
      },
    },
    onChange: {
      contorol: {
        type: "none",
      },
    },
  },
  args: {
    label: "Label",
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState(0);

    return (
      <meta.component
        {...args}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        value={value}
      ></meta.component>
    );
  },
};

export const OnChange: Story = {
  argTypes: {
    helperText: {
      control: {
        type: "none",
      },
    },
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState(999);

    return (
      <meta.component
        {...args}
        helperText={String(value)}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        value={value}
      ></meta.component>
    );
  },
};

export const Error: Story = {
  argTypes: {
    helperText: {
      control: {
        type: "none",
      },
    },
    error: {
      control: {
        type: "none",
      },
    },
    required: {
      control: {
        type: "none",
      },
    },
  },
  args: {
    required: true,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState(-1);

    const [helperText, setHelperText] =
      useState("1以上の数値を入力してください");

    return (
      <meta.component
        {...args}
        onChange={(e) => {
          setValue(Number(e.target.value));
          if (Number(e.target.value) < 1) {
            setHelperText("1以上の数値を入力してください");
          } else {
            setHelperText("");
          }
        }}
        value={value}
        helperText={helperText}
        error={helperText !== ""}
      ></meta.component>
    );
  },
};
