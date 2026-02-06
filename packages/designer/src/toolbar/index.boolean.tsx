import { useState } from 'react';
import { classNames } from '../helper';
import { Icon } from '../icon';

export type ItemBooleanType =
  | 'textwrap'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'clearFormat'
  | 'merge'
  | 'freeze';

export interface ItemBooleanProps {
  type: ItemBooleanType;
  value: boolean | undefined;
  onChange: (key: string, value: boolean) => void;
}

export function ItemBoolean({ type, value, onChange }: ItemBooleanProps) {
  const [active, setActive] = useState(value || false);
  const clicker = (evt: React.MouseEvent) => {
    setActive(!active);
    onChange?.(type, !active);
  };
  return (
    <li onClick={clicker} className={classNames({ active })}>
      <Icon type={type} />
    </li>
  );
}
