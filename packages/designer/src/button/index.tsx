import React, { PropsWithChildren } from 'react';
import { classNames } from '../helper';

export interface ButtonProps {
  disabled?: boolean;
  loadding?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: 'primary' | 'outline' | 'dashed' | 'text';
  shape?: 'circle' | 'rect';
  size?: 'small' | 'middle' | 'large';
  onClick?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function Button({
  disabled = false,
  loadding = false,
  htmlType = 'button',
  type = 'outline',
  shape = 'rect',
  size = 'middle',
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      className={classNames('button', {
        disabled: disabled,
        loading: loadding,
        shape,
        type,
        size,
      })}
    >
      {children}
    </button>
  );
}
