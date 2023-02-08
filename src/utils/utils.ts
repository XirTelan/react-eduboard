export function formatYearValue(year: string) {
  return year.length <= 4 ? year.toString() : year.toString().split(' ')[3];
}
