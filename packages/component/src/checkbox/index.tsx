import { CSSProperties, ReactNode, useState } from 'react';
import { classNames, cssPrefix } from '../helper';

export type CheckboxValueType = string | number;
export type CheckboxProps = {
  className?: string | string[];
  style?: CSSProperties;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  children: ReactNode;
  value?: CheckboxValueType;
  onChange?: (
    checked: boolean,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => void;
};
export default function Checkbox({
  className,
  style,
  disabled = false,
  checked = false,
  indeterminate = false,
  value,
  children,
  onChange,
}: CheckboxProps) {
  const onClick = (evt: React.MouseEvent | React.KeyboardEvent) => {
    if (onChange) onChange(!checked, evt);
  };
  return (
    <div
      tabIndex={1}
      onKeyDown={(evt) => evt.key === 'Enter' && onClick(evt)}
      onClick={onClick}
      className={classNames(
        `${cssPrefix}checkbox`,
        { disabled, checked, indeterminate },
        className
      )}
      style={style}>
      <input value={value} type="checkbox" tabIndex={0} />
      <label>{children}</label>
    </div>
  );
}

export type CheckboxOptionType = {
  className?: string | string[];
  style?: CSSProperties;
  label: ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
  indeterminate?: boolean;
};

export type CheckboxGroupProps = {
  className?: string | string[];
  style?: CSSProperties;
  vertical?: boolean;
  disabled?: boolean;
  options: CheckboxOptionType[];
  value?: CheckboxValueType[];
  onChange?: (
    value: CheckboxValueType[],
    evt: React.MouseEvent | React.KeyboardEvent
  ) => void;
};
function CheckboxGroup({
  className,
  style,
  vertical,
  disabled,
  options,
  value = [],
  onChange,
}: CheckboxGroupProps) {
  const [checkedValues, setCheckedValues] =
    useState<CheckboxValueType[]>(value);

  const onChanger = (
    checked: boolean,
    v: CheckboxValueType,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => {
    const values = checked
      ? [v, ...checkedValues]
      : checkedValues.filter((it) => it !== v);
    setCheckedValues(values);
    if (onChange) onChange(values, evt);
  };
  return (
    <div
      className={classNames(
        `${cssPrefix}checkbox-group`,
        vertical ? 'vertical' : 'horizontal',
        { disabled },
        className
      )}
      style={style}>
      {options.map(({ label, ...it }) => (
        <Checkbox
          key={it.value}
          onChange={(checked, evt) => onChanger(checked, it.value, evt)}
          checked={checkedValues.includes(it.value)}
          {...it}>
          {label}
        </Checkbox>
      ))}
    </div>
  );
}

Checkbox.Group = CheckboxGroup;
