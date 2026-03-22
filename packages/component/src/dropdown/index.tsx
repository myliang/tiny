import { CSSProperties, ReactElement, useRef } from 'react';
import Menu, { MenuProps } from '../menu';
import { Overlay, OverlayMethods } from '../overlay';
import { Placement, Trigger } from '../overlay/helper';

export type DropdownProps = {
  placement?: Placement;
  trigger?: Trigger;
  menu: MenuProps;
  popupStyle?: CSSProperties;
  children: ReactElement;
};
export default function Dropdown({
  placement = 'auto',
  trigger = 'hover',
  menu,
  popupStyle,
  children,
}: DropdownProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const { onSelect, ...menuOther } = menu;
  const onSelector = (
    key: string,
    evt: React.MouseEvent | React.KeyboardEvent
  ) => {
    overlayRef.current?.setShow(false);
    if (onSelect) onSelect(key, evt);
  };
  return (
    <Overlay
      ref={overlayRef}
      trigger={trigger}
      placement={placement}
      style={popupStyle}
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
