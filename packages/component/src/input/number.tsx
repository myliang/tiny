import { useState } from 'react';
import { numberFormatter, numberParser, numberAdd } from './helper';
import { classNames, cssPrefix } from '../helper';
import { InputProps } from './input';
import Icon from '../icon';

export type InputNumberProps = Omit<
  InputProps,
  'htmlType' | 'onChange' | 'clearable' | 'value'
> & {
  value?: string | string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatter?: false | ((value: string | number) => string);
  parser?: (text: string) => number;
  onChange?: (value: string | number) => void;
};

export default function InputNumber({
  className,
  style,
  variant = 'outlined',
  placeholder,
  prefix,
  suffix,
  disabled,
  value,
  status,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  precision = 2,
  formatter = numberFormatter,
  parser = numberParser,
  onChange,
}: InputNumberProps) {
  const [active, setActive] = useState(false);
  const [_value, setValue] = useState(value || '');

  const operateValue = (v: number, s: number) => {
    let nValue = numberAdd(v, s, precision);
    if (nValue < min) nValue = min;
    if (nValue > max) nValue = max;
    return nValue;
  };

  const onChanger = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const txt = evt.target.value;
    if (!/^\s*$/.test(txt)) {
      const nValue = operateValue(parser(txt), 0);
      setValue(`${nValue}`);
      if (onChange) onChange(nValue);
    }
  };
  const onAction = (action: 'up' | 'down') => {
    const nValue = operateValue(
      parseFloat(`${_value}`),
      action === 'up' ? -step : step
    );
    setValue(`${nValue}`);
    if (onChange) onChange(nValue);
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
        type="input"
        value={_value}
        placeholder={placeholder}
        onChange={onChanger}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
      {suffix && (
        <div className={classNames(`${cssPrefix}input-suffix`)}>{suffix}</div>
      )}
      <div className={classNames(`${cssPrefix}input-actions`)}>
        <div
          className={`${cssPrefix}input-action`}
          onClick={() => onAction('up')}>
          <Icon type="angleUp" />
        </div>
        <div
          className={`${cssPrefix}input-action`}
          onClick={() => onAction('down')}>
          <Icon type="angleDown" />
        </div>
      </div>
    </div>
  );
}
