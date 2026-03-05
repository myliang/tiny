import { Children, CSSProperties, ReactNode, Fragment } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface SpaceProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  wrap?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline';
  direction?: 'vertical' | 'horizontal';
  split?: ReactNode;
  size?: 'small' | 'middle' | 'large';
}

export default function Space({
  className,
  style,
  children,
  wrap = true,
  align = 'center',
  direction = 'horizontal',
  split,
  size = 'middle',
}: SpaceProps) {
  return (
    <div
      className={classNames(`${cssPrefix}space`, size, className)}
      style={Object.assign(
        {
          flexWrap: wrap ? 'wrap' : 'nowrap',
          alignItems: align,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        },
        style
      )}>
      {split
        ? Children.map(children, (_, i) => (
            <Fragment>
              {i > 0 ? split : ''}
              {_}
            </Fragment>
          ))
        : children}
    </div>
  );
}
