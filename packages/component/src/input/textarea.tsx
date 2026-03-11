import { useState } from 'react';
import { InputProps } from './input';
import { classNames, cssPrefix } from '../helper';

export type TextareaProps = Omit<
  InputProps,
  'htmlType' | 'prefix' | 'suffix' | 'clearable'
>;
export default function Textarea({
  style,
  value,
  placeholder,
  variant = 'outlined',
  className,
  disabled,
  status,
}: TextareaProps) {
  const [active, setActive] = useState(false);
  const [_value, setValue] = useState(value);
  const onInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(evt.target.value);
  };
  return (
    <textarea
      className={classNames(
        `${cssPrefix}input textarea`,
        variant,
        className,
        status,
        {
          active,
          disabled,
        }
      )}
      style={style}
      value={_value}
      placeholder={placeholder}
      onChange={onInputChange}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
    />
  );
}
