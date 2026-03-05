import { CSSProperties } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface DividerProps {
  className?: string | string[];
  style?: CSSProperties;
  vertical?: boolean;
}
export default function Divider({ className, style, vertical }: DividerProps) {
  return (
    <div
      className={classNames(
        `${cssPrefix}divider`,
        vertical ? 'vertical' : 'horizontal',
        className
      )}
      style={style}
    />
  );
}
