import { CSSProperties, ReactNode } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface RowProps {
  className?: string | string[];
  style?: CSSProperties;
  gutter: number | Array<number>;
  align: 'start' | 'end' | 'center' | 'stretch';
  justify: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  children: ReactNode;
}

export default function Row({
  className,
  style,
  gutter = 0,
  align = 'center',
  justify = 'center',
  children,
}: RowProps) {
  return (
    <div
      className={classNames(`${cssPrefix}row`, className)}
      style={Object.assign(
        {
          rowGap: `${gutter}px`,
          columnGap: `${gutter}px`,
          alignItems: align,
          justifyContent: justify,
        },
        style
      )}>
      {children}
    </div>
  );
}
