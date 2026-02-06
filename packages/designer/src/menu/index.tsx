import { createContext, useContext, useState } from 'react';
import { classNames } from '../helper';
export interface MenuItemProps {
  key: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (evt: React.MouseEvent, key: string) => void;
}

interface MenuContextType {
  selectedKey?: string;
  onClick?: (key: string, evt: React.MouseEvent) => void;
  onSelect?: (key: string, evt: React.MouseEvent) => void;
}

export interface MenProps extends MenuContextType {
  mode?: 'vertical' | 'inline';
  children: React.ReactNode;
}

const MenuContext = createContext<MenuContextType>({});

export function MenuItem({
  key,
  children,
  disabled = false,
  onClick,
}: MenuItemProps) {
  const { selectedKey, onSelect } = useContext(MenuContext);
  const clicker = (e: React.MouseEvent) => {
    onClick?.(e, key);
    onSelect?.(key, e);
  };
  const active = selectedKey === key;
  return (
    <div
      onClick={clicker}
      className={classNames('menu-item', { disabled, active })}>
      {children}
    </div>
  );
}

export function Menu({
  mode = 'vertical',
  children,
  selectedKey,
  onClick,
  onSelect,
}: MenProps) {
  const [selected, setSelected] = useState(selectedKey);
  const selecter = (key: string, evt: React.MouseEvent) => {
    setSelected(key);
    onClick?.(key, evt);
    onSelect?.(key, evt);
  };

  return (
    <MenuContext.Provider value={{ selectedKey: selected, onSelect: selecter }}>
      <div className={classNames('menu', { mode })}>{children}</div>
    </MenuContext.Provider>
  );
}
