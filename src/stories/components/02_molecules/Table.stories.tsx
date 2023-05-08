import type { Meta, StoryObj } from "@storybook/react";
import { Table, Row, Column } from "../../../components/02_molecules/Table";
import { useState } from "react";
import { ValueType } from "../../../utils/sortUtils";

type Desert = Row & {
  uid: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Desert {
  return {
    uid: "",
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows: readonly Desert[] = [
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
].map((row, index) => {
  row.uid = String(index);
  return row;
});

const columns: readonly Column[] = [
  {
    id: "uid",
    label: "uid",
    hidden: true,
  },
  {
    id: "name",
    label: "Dessert (100g serving)",
    component: "th",
    setId: true,
    scope: "row",
  },
  {
    id: "calories",
    align: "right",
    label: "Calories",
  },
  {
    id: "fat",
    align: "right",
    label: "Fat (g)",
  },
  {
    id: "carbs",
    align: "right",
    label: "Carbs (g)",
  },
  {
    id: "protein",
    align: "right",
    label: "Protein (g)",
  },
];

const meta = {
  title: "02_molecules/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: {
        type: "none",
      },
    },
    columns: {
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
    initialOrder: {
      control: {
        type: "none",
      },
    },
    initialOrderBy: {
      control: {
        type: "none",
      },
    },
    deleteSelectedRows: {
      control: {
        type: "none",
      },
    },
  },
  args: {
    tableTitle: "Table Title",
    rows: rows,
    columns: columns,
    selected: new Set(),
    setSelected: () => {
      return;
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState<Set<ValueType>>(new Set());

    return (
      <meta.component
        {...args}
        selected={selected}
        setSelected={setSelected}
      ></meta.component>
    );
  },
};

export const ConfirmToDelete: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState<Set<ValueType>>(new Set());

    return (
      <meta.component
        {...args}
        selected={selected}
        setSelected={setSelected}
        deleteSelectedRows={() => confirm("削除しますか？")}
      ></meta.component>
    );
  },
};

/**
 * # その他の設定
 * * Dessert列のパディングをnoneにする
 * * 初期ソートをcaloriesにする（Desc）
 */
export const Others: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState<Set<ValueType>>(new Set());
    const tmpColumns = [...columns];
    const tmpColumn = { ...tmpColumns[1] };
    tmpColumn.padding = "none";
    tmpColumns[1] = tmpColumn;

    return (
      <meta.component
        {...args}
        selected={selected}
        setSelected={setSelected}
        columns={tmpColumns}
        initialOrderBy="calories"
        initialOrder="desc"
      ></meta.component>
    );
  },
};
