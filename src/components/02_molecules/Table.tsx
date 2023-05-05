import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellBaseProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { ElementType } from "react";

/* ソート関係 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends PropertyKey>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/* データ型 */
type KeyType = string | number;
type ValueType = string | number;

export type Data = Record<KeyType, ValueType> & {
  uid: ValueType;
};

export type HeaderCell<DataFromPage> = {
  disablePadding: boolean;
  id: keyof DataFromPage & keyof Data;
  label: string;
  numeric: boolean;
  hidden?: boolean;
  //   component?: string;
  component?: ElementType<TableCellBaseProps>;
  setId?: boolean;
  scope?: string;
  //   padding?: string;
  padding?: "checkbox" | "none" | "normal";
};

type TableHeaderProps<DataFromPage> = {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DataFromPage
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy?: keyof DataFromPage;
  rowCount: number;
  headers: readonly HeaderCell<DataFromPage>[];
};

function EnhancedTableHeader<DataFromPage>(
  props: TableHeaderProps<DataFromPage>
) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
  } = props;
  const createSortHandler =
    (property: keyof DataFromPage) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headers.map((headerCell) => (
          <TableCell
            key={headerCell.id}
            align={headerCell.numeric ? "right" : "left"}
            padding={headerCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headerCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headerCell.id}
              direction={orderBy === headerCell.id ? order : "asc"}
              onClick={createSortHandler(headerCell.id)}
            >
              {headerCell.label}
              {orderBy === headerCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type EnhancedTableToolbarProps = {
  numSelected: number;
  tableTitle: string;
};

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, tableTitle } = props;

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
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Nutrition */}
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export type TableProps<DataFromPage> = {
  tableTitle: string;
  rows: readonly DataFromPage[];
  headers: readonly HeaderCell<DataFromPage>[];
  selected: Set<ValueType>;
  setSelected: (selected: Set<ValueType>) => void;
  initialOrder?: Order;
  initialOrderBy?: keyof DataFromPage;
};

export default function EnhancedTable<DataFromPage extends Data>(
  props: TableProps<DataFromPage>
) {
  const {
    tableTitle,
    rows,
    headers,
    selected,
    setSelected,
    initialOrder = "asc",
    initialOrderBy,
  } = props;
  const [order, setOrder] = React.useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = React.useState<keyof DataFromPage | undefined>(
    initialOrderBy
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataFromPage
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

  const handleClick = (event: React.MouseEvent<unknown>, uid: ValueType) => {
    const newSelected: Set<ValueType> = new Set(selected);
    if (selected.has(uid)) {
      newSelected.delete(uid);
    } else {
      newSelected.add(uid);
    }

    setSelected(newSelected);
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

  const isSelected = (uid: ValueType) => selected.has(uid);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    const sortedRows = orderBy
      ? rows.slice().sort(getComparator(order, orderBy))
      : rows;

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.size}
          tableTitle={tableTitle}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHeader
              numSelected={selected.size}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headers={headers}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.uid);
                const labelId = `table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.uid)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.uid}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {Object.keys(row)
                      .slice(1)
                      .map((key, index) => {
                        return (
                          <TableCell
                            key={`${row.uid}-${key}`}
                            // {...(index === 0 && {
                            //   component: "th",
                            //   id: labelId,
                            //   scope: "row",
                            //   padding: "none",
                            // })}
                            // {...(index > 0 && { align: "right" })}
                            component={headers[index].component}
                            {...(headers[index].setId && { id: labelId })}
                            scope={headers[index].scope}
                            padding={headers[index].padding}
                            align={headers[index].numeric ? "right" : "left"}
                          >
                            {row[key]}
                          </TableCell>
                        );
                      })}

                    {/* <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
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
