import { Children, CSSProperties, ReactNode, Fragment } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface SpaceProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  wrap?: boolean;
  vertical?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline';
  separator?: ReactNode;
  size?: 'small' | 'middle' | 'large';
}

export default function Space({
  className,
  style,
  children,
  wrap = true,
  align = 'start',
  vertical = false,
  separator,
  size = 'middle',
}: SpaceProps) {
  return (
    <div
      className={classNames(
        `${cssPrefix}space`,
        size,
        vertical ? 'vertical' : 'horizontal',
        className
      )}
      style={Object.assign(
        {
          flexWrap: wrap ? 'wrap' : 'nowrap',
          alignItems: align,
        },
        style
      )}>
      {Children.map(children, (_, i) => (
        <div className={classNames(`${cssPrefix}space-item`)}>
          {i > 0 ? separator : ''}
          {_}
        </div>
      ))}
    </div>
  );
}

export type SpaceCompactProps = {
  children: ReactNode;
  vertical?: boolean;
  size?: 'small' | 'middle' | 'large';
};
function SpaceCompact({
  vertical = false,
  size = 'middle',
  children,
}: SpaceCompactProps) {
  return (
    <div
      className={classNames(
        `${cssPrefix}space compact`,
        vertical ? 'vertical' : 'horizontal',
        size
      )}>
      {children}
    </div>
  );
}
Space.Compact = SpaceCompact;
