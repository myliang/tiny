import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { classNames, cssPrefix } from '../helper';

export type RadioValueType = string | number;
export type RadioProps = {
  className?: string | string[];
  style?: CSSProperties;
  disabled?: boolean;
  checked?: boolean;
  children: ReactNode;
  value?: RadioValueType;
  onChange?: (
    value: RadioValueType,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => void;
};
export default function Radio({
  className,
  style,
  disabled = false,
  checked = false,
  value,
  children,
  onChange,
}: RadioProps) {
  const onClick = (evt: React.MouseEvent | React.KeyboardEvent) => {
    if (onChange) onChange(value || '', evt);
  };
  return (
    <div
      tabIndex={1}
      onKeyDown={(evt) => evt.key === 'Enter' && onClick(evt)}
      onClick={onClick}
      className={classNames(
        `${cssPrefix}radio`,
        { disabled, checked },
        className
      )}
      style={style}>
      <input value={value} type="radio" tabIndex={0} />
      <div className={classNames(`${cssPrefix}radio-status`)} />
      {children && <label>{children}</label>}
    </div>
  );
}

export type RadioOptionType = {
  className?: string | string[];
  style?: CSSProperties;
  label: ReactNode;
  value: RadioValueType;
  vertical?: boolean;
  disabled?: boolean;
};

export type RadioGroupProps = {
  className?: string | string[];
  style?: CSSProperties;
  optionStyle?: CSSProperties;
  type?: 'default' | 'button';
  vertical?: boolean;
  disabled?: boolean;
  options: RadioOptionType[];
  value?: RadioValueType;
  onChange?: (
    value: RadioValueType,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => void;
};
function RadioGroup({
  className,
  style,
  optionStyle,
  type,
  vertical,
  disabled,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  const [checkedValue, setCheckedValue] = useState(value);

  useEffect(() => {
    setCheckedValue(value);
  }, [value]);

  const onChanger = (
    value: RadioValueType,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => {
    setCheckedValue(value);
    if (onChange) onChange(value, evt);
  };
  return (
    <div
      className={classNames(
        `${cssPrefix}radio-group`,
        type,
        vertical ? 'vertical' : 'horizontal',
        { disabled },
        className
      )}
      style={style}>
      {options.map(({ label, ...it }) => (
        <Radio
          key={it.value}
          style={optionStyle}
          onChange={(value, evt) => onChanger(value, evt)}
          checked={checkedValue === it.value}
          {...it}>
          {label}
        </Radio>
      ))}
    </div>
  );
}

Radio.Group = RadioGroup;
