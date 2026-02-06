import { useState, useRef } from 'react';
import { ColorResult, Sketch } from '@uiw/react-color';
import { Overlay, OverlayMethods } from '../overlay';
import { Icon } from '../icon';
import { classNames } from '../helper';

interface ColorPickerProps {
  type: 'color' | 'bgcolor' | 'borderColor';
  value: string | undefined;
  onChange?: (key: string, value: string) => void;
}

export function ColorPicker({ type, value, onChange }: ColorPickerProps) {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState<string>(value || '#0084FF');

  const onChanger = (color: ColorResult) => {
    setColor(color.hex);
    onChange?.(type, color.hex);
  };

  const overlayRef = useRef<OverlayMethods>(null);
  const clicker = (evt: React.MouseEvent) => {
    overlayRef?.current?.setShow(true);
  };
  return (
    <Overlay
      ref={overlayRef}
      onChange={(show) => setActive(show)}
      content={
        <Sketch
          style={{ boxShadow: 'none' }}
          color={color}
          onChange={onChanger}
        />
      }>
      <li className={classNames({ active })} onClick={clicker}>
        <i
          style={{
            display: 'block',
            borderBottom: `3px solid ${color}`,
          }}>
          <Icon type={type} />
        </i>
      </li>
    </Overlay>
  );
}
