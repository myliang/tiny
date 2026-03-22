import {
  ReactNode,
  CSSProperties,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import { cssPrefix, classNames, textWidth } from '../helper';
import { Overlay, OverlayMethods, Placement } from '../overlay';
import Icon from '../icon';
import Tag from '../tag';

export type RawValue = string | number;
export type LabeledValue = {
  value: RawValue;
  label: ReactNode;
  [key: string]: any;
};

export type InternalSelectMethods = {
  focus: () => void;
  hide: () => void;
};

export type InternalSelectProps = {
  ref?: React.Ref<InternalSelectMethods>;
  className?: string | string[];
  style?: CSSProperties;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  status?: 'error' | 'warning';
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  multiple?: boolean;
  placement?: Placement;
  prefix?: ReactNode;
  maxCount?: number;
  maxTags?: number;
  popupStyle?: CSSProperties;
  popupContent?: ReactNode;
  icon?: ReactNode;
  value?: LabeledValue | LabeledValue[];
  onClear?: (evt: React.MouseEvent) => void;
  onTagClear?: (evt: React.MouseEvent, v: LabeledValue) => void;
  onSearch?: (value: string) => void;
  onKeyDown?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  onMounted?: (show: boolean) => void;
};
export function InternalSelect({
  ref,
  className,
  style,
  variant = 'outlined',
  status,
  placeholder,
  disabled = false,
  searchable = false,
  clearable = true,
  loading = false,
  multiple = false,
  placement = 'auto',
  prefix,
  maxTags = 2,
  popupStyle,
  popupContent,
  icon,
  value,
  onClear,
  onTagClear,
  onKeyDown,
  onSearch,
  onMounted,
}: InternalSelectProps) {
  const overlayRef = useRef<OverlayMethods>(null);
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
    if (onTagClear) onTagClear(evt, it);
  };

  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onInputFocus = () => {
    setActive(true);
    overlayRef.current?.setShow(true);
  };
  const onInputBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setActive(false);
    evt.target.value = '';
    // overlayRef.current?.setShow(false);
  };

  let timer: any = null;
  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const width = textWidth(evt.target);
    evt.target.style.width = `${width + 2}px`;
    const { value } = evt.target;
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      overlayRef.current?.setShow(true);
      if (onSearch) onSearch(value);
    }, 200);
  };

  const onClick = () => {
    if (searchable) inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        if (searchable) inputRef.current?.focus();
        inputRef.current.style.width = `2px`;
      }
    },
    hide: () => {
      overlayRef.current?.setShow(false);
    },
  }));

  // console.log('select-value:', value);

  return (
    <Overlay
      ref={overlayRef}
      onMounted={onMounted}
      style={popupStyle}
      width="with"
      trigger="click"
      placement={placement}
      content={popupContent}>
      <div
        tabIndex={1}
        onClick={onClick}
        className={classNames(
          `${cssPrefix}select`,
          variant,
          status,
          { disabled, multiple, active },
          className
        )}
        style={style}>
        {prefix && (
          <div className={classNames(`${cssPrefix}select-prefix`)}>
            {prefix}
          </div>
        )}
        <div className={classNames(`${cssPrefix}select-content`)}>
          {multiple ? (
            showValues.map((it) => (
              <Tag
                onClose={(evt) => onTagClose(it, evt)}
                closable={it.value !== 'more' ? clearable : false}
                key={it.value}>
                {it.label}
              </Tag>
            ))
          ) : (
            <div
              className="value-text"
              style={{
                opacity: searchable && inputRef.current?.value !== '' ? 0 : 1,
              }}>
              {Array.isArray(value)
                ? value.length > 0 && value[0].label
                : value !== undefined && value.label != undefined
                  ? value.label
                  : null}
            </div>
          )}
          {placeholder &&
            showValues.length === 0 &&
            inputRef.current?.value === '' && (
              <div className={classNames(`placeholder`)}>{placeholder}</div>
            )}
          {searchable && (
            <input
              ref={inputRef}
              onKeyDown={onKeyDown}
              onChange={onInputChange}
              onFocus={onInputFocus}
              onBlur={onInputBlur}
            />
          )}
        </div>
        {loading ? (
          <div className={classNames(`${cssPrefix}select-suffix loading`)} />
        ) : (
          <div
            className={classNames(`${cssPrefix}select-suffix`)}
            style={{ marginRight: -2 }}>
            {icon || <Icon type="angleDown" />}
          </div>
        )}
        {clearable &&
          (Array.isArray(value)
            ? value.length > 0
            : value !== undefined && value.value !== undefined) && (
            <div
              onClick={onClear}
              className={classNames(`${cssPrefix}select-clear`)}>
              <Icon type="close" />
            </div>
          )}
      </div>
    </Overlay>
  );
}
