import { ReactElement, useRef } from 'react';
import Menu, { MenuProps } from '../menu';
import { Overlay, OverlayMethods } from '../overlay';
import { Placement, Trigger } from '../overlay/helper';

export type DropdownProps = {
  placement?: Placement;
  trigger?: Trigger;
  menu: MenuProps;
  popupMaxHeight?: number;
  children: ReactElement;
};
export default function Dropdown({
  placement = 'auto',
  trigger = 'hover',
  menu,
  popupMaxHeight,
  children,
}: DropdownProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const { onSelect, ...menuOther } = menu;
  const onSelector = (key: string, evt: React.MouseEvent) => {
    overlayRef.current?.setShow(false);
    if (onSelect) onSelect(key, evt);
  };
  return (
    <Overlay
      ref={overlayRef}
      trigger={trigger}
      placement={placement}
      maxHeight={popupMaxHeight}
      content={
        <Menu
          type="vertical"
          style={{ border: 'none', boxShadow: 'none' }}
          onSelect={onSelector}
          {...menuOther}
        />
      }>
      {children}
    </Overlay>
  );
}
