import { ReactNode, Fragment, useState, useCallback, useRef } from 'react';
import { cssPrefix, classNames } from '../helper';
import {
  InternalSelect,
  LabeledValue,
  RawValue,
  InternalSelectProps,
  InternalSelectMethods,
} from './select';
import dayjs from 'dayjs';
import Icon from '../icon';

export type SelectYearProps = {
  value?: number;
} & Omit<
  InternalSelectProps,
  | 'multiple'
  | 'value'
  | 'onTagClear'
  | 'onSearch'
  | 'onKeyDown'
  | 'icon'
  | 'popupContent'
  | 'popupMaxHeight'
  | 'loading'
  | 'searchable'
>;
export function SelectYear({
  value = dayjs().year(),
  ...restProps
}: SelectYearProps) {
  const [_value, setValue] = useState({ value, label: value });

  const startYear = parseInt(Math.trunc(_value.value / 10) + '0');
  const years = [
    [startYear - 1, startYear, startYear + 1],
    [startYear + 2, startYear + 3, startYear + 4],
    [startYear + 5, startYear + 6, startYear + 7],
    [startYear + 8, startYear + 9, startYear + 10],
  ];

  const onCellClick = (v: number) => {
    setValue({ value: v, label: v });
  };

  const popupContent = (
    <div className={`${cssPrefix}picker`}>
      <div className={`${cssPrefix}picker-header`}>
        <Icon type="angleLeft" />
        <div className={`${cssPrefix}picker-header-text`}>
          {startYear} - {startYear + 9}
        </div>
        <Icon type="angleRight" />
      </div>
      <div className={`${cssPrefix}pikcer-body`}>
        <table className={`${cssPrefix}picker-content`}>
          <tbody>
            {years.map((year, i) => (
              <tr>
                {year.map((it, j) => (
                  <td
                    className={classNames({
                      active: it === _value.value,
                      disabled: (i === 0 && j === 0) || (i === 3 && j === 2),
                    })}
                    onClick={() => onCellClick(it)}>
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
  return (
    <InternalSelect
      multiple={false}
      value={_value}
      popupContent={popupContent}
      {...restProps}
    />
  );
}
