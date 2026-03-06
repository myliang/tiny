import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
export interface SpinProps {
  className?: string | string[];
  style?: CSSProperties;
  children?: ReactNode;
  loading?: boolean;
  delay?: number;
  size?: 'default' | 'large';
}
export default function Spin({
  className,
  style,
  children,
  delay = 500,
  loading = false,
  size = 'default',
}: SpinProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(loading), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div
      className={classNames(
        `${cssPrefix}spin`,
        size,
        { loading: show },
        className
      )}
      style={style}>
      <div className={classNames(`${cssPrefix}spin-container`)}>{children}</div>
    </div>
  );
}
