import React from "react";

export type Order = "asc" | "desc";
export type ValueType = string | number | boolean | React.ReactNode;

export function getComparator<Key extends PropertyKey>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: ValueType }, b: { [key in Key]: ValueType }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const columnA = extractValue(a[orderBy]);
  const columnB = extractValue(b[orderBy]);

  if (columnB < columnA) {
    return -1;
  }
  if (columnB > columnA) {
    return 1;
  }
  return 0;
}

// TODO: any型をなんとかしたい
function extractValue(x: any): string {
  if (x instanceof Array) {
    return x.map((item) => extractValue(item)).join("");
  }
  if (x?.props?.children) {
    return extractValue(x.props.children);
  }
  return String(x);
}
