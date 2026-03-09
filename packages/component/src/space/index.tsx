import { Children, CSSProperties, ReactNode, Fragment } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface SpaceProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  wrap?: boolean;
  compact?: boolean;
  vertical?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: ReactNode;
  size?: 'small' | 'middle' | 'large';
}

export default function Space({
  className,
  style,
  children,
  wrap = true,
  compact = false,
  align = 'center',
  vertical = false,
  split,
  size = 'middle',
}: SpaceProps) {
  return (
    <div
      className={classNames(
        `${cssPrefix}space`,
        size,
        vertical ? 'vertical' : 'horizontal',
        className,
        {
          compact,
        }
      )}
      style={Object.assign(
        {
          flexWrap: wrap ? 'wrap' : 'nowrap',
          alignItems: align,
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
