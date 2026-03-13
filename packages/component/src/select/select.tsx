import { ReactNode, CSSProperties, useState, useEffect, Fragment } from 'react';
import { cssPrefix, classNames } from '../helper';
import { Overlay, Placement } from '../overlay';
import Icon from '../icon';
import Tag from '../tag';

type RawValue = string | number;
export type LabeledValue = {
  key?: string;
  value: RawValue;
  label: ReactNode;
  [key: string]: any;
};

export type InternalSelectProps = {
  className?: string | string[];
  style?: CSSProperties;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  status?: 'error' | 'warning';
  placeholder?: string;
  disabled?: boolean;
  seachable?: boolean;
  clearable?: boolean;
  placement?: Placement;
  prefix?: ReactNode;
  maxCount?: number;
  maxTags?: number;
  popupMaxHeight?: number;
  popupContent?: ReactNode;
  value?: LabeledValue | LabeledValue[];
  onClear?: (evt: React.MouseEvent) => void;
  onSearch?: (value: string) => void;
  onMounted?: (targetNode: HTMLElement) => void;
};
export function InternalSelect({
  className,
  style,
  variant = 'outlined',
  status,
  disabled = false,
  seachable = false,
  clearable = true,
  placement = 'auto',
  prefix,
  maxTags = 2,
  popupMaxHeight = 200,
  popupContent,
  value,
  onClear,
}: InternalSelectProps) {
  const [showValues, setShowValues] = useState<LabeledValue[]>([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      if (value.length > maxTags) {
        const nValue = value.slice(0, maxTags);
        nValue.push({ value: 'more', label: `+${value.length - maxTags}` });
      } else {
        setShowValues(value);
      }
    }
  }, [value, maxTags]);

  return (
    <Overlay
      maxHeight={popupMaxHeight}
      width="with"
      trigger="click"
      placement={placement}
      content={popupContent}>
      <div
        className={classNames(
          `${cssPrefix}input ${cssPrefix}select`,
          variant,
          status,
          { disabled },
          className
        )}
        style={style}>
        {prefix && (
          <div className={classNames(`${cssPrefix}input-prefix`)}>{prefix}</div>
        )}
        <div className={classNames(`${cssPrefix}select-content`)}>
          {Array.isArray(value)
            ? showValues.map((it, i) => <Tag>{it.label}</Tag>)
            : value?.label}
        </div>
        {seachable && <input />}
        <div className={classNames(`${cssPrefix}input-suffix`)}>
          <Icon type="angleDown" />
        </div>
        {clearable && (
          <div
            onClick={onClear}
            className={classNames(`${cssPrefix}input-clear`)}
            style={{
              display:
                (Array.isArray(value) && value.length > 0) || value
                  ? 'block'
                  : 'none',
            }}>
            <Icon type="close" />
          </div>
        )}
      </div>
    </Overlay>
  );
}

export type SelectOptGroupType = {
  key?: string;
  label: ReactNode;
  options: LabeledValue[];
};
export type SelectOptionType = SelectOptGroupType | LabeledValue;
export type SelectValue = RawValue | RawValue[];

export type SelectProps = {
  maxHeight?: number;
  autoWidth?: boolean;
  multiple?: boolean;
  value?: SelectValue;
  options: SelectOptionType[];
  filterOption?: (value: LabeledValue) => boolean;
  onChange?: (value: string | string[] | number | number[]) => void;
  onDeselect?: (value: LabeledValue) => void;
  onSelect?: (value: LabeledValue) => void;
} & Omit<InternalSelectProps, 'value'>;

export default function Select({
  maxHeight = 200,
  autoWidth = true,
  multiple = false,
  value,
  options,
  onChange,
  onDeselect,
  onSelect,
  ...restProps
}: SelectProps) {
  const itemRender = (it: SelectOptionType, key: string) => {
    return (
      <Fragment key={key}>
        <li
          className={classNames(
            `${cssPrefix}menu-item`,
            it.options && 'group'
          )}>
          {it.label}
        </li>
        {it.options &&
          (it.options as LabeledValue[]).map((_, i) =>
            itemRender(_, `${key}-${i}`)
          )}
      </Fragment>
    );
  };

  return (
    <InternalSelect
      popupContent={
        <ul
          className={classNames(`${cssPrefix}menu vertical`)}
          style={{ border: 'none', boxShadow: 'none' }}>
          {options.map((it, i) => itemRender(it, `select-option-${i}`))}
        </ul>
      }
      {...restProps}
    />
  );
}
