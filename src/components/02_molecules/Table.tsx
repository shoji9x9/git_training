import * as React from "react";
import { alpha, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MUITable from "@mui/material/Table";
import MUITableBody from "@mui/material/TableBody";
import TableCell, { TableCellBaseProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ElementType } from "react";
import { TrushBoxButton } from "./TrushBoxButton";
import { getComparator, Order, ValueType } from "../../utils/sortUtils";
import { NormalCheckbox } from "../01_atoms/NormalCheckbox";
import { SerializedStyles } from "@emotion/react";

/* データ型 */
type ColumnId = string;

export type Column = {
  id: ColumnId;
  label?: string;
  align?: "center" | "left" | "right" | "justify" | "inherit";
  hidden?: boolean;
  component?: ElementType<TableCellBaseProps>;
  setId?: boolean;
  scope?: string;
  padding?: "checkbox" | "none" | "normal";
  sx?: SxProps;
};

export type Row = Record<Column["id"], ValueType> & {
  uid: ValueType;
};

/* テーブル本体 */
export type TableProps = {
  tableTitle: string;
  rows: readonly Row[];
  columns: readonly Column[];
  selected: Set<ValueType>;
  setSelected: (selected: Set<ValueType>) => void;
  initialOrder?: Order;
  initialOrderBy?: keyof Row;
  rowHeight?: number;
  deleteSelectedRows?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Table(props: TableProps): JSX.Element {
  const heightInMediumSize = 53;
  const minimumHeight = 33;
  const {
    tableTitle,
    rows,
    columns,
    selected,
    setSelected,
    initialOrder = "asc",
    initialOrderBy,
    rowHeight = heightInMediumSize,
    deleteSelectedRows,
  } = props;
  const [order, setOrder] = React.useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = React.useState<keyof Row | undefined>(
    initialOrderBy
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Row
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected: ValueType[] = rows.map((n) => n.uid);
      setSelected(new Set(newSelected));
      return;
    }
    setSelected(new Set());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 最後のページを空行で埋めるために利用。何行の空行が必要か計算する。
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // 表示すべきデータの絞り込み
  const visibleRows = React.useMemo(() => {
    const sortedRows = orderBy
      ? rows.slice().sort(getComparator(order, orderBy))
      : rows;

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar
          numSelected={selected.size}
          tableTitle={tableTitle}
          deleteSelectedRows={deleteSelectedRows}
        />
        <TableContainer>
          <MUITable size={rowHeight < heightInMediumSize ? "small" : "medium"}>
            <TableHeader
              numSelected={selected.size}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
              rowHeight={Math.max(rowHeight, minimumHeight) + 4}
            />

            <TableBody
              visibleRows={visibleRows}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
              emptyRows={emptyRows}
              rowHeight={Math.max(rowHeight, minimumHeight)}
            />
          </MUITable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

/* ツールバー（テーブルタイトルなど） */
function SelectedMessageText({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Typography
      sx={{ flex: "1 1 100%" }}
      color="inherit"
      variant="subtitle1"
      component="div"
    >
      {children}
    </Typography>
  );
}

function TableTitleText({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Typography
      sx={{ flex: "1 1 100%" }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {children}
    </Typography>
  );
}

type TableToolbarProps = {
  numSelected: number;
  tableTitle: string;
  deleteSelectedRows?: React.MouseEventHandler<HTMLButtonElement>;
};

function TableToolbar(props: TableToolbarProps): JSX.Element {
  const { numSelected, tableTitle, deleteSelectedRows } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <SelectedMessageText>{numSelected} selected</SelectedMessageText>
      ) : (
        <TableTitleText>{tableTitle}</TableTitleText>
      )}
      {numSelected > 0 && deleteSelectedRows && (
        <TrushBoxButton onClick={deleteSelectedRows} />
      )}
    </Toolbar>
  );
}

/* テーブルヘッダー */
type TableHeaderProps = {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Row
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy?: keyof Row;
  rowCount: number;
  columns: readonly Column[];
  rowHeight: number;
};

function TableHeader(props: TableHeaderProps): JSX.Element {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    rowHeight,
  } = props;
  const createSortHandler =
    (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ height: rowHeight }}>
        <TableCell padding="checkbox">
          <NormalCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
        {columns
          .filter((column) => !column.hidden)
          .map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              padding={column.padding}
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

/* テーブルボディ */
type TableBodyProps = {
  visibleRows: Row[];
  columns: readonly Column[];
  selected: Set<ValueType>;
  setSelected: (selected: Set<ValueType>) => void;
  emptyRows: number;
  rowHeight: number;
};

function TableBody(props: TableBodyProps): JSX.Element {
  const { visibleRows, columns, selected, setSelected, emptyRows, rowHeight } =
    props;

  const isSelected = (uid: ValueType) => selected.has(uid);

  const handleClick = (event: React.MouseEvent<unknown>, uid: ValueType) => {
    const newSelected: Set<ValueType> = new Set(selected);
    if (selected.has(uid)) {
      newSelected.delete(uid);
    } else {
      newSelected.add(uid);
    }

    setSelected(newSelected);
  };

  // チェックボックス列分を考慮
  const columnCount = columns.filter((x) => !x.hidden).length + 1;

  // TODO: データ構造を見直してフィルターせずに済むようにする
  const getColumn = (key: string) => {
    const column = columns.find((x) => x.id === key);
    return column;
  };

  return (
    <MUITableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.uid);
        const labelId = `table-checkbox-${index}`;

        return (
          <TableRow
            hover
            tabIndex={-1}
            key={String(row.uid)}
            selected={isItemSelected}
            sx={{ height: rowHeight }}
          >
            {/* チェックボックスの列 */}
            <TableCell padding="checkbox">
              <NormalCheckbox
                checked={isItemSelected}
                onClick={(event) => handleClick(event, row.uid)}
              />
            </TableCell>

            {/* データの列 */}
            {Object.keys(row)
              .filter((key) => !getColumn(key)?.hidden)
              .map((key) => {
                const column = getColumn(key);
                return (
                  <TableCell
                    key={`${row.uid}-${key}`}
                    // component={column?.component}
                    component={"td"}
                    {...(column?.setId && { id: labelId })}
                    scope={column?.scope}
                    padding={column?.padding}
                    align={column?.align}
                    sx={column?.sx}
                  >
                    {row[key]}
                  </TableCell>
                );
              })}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow sx={{ height: rowHeight * emptyRows }}>
          <TableCell colSpan={columnCount} />
        </TableRow>
      )}
    </MUITableBody>
  );
}
