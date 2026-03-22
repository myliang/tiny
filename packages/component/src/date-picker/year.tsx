import { useEffect, useRef, useState } from 'react';
import Picker, { PickerMethods, PickerProps } from './picker';
import { cssPrefix, classNames } from '../helper';
import Icon from '../icon';

export type YearContentProps = {
  value?: number;
  onChange?: (value?: number) => void;
};
export function YearContent({ value, onChange }: YearContentProps) {
  const currentYear = new Date().getFullYear();

  const [_value, setValue] = useState(value);
  const [startYear, setStartYear] = useState(
    parseInt(Math.trunc(currentYear / 10) + '0')
  );

  const years = [
    [startYear - 1, startYear, startYear + 1],
    [startYear + 2, startYear + 3, startYear + 4],
    [startYear + 5, startYear + 6, startYear + 7],
    [startYear + 8, startYear + 9, startYear + 10],
  ];
  const onPrev = () => {
    setStartYear(startYear - 10);
  };
  const onNext = () => {
    setStartYear(startYear + 10);
  };

  const onCellClick = (evt: React.MouseEvent, v: number) => {
    evt.stopPropagation();
    setValue(v);
    if (onChange) onChange(v);
  };

  useEffect(() => {
    setStartYear(parseInt(Math.trunc((_value || currentYear) / 10) + '0'));
  }, [value]);

  return (
    <div className={`${cssPrefix}picker`}>
      <div className={`${cssPrefix}picker-header`}>
        <div className={`${cssPrefix}picker-prev`} onClick={onPrev}>
          <Icon type="angleLeft" />
        </div>
        <div className={`${cssPrefix}picker-header-text`}>
          {startYear} - {startYear + 9}
        </div>
        <div className={`${cssPrefix}picker-next`} onClick={onNext}>
          <Icon type="angleRight" />
        </div>
      </div>
      <div className={`${cssPrefix}picker-body`}>
        <table className={`${cssPrefix}picker-content`}>
          <tbody>
            {years.map((year, i) => (
              <tr key={`tr_${i}`}>
                {year.map((it, j) => (
                  <td
                    key={`td_${j}_${i}`}
                    className={classNames('year', {
                      today: it === currentYear,
                      active: it === _value,
                      disabled: (i === 0 && j === 0) || (i === 3 && j === 2),
                    })}
                    onClick={(evt) => onCellClick(evt, it)}>
                    {it}
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

export type YearPicker = YearContentProps &
  Omit<PickerProps, 'value' | 'popupContent' | 'onInputChange'>;

export default function YearPicker({
  value,
  onChange,
  placeholder,
  ...restProps
}: YearPicker) {
  const pickerRef = useRef<PickerMethods>(null);
  const [_value, setValue] = useState(value);

  const _onChange = (v?: number) => {
    setValue(v);
    if (onChange) onChange(v);
    pickerRef.current?.hide();
  };

  const onInputChange = (txt: string) => {
    if (/^\d+$/.test(txt) && txt.length === 4) {
      const nv = parseInt(txt);
      setValue(nv);
    } else {
      setValue(_value);
    }
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
      placeholder={placeholder || '请选择年份'}
      onClear={_onClear}
      onInputChange={onInputChange}
      popupContent={<YearContent value={_value} onChange={_onChange} />}
      {...restProps}
    />
  );
}
