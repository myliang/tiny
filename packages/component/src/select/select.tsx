import { ReactNode, CSSProperties, useState, useEffect } from 'react';
import { cssPrefix, classNames } from '../helper';
import { Overlay, Placement } from '../overlay';
import Icon from '../icon';
import Tag from '../tag';

export type RawValue = string | number;
export type LabeledValue = {
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
  loading?: boolean;
  multiple?: boolean;
  placement?: Placement;
  prefix?: ReactNode;
  maxCount?: number;
  maxTags?: number;
  popupMaxHeight?: number;
  popupContent?: ReactNode;
  value?: LabeledValue | LabeledValue[];
  onClear?: (evt: React.MouseEvent) => void;
  onTagClear?: (evt: LabeledValue) => void;
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
  loading = false,
  multiple = false,
  placement = 'auto',
  prefix,
  maxTags = 2,
  popupMaxHeight = 200,
  popupContent,
  value,
  onClear,
  onTagClear,
}: InternalSelectProps) {
  const [showValues, setShowValues] = useState<LabeledValue[]>([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      let nValue = value;
      if (value.length > maxTags) {
        nValue = value.slice(0, maxTags);
        nValue.push({ value: 'more', label: `+${value.length - maxTags}...` });
      }
      setShowValues(nValue);
    }
  }, [value, maxTags]);

  const onTagClose = (it: LabeledValue, evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (onTagClear) onTagClear(it);
  };

  return (
    <Overlay
      maxHeight={popupMaxHeight}
      width="with"
      trigger="click"
      placement={placement}
      content={popupContent}>
      <div
        tabIndex={1}
        className={classNames(
          `${cssPrefix}input ${cssPrefix}select`,
          variant,
          status,
          { disabled, multiple },
          className
        )}
        style={style}>
        {prefix && (
          <div className={classNames(`${cssPrefix}input-prefix`)}>{prefix}</div>
        )}
        <div className={classNames(`${cssPrefix}select-content`)}>
          {multiple &&
            showValues.map((it) => (
              <Tag
                onClose={(evt) => onTagClose(it, evt)}
                closable={it.value !== 'more' ? clearable : false}
                key={it.value}>
                {it.label}
              </Tag>
            ))}
        </div>
        {seachable && <input />}
        {loading ? (
          <div className={classNames(`${cssPrefix}input-suffix loading`)} />
        ) : (
          <div className={classNames(`${cssPrefix}input-suffix`)}>
            <Icon type="angleDown" />
          </div>
        )}
        {clearable && !multiple && (
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
