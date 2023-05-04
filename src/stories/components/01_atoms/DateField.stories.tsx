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
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Label",
    value: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ label, value: _value, ...args }) => {
    const [value, setValue] = useState("");

    return (
      <meta.component
        {...args}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        label={label}
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
  args: {
    label: "Label",
    value: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ label, value: _value, ...args }) => {
    const [value, setValue] = useState("");

    return (
      <meta.component
        {...args}
        helperText={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        label={label}
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
    label: "Label",
    value: "",
    required: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ label, value: _value, ...args }) => {
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
        label={label}
        value={value}
        helperText={helperText}
        error={helperText !== ""}
      ></meta.component>
    );
  },
};
