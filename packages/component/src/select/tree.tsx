import {
  InternalSelect,
  InternalSelectProps,
  InternalSelectMethods,
  LabeledValue,
} from './select';
import Tree, { TreeNodeProps } from '../tree';
import { useEffect, useRef, useState } from 'react';
import { findNodes } from '../tree/helper';

export type SelectTreeProps = {
  value?: string | string[];
  onChange?: (value?: string | string[]) => void;
  data: TreeNodeProps[];
} & Omit<
  InternalSelectProps,
  'icon' | 'popupContent' | 'popupMaxHeight' | 'onTagClear' | 'value'
>;
export function SelectTree({
  multiple,
  value,
  data,
  onChange,
  ...restProps
}: SelectTreeProps) {
  const internalRef = useRef<InternalSelectMethods>(null);
  const [labeledValues, setLabeledValues] = useState<LabeledValue[]>([]);
  const [_value, setValue] = useState<string[]>([]);

  const setLabeledValuesByNodes = (nodes: TreeNodeProps[]) => {
    setLabeledValues(nodes.map((it) => ({ label: it.title, value: it.key })));
  };

  useEffect(() => {
    if (value) {
      const values = Array.isArray(value) ? (value as string[]) : [value];
      const nodes = findNodes(data, new Set(values));
      setLabeledValuesByNodes(nodes);
      setValue(values);
    }
  }, [value]);

  const onSelect = (key: string, node: TreeNodeProps) => {
    internalRef.current?.hide();
    setValue([key]);
    setLabeledValuesByNodes([node]);
    if (onChange) onChange(key);
  };
  const onCheck = (keys: string[], nodes: TreeNodeProps[]) => {
    // console.log(':::', keys);
    setValue(keys);
    setLabeledValuesByNodes(nodes);
    if (onChange) onChange(keys);
  };
  const onTagClear = (evt: React.MouseEvent, v: LabeledValue) => {
    evt.stopPropagation();
    setValue(_value.filter((it) => it !== v.value));
    setLabeledValues(labeledValues.filter((it) => it.value !== v.value));
  };
  const onClear = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setValue([]);
    setLabeledValues([]);
    if (onChange) onChange(undefined);
  };
  const onSearch = () => {};
  const onKeyDown = () => {};
  return (
    <InternalSelect
      ref={internalRef}
      value={labeledValues}
      multiple={multiple}
      onClear={onClear}
      onTagClear={onTagClear}
      onSearch={onSearch}
      onKeyDown={onKeyDown}
      popupContent={
        <Tree
          multiple={multiple}
          data={data}
          selectedKey={_value.length > 0 ? _value[0] : undefined}
          checkedKeys={_value}
          onCheck={onCheck}
          onSelect={onSelect}
        />
      }
      {...restProps}
    />
  );
}
