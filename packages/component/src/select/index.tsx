import { ReactNode, Fragment, useState, useRef } from 'react';
import { cssPrefix, classNames } from '../helper';
import {
  InternalSelect,
  LabeledValue,
  RawValue,
  InternalSelectProps,
  InternalSelectMethods,
} from './select';

import { SelectTree } from './tree';

export type SelectOptGroupType = {
  label: ReactNode;
  options: LabeledValue[];
};
export type SelectOptionType = SelectOptGroupType | LabeledValue;
export type SelectValue = RawValue | RawValue[];

export type SelectProps = {
  notFoundContent?: ReactNode;
  value?: SelectValue;
  options: SelectOptionType[];
  filterOption?: (q: string, value: LabeledValue) => boolean;
  onChange?: (value?: SelectValue) => void;
  onDeselect?: (value: LabeledValue) => void;
  onSelect?: (value: LabeledValue) => void;
} & Omit<InternalSelectProps, 'value' | 'onTagClear' | 'popupContent'>;

export default function Select({
  multiple = false,
  notFoundContent,
  value,
  options,
  filterOption = (q, it) =>
    q === '' || `${it.value}`.includes(q) || `${it.label}`.includes(q),
  onChange,
  onDeselect,
  onSelect,
  onSearch,
  ...restProps
}: SelectProps) {
  const [_value, setValue] = useState<SelectValue | undefined>(value);
  const [query, setQuery] = useState<string>('');
  const internalRef = useRef<InternalSelectMethods>(null);

  const getLabeledValues = (items: SelectOptionType[]) => {
    const ret: LabeledValue[] = [];
    for (let it of items) {
      if (it.options !== undefined) {
        ret.push(...getLabeledValues(it.options));
      } else {
        ret.push(it as LabeledValue);
      }
    }
    return ret;
  };

  const labeldValues = getLabeledValues(options);

  const itemRefs = useRef<HTMLLIElement[]>([]);
  const itemIndex = useRef(0);
  const itemFocus = () => {
    itemRefs.current[itemIndex.current].classList.add('hover');
  };

  const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    let index = itemIndex.current;
    const li: HTMLLIElement = itemRefs.current[index];
    if (li) {
      li.classList.remove('hover');
      if ('ArrowUp' === evt.key) {
        itemIndex.current = index > 0 ? index - 1 : itemRefs.current.length - 1;
        itemFocus();
      } else if ('ArrowDown' === evt.key) {
        itemIndex.current = index < itemRefs.current.length - 1 ? index + 1 : 0;
        itemFocus();
      } else if ('Enter' === evt.key) {
        li.click();
      }
    }
  };

  // input change
  const onSearcher = (q: string) => {
    itemRefs.current.length = 0;
    itemIndex.current = 0;
    if (onSearch) {
      onSearch(q);
    } else {
      setQuery(q);
    }
  };

  // item-active
  const itemActive = (it: SelectOptionType) => {
    // console.log('_value', _value);
    if (it.options === undefined) {
      const it1 = it as LabeledValue;
      const v = it1.value;
      return Array.isArray(_value) ? _value.includes(v) : _value === v;
    }
    return false;
  };

  const setActiveValue = (it: LabeledValue) => {
    if (multiple) {
      let nValue: RawValue[] = [];
      if (_value !== undefined) {
        if (Array.isArray(_value)) {
          nValue = [..._value];
          if (_value.some((v) => v === it.value)) {
            nValue = _value.filter((v) => v !== it.value);
            if (onDeselect) onDeselect(it);
          } else {
            nValue.push(it.value);
            if (onSelect) onSelect(it);
          }
        } else {
          nValue.push(_value, it.value);
          if (onSelect) onSelect(it);
        }
      } else {
        nValue.push(it.value);
        if (onSelect) onSelect(it);
      }
      setValue(nValue);
      if (onChange) onChange(nValue);
    } else {
      setValue(it.value);
      if (onChange) onChange(it.value);
    }
  };

  const onItemClicker = (evt: React.MouseEvent, it: LabeledValue) => {
    evt.stopPropagation();
    setActiveValue(it);
    setQuery('');
    internalRef.current?.focus();
    if (!multiple) internalRef.current?.hide();
  };

  const onTagClear = (evt: React.MouseEvent, it: LabeledValue) => {
    setActiveValue(it);
  };
  const onClear = () => {
    setValue(undefined);
    setQuery('');
    if (onChange) onChange(undefined);
  };

  const itemRef = (el: HTMLLIElement | null) => {
    if (el) {
      itemRefs.current.push(el);
      if (itemRefs.current.length === 1) {
        itemFocus();
      }
    }
  };

  const itemRender = (it: SelectOptionType, key: string) => {
    let subChildren = null;
    if (it.options) {
      subChildren = (it.options as LabeledValue[])
        .map((_, i) => itemRender(_, `${key}-${i}`))
        .filter((it) => it !== null);
      if (subChildren.length === 0) return null;
    } else {
      if (filterOption) {
        if (!filterOption(query, it as LabeledValue)) return null;
      }
    }
    return (
      <Fragment key={key}>
        <li
          ref={(el) => (it.options ? undefined : itemRef(el))}
          onClick={(evt) => onItemClicker(evt, it as LabeledValue)}
          className={classNames(
            `${cssPrefix}menu-item`,
            it.options && 'group',
            {
              active: itemActive(it),
            }
          )}>
          {it.label}
        </li>
        {subChildren}
      </Fragment>
    );
  };

  const onMounted = (show: boolean) => {
    if (show) {
      itemFocus();
    }
  };

  const items = options
    .map((it, i) => itemRender(it, `so_${i}`))
    .filter((it) => it !== null);

  return (
    <InternalSelect
      onMounted={onMounted}
      ref={internalRef}
      value={labeldValues.filter((it) => itemActive(it))}
      multiple={multiple}
      onClear={onClear}
      onTagClear={onTagClear}
      onSearch={onSearcher}
      onKeyDown={onKeyDown}
      popupContent={
        <ul
          className={classNames(`${cssPrefix}menu vertical`)}
          style={{ border: 'none', boxShadow: 'none' }}>
          {items.length > 0 ? (
            items
          ) : (
            <li className={classNames(`${cssPrefix}menu-item disabled`)}>
              {notFoundContent || 'not found'}
            </li>
          )}
        </ul>
      }
      {...restProps}
    />
  );
}

Select.Tree = SelectTree;
