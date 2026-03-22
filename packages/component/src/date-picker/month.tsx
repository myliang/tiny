import { useState, useRef } from 'react';
import Picker, { PickerProps, PickerMethods } from './picker';
import { cssPrefix, classNames } from '../helper';
import Icon from '../icon';
import { yearMonths } from '../calendar/helper';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import YearPicker, { YearContent } from './year';

export type MonthContentProps = {
  format?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

export function MonthContent({ format, value, onChange }: MonthContentProps) {
  const currentDate = dayjs();
  const [_value, setValue] = useState(value);
  const [_selected, setSelected] = useState<Dayjs>(dayjs(value));
  const [showYear, setShowYear] = useState(false);

  const onPrev = () => {
    setSelected(_selected.subtract(1, 'y'));
  };
  const onNext = () => {
    setSelected(_selected.add(1, 'y'));
  };
  const onCellClick = (evt: React.MouseEvent, v: Dayjs) => {
    evt.stopPropagation();
    setValue(v.format(format));
    if (onChange) onChange(v.format(format));
  };
  const months = yearMonths(_selected);

  const onYearChange = (year?: number) => {
    if (year) {
      setSelected(_selected.year(year));
      setShowYear(false);
    }
  };
  const onStateChange = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setShowYear(true);
  };
  return showYear ? (
    <YearContent onChange={onYearChange} value={_selected.year()} />
  ) : (
    <div className={`${cssPrefix}picker`}>
      <div className={`${cssPrefix}picker-header`}>
        <div className={`${cssPrefix}picker-prev`} onClick={onPrev}>
          <Icon type="angleLeft" />
        </div>
        <div className={`${cssPrefix}picker-button`} onClick={onStateChange}>
          {_selected.year()}
        </div>
        <div className={`${cssPrefix}picker-next`} onClick={onNext}>
          <Icon type="angleRight" />
        </div>
      </div>
      <div className={`${cssPrefix}picker-body`}>
        <table className={`${cssPrefix}picker-content`}>
          <tbody>
            {months.map((row, i) => (
              <tr key={`tr_${i}`}>
                {row.map((cell, j) => (
                  <td
                    key={`td_${j}_${i}`}
                    className={classNames('month', {
                      today:
                        cell.isSame(currentDate, 'month') &&
                        cell.isSame(currentDate, 'year'),
                      active: cell.format(format) === _value,
                    })}
                    onClick={(evt) => onCellClick(evt, cell)}>
                    {cell.month() + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type MonthPicker = MonthContentProps &
  Omit<PickerProps, 'value' | 'popupContent' | 'onInputChange'>;

export default function MonthPicker({
  format = 'YYYY-MM',
  value,
  onChange,
  placeholder,
  ...restProps
}: MonthPicker) {
  const pickerRef = useRef<PickerMethods>(null);
  const [_value, setValue] = useState(value);

  const _onChange = (v?: string) => {
    setValue(v);
    if (onChange) onChange(v);
    pickerRef.current?.hide();
  };

  const onInputChange = (txt: string) => {
    setValue(txt);
  };

  const _onClear = () => {
    setValue(undefined);
    if (onChange) onChange();
  };

  return (
    <Picker
      ref={pickerRef}
      style={{ width: '120px' }}
      value={_value}
      placeholder={placeholder || '请选择月份'}
      onClear={_onClear}
      onInputChange={onInputChange}
      popupContent={
        <MonthContent format={format} value={_value} onChange={_onChange} />
      }
      {...restProps}
    />
  );
}
