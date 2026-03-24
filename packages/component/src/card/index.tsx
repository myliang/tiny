import { CSSProperties, ReactNode } from 'react';
import { classNames, cssPrefix } from '../helper';

export type CardProps = {
  className?: string | string[];
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  extra?: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

export default function Card({
  className,
  style,
  bodyStyle,
  extra,
  title,
  children,
}: CardProps) {
  return (
    <div className={classNames(`${cssPrefix}card`, className)} style={style}>
      <div className={classNames(`${cssPrefix}card-header`)}>
        <div className={classNames(`${cssPrefix}card-header-title`)}>
          {title}
        </div>
        <div className={classNames(`${cssPrefix}card-header-extra`)}>
          {extra}
        </div>
      </div>
      <div className={classNames(`${cssPrefix}card-body`)} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}
