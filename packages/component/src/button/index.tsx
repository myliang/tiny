import React, { PropsWithChildren } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outlined' | 'dashed' | 'text';
  color?: 'default' | 'primary' | 'success' | 'error';
  shape?: 'circle' | 'rect';
  size?: 'small' | 'middle' | 'large';
  onClick?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function Button({
  disabled = false,
  loading = false,
  htmlType = 'button',
  variant = 'filled',
  color = 'default',
  shape = 'rect',
  size = 'middle',
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      className={classNames(`${cssPrefix}button`, variant, color, shape, size, {
        disabled,
        loading,
      })}>
      {children}
    </button>
  );
}
