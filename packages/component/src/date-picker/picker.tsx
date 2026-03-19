import {
  CSSProperties,
  useState,
  useRef,
  ReactNode,
  useEffect,
  Ref,
  useImperativeHandle,
} from 'react';
import { classNames, cssPrefix } from '../helper';
import { Overlay, OverlayMethods, Placement } from '../overlay';
import Icon from '../icon';

export type PickerMethods = {
  hide: () => void;
};
export type PickerProps = {
  ref?: Ref<PickerMethods>;
  className?: string | string[];
  style?: CSSProperties;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  status?: 'error' | 'warning';
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  placement?: Placement;
  value?: string | number | null;
  popupContent: ReactNode;
  onClear?: () => void;
  onInputChange?: (value: string) => void;
};

export default function Picker({
  ref,
  className,
  style,
  variant = 'outlined',
  status,
  placeholder,
  disabled,
  clearable = true,
  placement,
  value,
  onInputChange,
  onClear,
  popupContent,
}: PickerProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const [active, setActive] = useState(false);
  const [_value, setValue] = useState(value || '');
  const _onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    if (onInputChange) onInputChange(evt.target.value);
  };
  const _onClear = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setValue('');
    if (onClear) onClear();
  };

  useEffect(() => {
    setValue(value || '');
  }, [value]);

  useImperativeHandle(ref, () => ({
    hide: () => {
      setActive(false);
      overlayRef.current?.setShow(false);
    },
  }));

  return (
    <Overlay
      ref={overlayRef}
      width="auto"
      trigger="click"
      maxHeight={500}
      placement={placement}
      content={popupContent}>
      <div
        className={classNames(`${cssPrefix}input`, variant, status, className, {
          active,
          disabled,
        })}
        style={style}>
        <input
          type="input"
          value={_value}
          placeholder={placeholder}
          onChange={_onInputChange}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
        />
        <div className={classNames(`${cssPrefix}input-suffix`)}>
          <Icon type="calendar" />
        </div>
        {clearable && value && (
          <span
            onClick={_onClear}
            className={classNames(`${cssPrefix}input-clear`)}>
            <Icon type="close" />
          </span>
        )}
      </div>
    </Overlay>
  );
}
