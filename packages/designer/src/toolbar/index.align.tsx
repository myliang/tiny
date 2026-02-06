import { useRef, useState } from 'react';
import { List, ListItemProps } from '../list';
import { Overlay, OverlayMethods } from '../overlay';
import { Icon, IconType } from '../icon';
import { Align, VerticalAlign } from '@tiny/table-renderer';

export interface TextAlignProps {
  value: Align | VerticalAlign;
  vertical?: boolean;
  onSelect: (index: string) => void;
}

const aligns: Array<{ index: Align; label: React.ReactElement }> = [
  { index: 'left', label: <Icon type="alignLeft" /> },
  { index: 'center', label: <Icon type="alignCenter" /> },
  { index: 'right', label: <Icon type="alignRight" /> },
];
const verticalAligns: Array<{
  index: VerticalAlign;
  label: React.ReactElement;
}> = [
  { index: 'top', label: <Icon type="alignTop" /> },
  { index: 'middle', label: <Icon type="alignMiddle" /> },
  { index: 'bottom', label: <Icon type="alignBottom" /> },
];

const indexIconTypes: {
  [key: string]: IconType;
} = {
  top: 'alignTop',
  middle: 'alignMiddle',
  bottom: 'alignBottom',
  left: 'alignLeft',
  center: 'alignCenter',
  right: 'alignRight',
};

export function TextAlign({
  vertical = false,
  value,
  onSelect,
}: TextAlignProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const [index, setIndex] = useState(value);
  const clicker = (evt: React.MouseEvent) => {
    overlayRef?.current?.setShow(true);
  };
  const onSelector = (item: ListItemProps) => {
    setIndex(item.index as Align | VerticalAlign);
    onSelect(item.index);
  };
  return (
    <Overlay
      ref={overlayRef}
      content={
        <List
          type="inline"
          height="auto"
          items={vertical ? verticalAligns : aligns}
          onSelect={onSelector}
        />
      }>
      <li onClick={clicker}>
        <Icon type={indexIconTypes[index]} />
      </li>
    </Overlay>
  );
}
