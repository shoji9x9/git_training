export function isEmptyObject(
  obj: Record<string, unknown> | null
): obj is never {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
}
