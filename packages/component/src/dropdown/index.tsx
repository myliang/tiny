import { ReactNode, useRef } from 'react';
import Menu, { MenuProps } from '../menu';
import { Overlay, OverlayMethods } from '../overlay';
import { Placement, Trigger } from '../overlay/helper';

export type DropdownProps = {
  placement?: Placement;
  trigger?: Trigger;
  menu: MenuProps;
  children: ReactNode;
};
export default function Dropdown({
  placement = 'bottom',
  trigger = 'hover',
  menu,
  children,
}: DropdownProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const { onSelect, ...menuOther } = menu;
  const selector = (key: string, evt: React.MouseEvent) => {
    overlayRef.current?.setShow(false);
    if (onSelect) onSelect(key, evt);
  };
  return (
    <Overlay
      ref={overlayRef}
      trigger={trigger}
      placement={placement}
      content={<Menu type="vertical" onSelect={selector} {...menuOther} />}>
      {children}
    </Overlay>
  );
}
