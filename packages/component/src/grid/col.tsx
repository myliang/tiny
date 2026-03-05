import { CSSProperties, ReactNode } from 'react';
import { classNames, cssPrefix } from '../helper';

export interface ColProps {
  className?: string | string[];
  style?: CSSProperties;
  flex?: string | number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  span?: number;
  children: ReactNode;
}

export default function Col({
  className,
  style,
  flex,
  offset = 0,
  order = 0,
  pull = 0,
  push = 0,
  span,
  children,
}: ColProps) {
  const nStyle: CSSProperties = {};
  const proportion = (v: number) => (v / 24).toFixed(2);
  if (flex) {
    nStyle['flex'] =
      typeof flex === 'string'
        ? flex === 'auto'
          ? `1 1 auto`
          : `0 0 ${flex === 'none' ? 'auto' : flex}`
        : `${flex} ${flex} auto`;
  } else if (span) {
    nStyle['flex'] = `0 0 ${proportion(span)}%`;
    nStyle['width'] = `${proportion(span)}%`;
  }
  if (offset > 0) {
    nStyle['marginLeft'] = `${proportion(offset)}%`;
  }
  if (pull > 0) {
    nStyle['insetInlineEnd'] = `${proportion(pull)}%`;
  }
  if (push > 0) {
    nStyle['insetInlineStart'] = `${proportion(push)}%`;
  }
  nStyle['order'] = order;
  return (
    <div
      className={classNames(`${cssPrefix}col`, className)}
      style={Object.assign(nStyle, style)}>
      {children}
    </div>
  );
}
