import { CSSProperties, ReactNode, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Radio from '../radio';
import Select, { SelectValue } from '../select';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';
import { monthWeeks, yearMonths } from './helper';
dayjs.extend(weekday);
dayjs.locale('zh-cn');

export type CalendarModeType = 'year' | 'month';

export type CalendarProps = {
  className?: string | string[];
  style?: CSSProperties;
  weekdays?: string[];
  modeNames?: string[];
  mode?: CalendarModeType;
  value?: Dayjs;
  cellRender?: (date: Dayjs, mode: CalendarModeType) => ReactNode;
  disabledDate?: (date: Dayjs) => boolean;
  onChange?: (date: Dayjs) => void;
  onPanelChange?: (date: Dayjs, mode: CalendarModeType) => void;
};

export default function Calendar({
  weekdays = ['一', '二', '三', '四', '五', '六', '日'],
  className,
  style,
  modeNames = ['月', '年'],
  mode = 'month',
  value,
  cellRender,
  disabledDate,
  onChange,
  onPanelChange,
}: CalendarProps) {
  const now = dayjs();
  const [_mode, setMode] = useState<CalendarModeType>(mode);
  const [_value, setValue] = useState<Dayjs>(value || dayjs());

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((it) => ({
    value: it,
    label: it,
  }));

  const years = () => {
    return Array.from({ length: 20 }, (_, i) => _value.year() + i - 10).map(
      (it) => ({ value: it, label: `${it}` })
    );
  };

  const rows = () => {
    if (_mode === 'year') {
      return yearMonths(_value);
    } else {
      return monthWeeks(_value);
    }
  };

  const onModeChange = (v: string | number) => {
    setMode(v as CalendarModeType);
  };

  const onChanger = (date: Dayjs) => {
    setValue(date);
    if (onChange) onChange(date);
  };

  const onCellClick = (date: Dayjs) => {
    onChanger(date);
  };

  const onYearChange = (v: SelectValue) => {
    onChanger(_value.year(v as number));
  };
  const onMonthChange = (v: SelectValue) => {
    onChanger(_value.month((v as number) - 1));
  };

  return (
    <div
      className={classNames(`${cssPrefix}calendar`, className)}
      style={style}>
      <div className={classNames(`${cssPrefix}calendar-header`)}>
        <Select
          onChange={onYearChange}
          clearable={false}
          style={{ width: '80px' }}
          options={years()}
          value={_value.year()}
        />
        {_mode === 'month' && (
          <Select
            onChange={onMonthChange}
            clearable={false}
            style={{ width: '60px' }}
            options={months}
            value={_value.month() + 1}
          />
        )}
        <Radio.Group
          type="button"
          onChange={onModeChange}
          value={_mode}
          options={[
            { value: 'month', label: modeNames[0] },
            { value: 'year', label: modeNames[1] },
          ]}></Radio.Group>
      </div>
      <table className={classNames(`${cssPrefix}calendar-content`)}>
        {_mode === 'month' && (
          <thead>
            <tr>
              {weekdays.map((week, i) => (
                <th key={`week_${i}`}>{week}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows().map((cells, ri) => (
            <tr key={`r_${ri}`}>
              {cells.map((cell, ci) => (
                <td key={`c_${ri}_${ci}`}>
                  <div
                    onClick={() => onCellClick(cell)}
                    className={classNames(`${cssPrefix}calendar-cell`, {
                      disabled:
                        _mode === 'month'
                          ? !cell.isSame(_value, 'month')
                          : false,
                      today: cell.isSame(
                        now,
                        _mode === 'month' ? 'day' : 'month'
                      ),
                      active: cell.isSame(
                        _value || now,
                        _mode === 'month' ? 'day' : 'month'
                      ),
                    })}>
                    <div className={`${cssPrefix}calendar-cell-value`}>
                      {_mode === 'month' ? cell.date() : cell.month() + 1}
                    </div>
                    <div className={`${cssPrefix}calendar-cell-content`}>
                      {cellRender && cellRender(cell, _mode)}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
