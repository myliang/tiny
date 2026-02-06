import { act, useRef, useState } from 'react';
import { classNames } from '../helper';
import { ColorPicker } from './index.color';
import { Overlay, OverlayMethods } from '../overlay';
import { Icon, IconType } from '../icon';
import { List, ListItemProps } from '../list';
import { BorderType } from '@tiny/table-renderer';

const borderLineStyles = [
  {
    index: 'thin',
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1">
        <line
          x1="0"
          y1="0.5"
          x2="50"
          y2="0.5"
          strokeWidth="1"
          stroke="black"></line>
      </svg>
    ),
  },
  {
    index: 'medium',
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="2">
        <line
          x1="0"
          y1="1.0"
          x2="50"
          y2="1.0"
          strokeWidth="2"
          stroke="black"></line>
      </svg>
    ),
  },
  {
    index: 'thick',
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="3">
        <line
          x1="0"
          y1="1.5"
          x2="50"
          y2="1.5"
          strokeWidth="3"
          stroke="black"></line>
      </svg>
    ),
  },
  {
    index: 'dashed',
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1">
        <line
          x1="0"
          y1="0.5"
          x2="50"
          y2="0.5"
          strokeWidth="1"
          stroke="black"
          strokeDasharray="2"></line>
      </svg>
    ),
  },
  {
    index: 'dotted',
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="1">
        <line
          x1="0"
          y1="0.5"
          x2="50"
          y2="0.5"
          strokeWidth="1"
          stroke="black"
          strokeDasharray="1"></line>
      </svg>
    ),
  },
];

interface BorderLineStyleProps {
  value: string;
  onSelect: (index: string) => void;
}

function BorderLineStyle({ value, onSelect }: BorderLineStyleProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const clicker = (evt: React.MouseEvent) => {
    overlayRef?.current?.setShow(true);
  };

  const onSelector = (item: ListItemProps) => {
    onSelect(item.index);
  };
  return (
    <Overlay
      ref={overlayRef}
      content={
        <List value={value} items={borderLineStyles} onSelect={onSelector} />
      }>
      <li onClick={clicker}>
        <Icon type="borderLineStyle" />
      </li>
    </Overlay>
  );
}

interface BorderTypeItemProps {
  type: BorderType | 'none';
  iconType: IconType;
  onSelect: (type: string) => void;
}
function BorderTypeItem({ type, iconType, onSelect }: BorderTypeItemProps) {
  return (
    <li onClick={() => onSelect(type)}>
      <Icon type={iconType} />
    </li>
  );
}

const borderIconTypes: Array<{
  type: BorderType | 'none';
  iconType: IconType;
}> = [
  { type: 'all', iconType: 'borderTypeAll' },
  { type: 'inside', iconType: 'borderTypeInside' },
  { type: 'horizontal', iconType: 'borderTypeHorizontal' },
  { type: 'vertical', iconType: 'borderTypeVertical' },
  { type: 'outside', iconType: 'borderTypeOutside' },
  { type: 'top', iconType: 'borderTypeTop' },
  { type: 'right', iconType: 'borderTypeRight' },
  { type: 'bottom', iconType: 'borderTypeBottom' },
  { type: 'left', iconType: 'borderTypeLeft' },
  { type: 'none', iconType: 'borderTypeNone' },
];

export function Border() {
  const [lineType, setLineType] = useState('thin');
  const [color, setColor] = useState<string>('');
  const borderTypeSelector = (type: string) => {};

  return (
    <div className={classNames('border')}>
      <ul className={classNames('border-left')}>
        {borderIconTypes.map((it) => (
          <BorderTypeItem
            key={it.type}
            type={it.type}
            iconType={it.iconType}
            onSelect={borderTypeSelector}
          />
        ))}
      </ul>
      <ul className={classNames('border-right')}>
        <ColorPicker
          type="borderColor"
          value={color}
          onChange={(type, color) => setColor(color)}
        />
        <BorderLineStyle
          value={lineType}
          onSelect={(index) => setLineType(index)}
        />
      </ul>
    </div>
  );
}

export function BorderPicker() {
  const [active, setActive] = useState(false);
  const overlayRef = useRef<OverlayMethods>(null);
  const clicker = (evt: React.MouseEvent) => {
    overlayRef?.current?.setShow(true);
  };
  return (
    <Overlay
      ref={overlayRef}
      onChange={(show) => setActive(show)}
      content={<Border />}>
      <li className={classNames({ active })} onClick={clicker}>
        <Icon type="borderTypeAll" />
      </li>
    </Overlay>
  );
}
