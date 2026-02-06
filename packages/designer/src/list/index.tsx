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
  style?: React.CSSProperties;
  items: ListItemProps[];
  value?: string;
  onSelect: (item: ListItemProps) => void;
}

export function List({
  type = 'vertical',
  style = {},
  height = '26px',
  value = 'thin',
  items,
  onSelect,
}: ListProps) {
  const [checked, setChecked] = useState(value);
  const clicker = (item: ListItemProps) => {
    setChecked(item.index);
    onSelect(item);
  };
  return (
    <ul className={classNames('list', `list-${type}`)} style={style}>
      {items.map((it) => (
        <li
          style={{ height, lineHeight: height }}
          className={classNames({ active: checked === it.index })}
          key={it.index}
          onClick={() => clicker(it)}>
          {it.label}
        </li>
      ))}
    </ul>
  );
}
