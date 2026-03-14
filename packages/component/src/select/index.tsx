import { ReactNode, Fragment, useState, useCallback, useRef } from 'react';
import { cssPrefix, classNames } from '../helper';
import {
  InternalSelect,
  LabeledValue,
  RawValue,
  InternalSelectProps,
} from './select';

export type SelectOptGroupType = {
  label: ReactNode;
  options: LabeledValue[];
};
export type SelectOptionType = SelectOptGroupType | LabeledValue;
export type SelectValue = RawValue | RawValue[];

// type SelectOptionProps = {
//   value: LabeledValue;
//   active?: boolean;
//   onClick: (value: LabeledValue) => void;
// };
// function SelectOption({ value, active, onClick }: SelectOptionProps) {
//   return (
//     <li
//       onClick={() => onClick(value)}
//       className={classNames(`${cssPrefix}menu-item`, {
//         active,
//       })}>
//       {value.label}
//     </li>
//   );
// }
// type SelectOptGroupProps = {
//   value: SelectOptGroupType;
//   onItemClick: (value: LabeledValue) => void;
// };
// function SelectOptGroup({ value, onItemClick }: SelectOptGroupProps) {
//   return (
//     <Fragment>
//       <li className={classNames(`${cssPrefix}menu-item group`)}>
//         {value.label}
//       </li>
//       {value.options && value.options.map(it => <SelectOption value={it} />)}
//     </Fragment>
//   );
// }

export type SelectProps = {
  value?: SelectValue;
  options: SelectOptionType[];
  filterOption?: (q: string, value: LabeledValue) => boolean;
  onChange?: (value: SelectValue) => void;
  onDeselect?: (value: LabeledValue) => void;
  onSelect?: (value: LabeledValue) => void;
} & Omit<InternalSelectProps, 'value' | 'onTagClear'>;

export default function Select({
  multiple = false,
  value,
  options,
  onChange,
  onDeselect,
  onSelect,
  ...restProps
}: SelectProps) {
  const [_value, setValue] = useState<SelectValue | undefined>(value);

  // item-active
  const itemActive = (it: SelectOptionType) => {
    // console.log('_value', _value);
    if (it.options === undefined) {
      const it1 = it as LabeledValue;
      const v = it1.value;
      return Array.isArray(_value) ? _value.includes(v) : _value === v;
    }
    return false;
  };

  const onItemClicker = (it: LabeledValue) => {
    if (multiple) {
      let nValue: RawValue[] = [];
      if (_value !== undefined) {
        if (Array.isArray(_value)) {
          nValue = [..._value];
          if (_value.some((v) => v === it.value)) {
            nValue = _value.filter((v) => v !== it.value);
          } else {
            nValue.push(it.value);
          }
        } else {
          nValue.push(_value, it.value);
        }
      } else {
        nValue.push(it.value);
      }
      setValue(nValue);
      if (onSelect) onSelect(it);
      if (onChange) onChange(nValue);
    } else {
      setValue(it.value);
      if (onChange) onChange(it.value);
    }
  };

  const itemRender = (it: SelectOptionType, key: string) => {
    return (
      <Fragment key={key}>
        <li
          onClick={() => onItemClicker(it as LabeledValue)}
          className={classNames(
            `${cssPrefix}menu-item`,
            it.options && 'group',
            {
              active: itemActive(it),
            }
          )}>
          {it.label}
        </li>
        {it.options &&
          (it.options as LabeledValue[]).map((_, i) =>
            itemRender(_, `${key}-${i}`)
          )}
      </Fragment>
    );
  };

  const getLabeledValues = (items: SelectOptionType[]) => {
    const ret: LabeledValue[] = [];
    for (let it of items) {
      if (it.options !== undefined) {
        ret.push(...getLabeledValues(it.options));
      } else {
        ret.push(it as LabeledValue);
      }
    }
    return ret;
  };

  return (
    <InternalSelect
      value={getLabeledValues(options).filter((it) => itemActive(it))}
      multiple={multiple}
      onTagClear={onItemClicker}
      popupContent={
        <ul
          className={classNames(`${cssPrefix}menu vertical`)}
          style={{ border: 'none', boxShadow: 'none' }}>
          {options.map((it, i) => itemRender(it, `select-option-${i}`))}
        </ul>
      }
      {...restProps}
    />
  );
}
