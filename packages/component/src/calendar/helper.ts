import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';
dayjs.extend(weekday);
dayjs.locale('zh-cn');

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function yearMonths(date: Dayjs) {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ].map((it) => it.map((i) => date.month(i).startOf('month')));
}

export function monthWeeks(date: Dayjs) {
  const weeks: Dayjs[][] = [[], [], [], [], [], []];
  const startDate = date.startOf('month').weekday(0);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      weeks[i][j] = startDate.weekday(i * 7 + j);
    }
  }
  return weeks;
}
