import { CSSProperties, ReactNode, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';

export type InputProps = {
  className?: string | string[];
  style?: CSSProperties;
  htmlType?: 'input' | 'password';
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  value?: string;
  status?: 'error' | 'warning';
  onChange?: (value: string) => void;
};
export default function Input({
  className,
  style,
  htmlType = 'input',
  variant = 'outlined',
  placeholder = '',
  prefix,
  suffix,
  disabled = false,
  clearable = false,
  value,
  status,
  onChange,
}: InputProps) {
  const [active, setActive] = useState(false);
  const [_value, setValue] = useState(value || '');
  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    if (onChange) onChange(evt.target.value);
  };
  return (
    <div
      className={classNames(`${cssPrefix}input`, variant, className, status, {
        active,
        disabled,
      })}
      style={style}>
      {prefix && (
        <div className={classNames(`${cssPrefix}input-prefix`)}>{prefix}</div>
      )}
      <input
        type={htmlType}
        value={_value}
        placeholder={placeholder}
        onChange={onInputChange}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
      {suffix && (
        <div className={classNames(`${cssPrefix}input-suffix`)}>{suffix}</div>
      )}
      {clearable && (
        <span
          onClick={() => setValue('')}
          className={classNames(`${cssPrefix}input-clear`)}
          style={{ display: _value ? 'block' : 'none' }}>
          <Icon type="close" />
        </span>
      )}
    </div>
  );
}
