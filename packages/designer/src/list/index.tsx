import { useState } from 'react';
import { classNames } from '../helper';

export interface ListItemProps {
  index: string;
  label: React.ReactNode;
  [key: string]: any;
}
export interface ListProps {
  height?: string;
  type?: 'vertical' | 'inline';
  items: ListItemProps[];
  showState?: boolean;
  value?: string;
  onSelect: (item: ListItemProps) => void;
}

export function List({
  showState = false,
  type = 'vertical',
  height = '26px',
  value = 'thin',
  items,
  onSelect,
}: ListProps) {
  const [checked, setChecked] = useState(value);
  const clicker = (item: ListItemProps) => {
    if (showState) setChecked(item.index);
    setChecked(item.index);
    onSelect(item);
  };
  return (
    <ul className={classNames('list', `list-${type}`)}>
      {items.map((it) => (
        <li
          style={{ height, lineHeight: height }}
          className={classNames({
            state: showState,
            checked: showState && it.index === checked,
          })}
          key={it.index}
          onClick={() => clicker(it)}>
          {it.label}
        </li>
      ))}
    </ul>
  );
}
