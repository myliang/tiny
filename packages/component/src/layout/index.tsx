import {
  CSSProperties,
  ReactNode,
  useEffect,
  Children,
  isValidElement,
  useState,
} from 'react';
import { classNames, cssPrefix } from '../helper';

export interface ComponentProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
}
export default function Layout({ className, style, children }: ComponentProps) {
  const [hasSider, setSider] = useState(false);
  useEffect(() => {
    const filtered = Children.toArray(children).filter(
      (it) => isValidElement(it) && it.type === Sider
    );
    setSider(filtered.length > 0);
  });
  return (
    <div
      className={classNames(
        `${cssPrefix}layout`,
        hasSider ? `has-sider` : '',
        className
      )}
      style={style}>
      {children}
    </div>
  );
}

function Header({ className, style, children }: ComponentProps) {
  return (
    <header
      className={classNames(`${cssPrefix}layout-header`, className)}
      style={style}>
      {children}
    </header>
  );
}
function Content({ className, style, children }: ComponentProps) {
  return (
    <div
      className={classNames(`${cssPrefix}layout-content`, className)}
      style={style}>
      {children}
    </div>
  );
}
function Footer({ className, style, children }: ComponentProps) {
  return (
    <footer
      className={classNames(`${cssPrefix}layout-footer`, className)}
      style={style}>
      {children}
    </footer>
  );
}

export interface SiderProps extends ComponentProps {
  theme?: 'dark' | 'light';
  width?: number | string;
}
function Sider({
  className,
  style,
  children,
  theme = 'light',
  width = '200px',
}: SiderProps) {
  return (
    <aside
      className={classNames(`${cssPrefix}layout-sider`, theme, className)}
      style={Object.assign({ width }, style)}>
      {children}
    </aside>
  );
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;
