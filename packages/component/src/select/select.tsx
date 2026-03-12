import { ReactNode, CSSProperties, useRef, useState } from 'react';
import { cssPrefix, classNames } from '../helper';
import { Overlay, Placement, OverlayMethods } from '../overlay';
import Icon from '../icon';
import Tag from '../tag';

export type SelectOptionType = { value: string | number; label: ReactNode };

export type SelectValueType = string | string[] | number | number[];

export type SelectProps = {
  className?: string | string[];
  style?: CSSProperties;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  status?: 'error' | 'warning';
  multiple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  seachable?: boolean;
  clearable?: boolean;
  placement?: Placement;
  prefix?: ReactNode;
  autoWidth?: boolean;
  maxCount?: number;
  options: SelectOptionType[];
  value?: SelectValueType;
  onChange?: (value: SelectOptionType | SelectOptionType[]) => void;
  onDeselect?: (value: SelectOptionType) => void;
  onSelect?: (value: SelectOptionType) => void;
  filterOption?:
    | boolean
    | ((inputValue: string, option: SelectOptionType) => boolean);
  onSearch: (value: string) => void;
};
export default function Select({
  className,
  style,
  variant,
  status,
  multiple,
  loading = false,
  disabled = false,
  seachable = false,
  clearable = true,
  placement = 'auto',
  prefix,
  autoWidth = true,
  maxCount = 2,
  options,
  value,
  onChange,
  onDeselect,
  onSelect,
  filterOption,
  onSearch,
}: SelectProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>(
    []
  );
  const content = null;
  return (
    <Overlay
      ref={overlayRef}
      trigger="click"
      placement={placement}
      content={content}>
      <div
        className={classNames(
          `${cssPrefix}input ${cssPrefix}select`,
          variant,
          status,
          { disabled, loading },
          className
        )}
        style={style}>
        {prefix && (
          <div className={classNames(`${cssPrefix}input-prefix`)}>{prefix}</div>
        )}
        <div className={classNames(`${cssPrefix}select-content`)}>
          {selectedOptions.map((it) => (
            <Tag>{it.label}</Tag>
          ))}
        </div>
        {seachable && <input />}
        <div className={classNames(`${cssPrefix}input-suffix`)}>
          <Icon type="angleDown" />
        </div>
        {clearable && (
          <div
            onClick={() => setSelectedOptions([])}
            className={classNames(`${cssPrefix}input-clear`)}
            style={{
              display: selectedOptions.length > 0 ? 'block' : 'none',
            }}>
            <Icon type="close" />
          </div>
        )}
      </div>
    </Overlay>
  );
}
