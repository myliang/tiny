import { CSSProperties, Fragment, ReactNode, useState } from 'react';
import { classNames, cssPrefix } from '../helper';

type MenuItemType = {
  type?: 'item';
  key: string;
  children: ReactNode;
  disabled?: boolean;
};
type MenuGroupType = {
  type: 'group';
  key: string;
  children: ItemType[];
  label: string | ReactNode;
};
type SubMenuType = {
  type: 'submenu';
  key: string;
  children: ItemType[];
  label: string | ReactNode;
};
type MenuDividerType = {
  type: 'divider';
  key?: string;
};
export type ItemType =
  | MenuItemType
  | MenuGroupType
  | SubMenuType
  | MenuDividerType;

export type MenuProps = {
  items: ItemType[];
  className?: string | string[];
  style?: CSSProperties;
  theme?: 'dark' | 'light';
  type?: 'vertical' | 'horizontal' | 'inline';
  selectable?: boolean;
  openKeys?: string[];
  selectedKey?: string;
  onSelect?: (key: string, evt: React.MouseEvent | React.KeyboardEvent) => void;
};

export default function Menu({
  className,
  style,
  items,
  type = 'vertical',
  openKeys = [],
  selectedKey,
  onSelect,
  theme,
}: MenuProps) {
  const [selected, setSelected] = useState(selectedKey);
  const onClicker = (
    key: string,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => {
    setSelected(key);
    onSelect?.(key, evt);
  };

  const [shows, setShows] = useState<string[]>(openKeys);
  const onSubmenuClicker = (key: string) => {
    if (shows.includes(key)) {
      setShows(shows.filter((it) => it !== key));
    } else {
      setShows([key, ...shows]);
    }
  };

  const itemRender = (it: ItemType, index: number) => {
    switch (it.type) {
      case 'divider':
        return <li className={classNames(`${cssPrefix}menu-item divider`)} />;
      case 'group':
        return (
          <Fragment key={it.key}>
            <li className={classNames(`${cssPrefix}menu-item group`)}>
              {it.label}
            </li>
            {it.children.map((it, i) => itemRender(it, i))}
          </Fragment>
        );
      case 'submenu':
        return (
          <Fragment key={it.key}>
            <li
              tabIndex={1}
              className={classNames(`${cssPrefix}menu-item submenu`)}
              onKeyDown={(evt) =>
                evt.key === 'Enter' && onSubmenuClicker(it.key)
              }
              onClick={() => onSubmenuClicker(it.key)}>
              {it.label}
            </li>
            <ul
              className={classNames(`${cssPrefix}menu submenu`)}
              style={{ display: shows.includes(it.key) ? 'block' : 'none' }}>
              {it.children.map((it, i) => itemRender(it, i))}
            </ul>
          </Fragment>
        );
      default:
        return (
          <li
            tabIndex={it.disabled ? 0 : 1}
            key={it.key}
            onClick={(evt) => onClicker(it.key, evt)}
            onKeyDown={(evt) => evt.key === 'Enter' && onClicker(it.key, evt)}
            className={classNames(`${cssPrefix}menu-item`, {
              disabled: it.disabled,
              active: it.key === selected,
            })}>
            {it.children}
          </li>
        );
    }
  };

  return (
    <ul
      className={classNames(`${cssPrefix}menu`, type, theme, className)}
      style={style}>
      {items.map((it, i) => itemRender(it, i))}
    </ul>
  );
}
