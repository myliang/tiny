import { useState } from 'react';
import Input, { InputProps } from './input';
import Icon from '../icon';

// prefix: <Icon size="0.85em" type="lock" />}
export type PasswordProps = Omit<InputProps, 'htmlType' | 'suffix'>;
export default function Password({ prefix, ...props }: PasswordProps) {
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
