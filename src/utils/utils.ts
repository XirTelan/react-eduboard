export function formatYearValue(year: string) {
  return year.length <= 4 ? year.toString() : year.toString().split(' ')[3];
}

export function countCourse(year: string) {
  const startDate = new Date(`${year}-09-01T00:00:00`);
  console.log(startDate);
  const todayDate = Date.now();
  const diffInMs = todayDate - startDate.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25) + 1;

  // Round the result to two decimal places
  const diffInYearsRounded = diffInYears.toFixed(0);

  // Output the result
  return diffInYearsRounded;
  console.log(diffInYearsRounded);
}
