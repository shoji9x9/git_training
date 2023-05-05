import type { Meta, StoryObj } from "@storybook/react";
import EnhancedTable, {
  Data,
  HeaderCell,
} from "../../../components/02_molecules/Table";
import { useState } from "react";

type DataInPage = Data & {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): DataInPage {
  return {
    uid: name,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows: readonly DataInPage[] = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const headers: readonly HeaderCell<Data>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
    component: "th",
    setId: true,
    scope: "row",
    padding: "none",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

const meta = {
  title: "02_molecules/EnhancedTable",
  component: EnhancedTable,
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: {
        type: "none",
      },
    },
    headers: {
      control: {
        type: "none",
      },
    },
    selected: {
      control: {
        type: "none",
      },
    },
    setSelected: {
      control: {
        type: "none",
      },
    },
  },
  //     onChange: {
  //       contorol: {
  //         type: "none",
  //       },
  //     },
  //     options: {
  //       control: {
  //         type: "none",
  //       },
  //     },
  //     onInputChange: {
  //       contorol: {
  //         type: "none",
  //       },
  //     },
  //   },
  args: {
    tableTitle: "Table Title",
    rows: rows,
    headers: headers,
    selected: new Set(),
    setSelected: () => {
      return;
    },
  },
} satisfies Meta<typeof EnhancedTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState<Set<keyof Data>>(new Set());

    return (
      <meta.component
        {...args}
        selected={selected}
        setSelected={setSelected}
      ></meta.component>
    );
  },
};
