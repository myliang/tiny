import { useRef, useState } from 'react';
import { Overlay, OverlayMethods } from '../overlay';
import { Icon } from '../icon';
import { List, ListItemProps } from '../list';
import { classNames } from '../helper';

interface FontProps {
  value: string;
  width: number;
  items: ListItemProps[];
  contentWidth: number;
  onSelect: (index: string) => void;
}

export function Font({
  value,
  width,
  contentWidth,
  items,
  onSelect,
}: FontProps) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(value);
  const overlayRef = useRef<OverlayMethods>(null);
  const clicker = (evt: React.MouseEvent) => {
    overlayRef?.current?.setShow(true);
  };

  const onSelector = (item: ListItemProps) => {
    setSelected(item.index);
    onSelect(item.index);
  };
  return (
    <Overlay
      placement="bottomLeft"
      ref={overlayRef}
      onChange={(show) => setActive(show)}
      content={
        <List
          value={selected}
          items={items}
          onSelect={onSelector}
          style={{
            maxHeight: '300px',
            overflow: 'auto',
            width: `${contentWidth + 'px'}`,
          }}
        />
      }>
      <li
        className={classNames({ active })}
        onClick={clicker}
        style={{ width: `${width}px` }}>
        <span
          style={{
            width: `${width - 16}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          {selected}
        </span>
        <Icon type="arrowDown" style={{ marginLeft: 'auto' }} />
      </li>
    </Overlay>
  );
}

export interface FontFamilyProps {
  value: string;
  items: string[];
  onSelect: (index: string) => void;
}

export function FontFamily({ value, items, onSelect }: FontFamilyProps) {
  return (
    <Font
      width={100}
      contentWidth={150}
      items={items.map((it) => ({ index: it, label: it }))}
      value={value}
      onSelect={onSelect}
    />
  );
}

export interface FontSizeProps {
  value: string;
  items: string[];
  onSelect: (index: string) => void;
}
export function FontSize({ value, items, onSelect }: FontSizeProps) {
  return (
    <Font
      width={40}
      contentWidth={80}
      items={items.map((it) => ({ index: it, label: it }))}
      value={value}
      onSelect={onSelect}
    />
  );
}
