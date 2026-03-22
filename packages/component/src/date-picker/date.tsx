import { useState, useRef } from 'react';
import Picker, { PickerProps, PickerMethods } from './picker';
import { cssPrefix, classNames } from '../helper';
import Icon from '../icon';
import { monthWeeks } from '../calendar/helper';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { MonthContent } from './month';

export type DateContentProps = {
  weekdays?: string[];
  format?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

export function DateContent({
  weekdays = [],
  format,
  value,
  onChange,
}: DateContentProps) {
  const currentDate = dayjs();
  const [_value, setValue] = useState(value);
  const [_selected, setSelected] = useState<Dayjs>(dayjs(value));
  const [showMonth, setShowMonth] = useState(false);

  const onPrev = () => {
    setSelected(_selected.subtract(1, 'month'));
  };
  const onNext = () => {
    setSelected(_selected.add(1, 'month'));
  };
  const onCellClick = (evt: React.MouseEvent, v: Dayjs) => {
    evt.stopPropagation();
    setValue(v.format(format));
    setSelected(v);
    if (onChange) onChange(v.format(format));
  };

  const weeks = monthWeeks(_selected);

  const onMonthChange = (v: string) => {
    const ymd = dayjs(v);
    setSelected(_selected.year(ymd.year()).month(ymd.month()));
    setShowMonth(false);
  };

  const onShowMonth = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setShowMonth(true);
  };

  if (showMonth)
    return (
      <MonthContent
        onChange={onMonthChange}
        value={_selected.format('YYYY-MM')}
      />
    );

  return (
    <div className={`${cssPrefix}picker`}>
      <div className={`${cssPrefix}picker-header`}>
        <div className={`${cssPrefix}picker-prev`} onClick={onPrev}>
          <Icon type="angleLeft" />
        </div>
        <div className={`${cssPrefix}picker-button`} onClick={onShowMonth}>
          {_selected.format('YYYY-MM')}
        </div>
        <div className={`${cssPrefix}picker-next`} onClick={onNext}>
          <Icon type="angleRight" />
        </div>
      </div>
      <div className={`${cssPrefix}picker-body`}>
        <table className={`${cssPrefix}picker-content`}>
          <thead>
            <tr>
              {weekdays.map((it) => (
                <th key={it}>{it}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((row, i) => (
              <tr key={`tr_${i}`}>
                {row.map((cell, j) => (
                  <td
                    key={`td_${j}_${i}`}
                    className={classNames('day', {
                      today: cell.isSame(currentDate, 'day'),
                      active: _value && cell.isSame(_value, 'day'),
                      disabled: !cell.isSame(_selected, 'month'),
                    })}
                    onClick={(evt) => onCellClick(evt, cell)}>
                    {cell.date()}
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

export type DatePicker = DateContentProps &
  Omit<PickerProps, 'value' | 'popupContent' | 'onInputChange'>;

export default function DatePicker({
  weekdays = ['一', '二', '三', '四', '五', '六', '日'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  onClear,
  placeholder,
  ...restProps
}: DatePicker) {
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
      value={_value}
      style={{ width: '130px' }}
      placeholder={placeholder || '请选择日期'}
      onClear={_onClear}
      onInputChange={onInputChange}
      popupContent={
        <DateContent format={format} onChange={_onChange} value={_value} />
      }
      {...restProps}
    />
  );
}
