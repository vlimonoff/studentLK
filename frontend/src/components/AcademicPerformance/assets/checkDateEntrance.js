export function checkDateEntrance(date) {
  const periods = ['2023-02-01', '2023-08-31'];
  return new Date(date) >= new Date(periods[0]) && new Date(date) <= new Date(periods[1]);
}
