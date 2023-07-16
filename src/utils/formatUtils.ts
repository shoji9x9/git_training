/**
 * 日付をyyyy/MM/dd HH:mm:ss形式にフォーマットする
 * @param date
 * @returns
 */
export function formatDateTime(date: Date): string {
  const padZero = (num: number) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}/${padZero(date.getMonth() + 1)}/${padZero(
    date.getDate()
  )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(
    date.getSeconds()
  )}`;
}
