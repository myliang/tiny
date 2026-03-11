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
}: InputProps) {
  const [active, setActive] = useState(false);
  const [_value, setValue] = useState(value);
  const onInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(evt.target.value);
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
      {(suffix || clearable) && (
        <div className={classNames(`${cssPrefix}input-suffix`)}>
          {clearable && (
            <span
              onClick={() => setValue('')}
              className={classNames(`${cssPrefix}input-clear`)}
              style={{ visibility: _value ? 'visible' : 'hidden' }}>
              <Icon type="close" />
            </span>
          )}
          {suffix}
        </div>
      )}
    </div>
  );
}

// prefix: <Icon size="0.85em" type="lock" />}
export type PasswordProps = Omit<InputProps, 'htmlType' | 'suffix'>;
function Password({ prefix, ...props }: PasswordProps) {
  const [show, setShow] = useState(false);
  const onEyeClick = () => {
    setShow(!show);
  };
  return (
    <Input
      htmlType={show ? 'input' : 'password'}
      suffix={
        <Icon
          type={show ? 'eye' : 'eyeInvisible'}
          style={{ opacity: show ? 1 : 0.5 }}
          onClick={onEyeClick}
        />
      }
      {...props}
    />
  );
}
Input.Password = Password;

export type TextareaProps = Omit<
  InputProps,
  'htmlType' | 'prefix' | 'suffix' | 'clearable'
>;
function Textarea({
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
Input.Textarea = Textarea;
