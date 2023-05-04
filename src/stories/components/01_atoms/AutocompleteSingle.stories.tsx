import type { Meta, StoryObj } from "@storybook/react";

import { AutocompleteSingle } from "../../../components/01_atoms/AutocompleteSingle";
import { useState } from "react";
import { OptionType } from "../../../components/01_atoms/type/AutocompleteProps";

const options = [
  { key: "1", value: "The Shawshank Redemption" },
  { key: "2", value: "The Godfather" },
  { key: "3", value: "The Godfather: Part II" },
  { key: "4", value: "The Dark Knight" },
  { key: "5", value: "12 Angry Men" },
  { key: "6", value: "Schindler's List" },
  { key: "7", value: "Pulp Fiction" },
  {
    key: "8",
    value: "The Lord of the Rings: The Return of the King",
  },
  { key: "9", value: "The Good, the Bad and the Ugly" },
  { key: "10", value: "Fight Club" },
  {
    key: "11",
    value: "The Lord of the Rings: The Fellowship of the Ring",
  },
  {
    key: "12",
    value: "Star Wars: Episode V - The Empire Strikes Back",
  },
  { key: "13", value: "Forrest Gump" },
  { key: "14", value: "Inception" },
  {
    key: "15",
    value: "The Lord of the Rings: The Two Towers",
  },
  { key: "16", value: "One Flew Over the Cuckoo's Nest" },
  { key: "17", value: "Goodfellas" },
  { key: "18", value: "The Matrix" },
  { key: "19", value: "Seven Samurai" },
  {
    key: "20",
    value: "Star Wars: Episode IV - A New Hope",
  },
  { key: "21", value: "City of God" },
  { key: "22", value: "Se7en" },
  { key: "23", value: "The Silence of the Lambs" },
  { key: "24", value: "It's a Wonderful Life" },
  { key: "25", value: "Life Is Beautiful" },
  { key: "26", value: "The Usual Suspects" },
  { key: "27", value: "Léon: The Professional" },
  { key: "28", value: "Spirited Away" },
  { key: "29", value: "Saving Private Ryan" },
  { key: "30", value: "Once Upon a Time in the West" },
  { key: "31", value: "American History X" },
  { key: "32", value: "Interstellar" },
];

const meta = {
  title: "01_atoms/AutocompleteSingle",
  component: AutocompleteSingle,
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
    options: {
      control: {
        type: "none",
      },
    },
  },
  args: {
    autocompleteInputFieldProps: { label: "Label" },
    options: options,
  },
} satisfies Meta<typeof AutocompleteSingle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    // value: "",
    value: { key: "1", value: "The Shawshank Redemption" },
  },
  render: ({ ...args }) => {
    // const [value, setValue] = useState<OptionType | null>(null);
    const [value, setValue] = useState<OptionType | null>({
      key: "1",
      value: "The Shawshank Redemption",
    });

    return (
      <meta.component
        {...args}
        // value={value}
        // onChange={(event, value) => {
        //   setValue(value);
        // }}
        // onInputChange={(event, value) => {
        //   console.log(value);
        // }}
        // options={options}
      ></meta.component>
    );
  },
};
