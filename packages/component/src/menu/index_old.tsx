import {
  createContext,
  CSSProperties,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { classNames, cssPrefix } from '../helper';
import { processChildren } from './helper';

interface MenuContextType {
  openKeys?: string[];
  selectedKey?: string;
  onSelect?: (key: string, evt: React.MouseEvent) => void;
}
const MenuContext = createContext<MenuContextType>({});

export interface MenuProps extends MenuContextType {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  theme?: 'dark' | 'light';
  mode?: 'vertical' | 'horizontal' | 'inline';
  selectable?: boolean;
}

export default function Menu({
  className,
  style,
  children,
  mode = 'vertical',
  openKeys = [],
  selectedKey,
  onSelect,
  theme,
}: MenuProps) {
  const [selected, setSelected] = useState(selectedKey);
  const selecter = (key: string, evt: React.MouseEvent) => {
    setSelected(key);
    onSelect?.(key, evt);
  };
  return (
    <MenuContext.Provider
      value={{ selectedKey: selected, openKeys, onSelect: selecter }}>
      <ul
        className={classNames(`${cssPrefix}menu`, mode, theme, className)}
        style={style}>
        {processChildren(children)}
      </ul>
    </MenuContext.Provider>
  );
}

export interface SubmenuProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  _key?: string;
  label: string | ReactNode;
}
export function SubMenu({
  className,
  style,
  children,
  _key,
  label,
}: SubmenuProps) {
  const { openKeys, onSelect } = useContext(MenuContext);
  const [show, setShow] = useState(openKeys?.includes(_key || ''));
  const clicker = (evt: React.MouseEvent) => {
    setShow(!show);
    if (onSelect) onSelect(_key || '', evt);
  };
  return (
    <>
      <li
        key={_key}
        className={classNames(`${cssPrefix}menu-item submenu`, className)}
        style={style}
        onClick={clicker}>
        {label}
      </li>
      <ul
        className={classNames(`${cssPrefix}menu submenu`)}
        style={{ display: show ? 'block' : 'none' }}>
        {processChildren(children)}
      </ul>
    </>
  );
}
Menu.SubMenu = SubMenu;

export interface MenuItemProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
  _key?: string;
}
function MenuItem({
  className,
  style,
  children,
  disabled,
  _key,
}: MenuItemProps) {
  const { selectedKey, onSelect } = useContext(MenuContext);
  console.log('selectedKey:', selectedKey, _key);
  const clicker = (evt: React.MouseEvent) => {
    if (onSelect) onSelect(_key || '', evt);
  };
  return (
    <li
      key={_key}
      className={classNames(`${cssPrefix}menu-item`, className, {
        disabled,
        active: selectedKey === _key,
      })}
      style={style}
      onClick={clicker}>
      {children}
    </li>
  );
}
Menu.Item = MenuItem;

export interface MenuItemGroupProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactElement<typeof Menu.Item>[];
  key: string;
  title: string | ReactNode;
}
function MenuItemGroup({
  className,
  style,
  children,
  key,
  title,
}: MenuItemGroupProps) {
  return (
    <li
      key={key}
      className={classNames(`${cssPrefix}menu-item group`, className)}
      style={style}>
      {title}
      <Menu mode="inline">{processChildren(children)}</Menu>
    </li>
  );
}
Menu.ItemGroup = MenuItemGroup;
