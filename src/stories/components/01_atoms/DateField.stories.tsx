import type { Meta, StoryObj } from "@storybook/react";

import { DateField } from "../../../components/01_atoms/DateField";
import { useState } from "react";

const meta = {
  title: "01_atoms/DateField",
  component: DateField,
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
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState("");

    return (
      <meta.component
        {...args}
        onChange={(e) => {
          setValue(e.target.value);
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
    const [value, setValue] = useState("1900-01-01");

    return (
      <meta.component
        {...args}
        helperText={value}
        onChange={(e) => {
          setValue(e.target.value);
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
    const [value, setValue] = useState("");
    const [helperText, setHelperText] = useState("必須入力です");

    return (
      <meta.component
        {...args}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            setHelperText("必須入力です");
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
