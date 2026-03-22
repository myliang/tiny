import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import { classNames, cssPrefix } from '../helper';

export type ButtonProps = {
  className?: string | string[];
  style?: CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outlined' | 'dashed' | 'text';
  color?: 'default' | 'primary' | 'success' | 'error';
  shape?: 'circle' | 'rect';
  size?: 'small' | 'middle' | 'large';
  children: ReactNode;
  onClick?: (
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  onMouseEnter?: (evt: React.MouseEvent) => void;
  onMouseLevel?: (evt: React.MouseEvent) => void;
  onContextMenu?: (evt: React.MouseEvent) => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      style,
      disabled = false,
      loading = false,
      htmlType = 'button',
      variant = 'filled',
      color = 'default',
      shape = 'rect',
      size = 'middle',
      onClick,
      children,
      className,
      ...restProps
    },
    ref
  ) => {
    const onKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
      if (onClick && evt.key === 'Enter') onClick(evt);
    };
    return (
      <button
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={1}
        onClick={onClick}
        type={htmlType}
        style={style}
        className={classNames(
          `${cssPrefix}button`,
          variant,
          color,
          shape,
          size,
          {
            disabled,
            loading,
          },
          className
        )}
        {...restProps}>
        {children}
      </button>
    );
  }
);

export default Button;
