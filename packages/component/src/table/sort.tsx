import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { TableConditionColumn } from './helper';
import { Overlay, OverlayMethods } from '../overlay';
import { cssPrefix } from '../helper';
import Select, { SelectValue } from '../select';
import Icon from '../icon';
import Radio, { RadioValueType } from '../radio';

export type TableSortValue = {
  value: 'desc' | 'asc';
} & TableConditionColumn;

export type TableSortProps = {
  columns: TableConditionColumn[];
  value?: TableSortValue[];
  children: ReactElement;
  onChange?: (values: TableSortValue[]) => void;
};

export default function TableSort({
  columns,
  value,
  children,
  onChange,
}: TableSortProps) {
  const overlayRef = useRef<OverlayMethods>(null);

  const [selected, setSelected] = useState<TableSortValue[]>(value || []);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  const radioOptions = [
    { value: 'asc', label: '升序' },
    { value: 'desc', label: '降序' },
  ];

  const onValueChange = (it: TableSortValue, v: RadioValueType) => {
    it.value = v as 'desc' | 'asc';
    setSelected(selected.map((_) => (_.key === it.key ? it : _)));
  };

  const onAdd = (v?: SelectValue) => {
    if (v) {
      const v1 = Array.isArray(v) ? v[0] : v;
      const nSelectedKeys = new Set([...selectedKeys, v1]);
      setSelectedKeys(nSelectedKeys);
      const nSelected = [
        ...selected,
        ...(columns
          .filter((it) => it.key === v1)
          .map((it) => ({ ...it, value: 'asc' })) as TableSortValue[]),
      ];
      if (onChange) onChange(nSelected);
      setSelected(nSelected);
    }
  };

  const onRemove = (v: TableSortValue, evt: React.MouseEvent) => {
    evt.stopPropagation();

    selectedKeys.delete(v.key);
    setSelectedKeys(selectedKeys);
    setSelected((arg) => {
      const nary = arg.filter((it) => it.key !== v.key);
      if (onChange) onChange(nary);
      return nary;
    });
  };

  const drag = useRef<number[]>([-1, -1]);
  const onDragStart = (evt: React.DragEvent, index: number) => {
    drag.current[0] = index;
  };
  const onDrop = (evt: React.DragEvent) => {
    const [index, targetIndex] = drag.current;
    if (index !== targetIndex) {
      const current = selected[index];
      let selected1 = selected.slice(0, targetIndex);
      if (index <= targetIndex) {
        selected1 = selected1.filter((it) => it.key !== current.key);
      }
      let selected2 = selected.slice(targetIndex);
      if (index >= targetIndex) {
        selected2 = selected2.filter((it) => it.key !== current.key);
      }

      setSelected([...selected1, current, ...selected2]);
    }
  };
  const onDragOver = (evt: React.DragEvent, index: number) => {
    evt.preventDefault();
    drag.current[1] = index;
  };

  const content = (
    <div className={`${cssPrefix}table-condition`}>
      <div className={`${cssPrefix}table-condition-header`}>设置排序条件</div>
      <div className={`${cssPrefix}table-condition-body`} onDrop={onDrop}>
        {selected.map((it, index) => (
          <ul
            key={it.key}
            draggable
            onDragOver={(evt) => onDragOver(evt, index)}
            onDragStart={(evt) => onDragStart(evt, index)}>
            <li className={`${cssPrefix}table-condition-move`}>
              <Icon type="drag" />
            </li>
            <li>
              <div className={`${cssPrefix}table-condition-column`}>
                <Select
                  clearable={false}
                  value={it.key}
                  options={columns
                    .filter((c) => !selectedKeys.has(c.key) || c.key === it.key)
                    .map((it) => ({ value: it.key, label: it.title }))}
                />
              </div>
              <div className={`${cssPrefix}table-condition-value`}>
                <Radio.Group
                  type="button"
                  value={it.value}
                  optionStyle={{ width: 80 }}
                  onChange={(v) => onValueChange(it, v)}
                  options={radioOptions}
                />
              </div>
              <div
                className={`${cssPrefix}table-condition-action`}
                onClick={(evt) => onRemove(it, evt)}>
                <Icon type="close"></Icon>
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div className={`${cssPrefix}table-condition-footer`}>
        <Select
          placeholder="选择条件"
          clearable={false}
          options={columns
            .filter((c) => !selectedKeys.has(c.key))
            .map((it) => ({ value: it.key, label: it.title }))}
          style={{ width: 100 }}
          onChange={onAdd}
        />
      </div>
    </div>
  );
  return (
    <Overlay
      ref={overlayRef}
      trigger={'click'}
      placement={'bottomLeft'}
      style={{ width: 480, maxHeight: 600 }}
      content={content}>
      {children}
    </Overlay>
  );
}
