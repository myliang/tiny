import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { TableConditionColumn, filterOperates } from './helper';
import { Overlay, OverlayMethods } from '../overlay';
import { cssPrefix } from '../helper';
import Select, { SelectValue } from '../select';
import Icon from '../icon';
import Button from '../button';
import Input from '../input';
import { DatePicker, MonthPicker, YearPicker } from '../date-picker';
import Dropdown from '../dropdown';

export type TableFilterValue = {
  operate: 'equal';
  value: string | number;
} & TableConditionColumn;

export type TableFilterConjunction = 'and' | 'or';

export type TableFilterProps = {
  columns: TableConditionColumn[];
  value?: TableFilterValue[];
  conjunction?: TableFilterConjunction;
  children: ReactElement;
  onChange?: (values: TableFilterValue[], conjunction: string) => void;
};

export default function TableFilter({
  columns,
  value,
  conjunction = 'and',
  children,
  onChange,
}: TableFilterProps) {
  const overlayRef = useRef<OverlayMethods>(null);

  const [selected, setSelected] = useState<TableFilterValue[]>(value || []);
  const [_conjunction, setConjunction] = useState(conjunction);

  const conjunctions = [
    { key: 'and', children: '所有' },
    { key: 'or', children: '任一' },
  ];

  useEffect(() => {
    setSelected(value || []);
    setConjunction(conjunction);
  }, [value, conjunction]);

  const column2Value = (column: TableConditionColumn) => {
    return { ...column, operate: 'equal', value: '' } as TableFilterValue;
  };

  const setSelectedAndChange = (nSelected: TableFilterValue[]) => {
    setSelected(nSelected);
    if (onChange) onChange(nSelected, _conjunction);
  };

  const onAdd = () => {
    setSelectedAndChange([...selected, column2Value(columns[0])]);
  };

  const onRemove = (index: number, evt: React.MouseEvent) => {
    evt.stopPropagation();
    setSelectedAndChange(selected.filter((_, i) => i !== index));
  };

  const onColumnChange = (index: number, v?: SelectValue) => {
    const column = columns.filter((it) => it.key === v)[0];
    const nSelected = selected.map((it, i) =>
      i === index ? column2Value(column) : it
    );
    setSelectedAndChange(nSelected);
  };

  const onValueChange = (index: number) => {
    return (v?: string | number) => {
      if (v) {
        const nSelected = selected.map((it, i) =>
          i === index ? Object.assign({ ...it }, { value: v }) : it
        );
        setSelectedAndChange(nSelected);
      }
    };
  };

  const onConjunctionChange = (v: string) => {
    setConjunction(v as TableFilterConjunction);
    if (onChange) onChange(selected, v as TableFilterConjunction);
  };

  const itemValueRender = (it: TableFilterValue, index: number) => {
    if (['isEmpty', 'isNotEmpty'].includes(it.type)) return null;
    if (it.type === 'date') {
      return (
        <DatePicker
          placeholder="请选择"
          value={it.value as string}
          onChange={onValueChange(index)}
        />
      );
    } else if (it.type === 'month') {
      return (
        <MonthPicker
          placeholder="请选择"
          value={it.value as string}
          onChange={onValueChange(index)}
        />
      );
    } else if (it.type === 'year') {
      return (
        <YearPicker
          placeholder="请选择"
          value={it.value as number}
          onChange={onValueChange(index)}
        />
      );
    } else if (it.type === 'integer' || it.type === 'number') {
      return (
        <Input.Number
          placeholder="请输入"
          value={it.value}
          onChange={onValueChange(index)}
        />
      );
    } else {
      return (
        <Input
          placeholder="请输入"
          value={it.value as string}
          onChange={onValueChange(index)}
        />
      );
    }
  };

  const content = (
    <div className={`${cssPrefix}table-condition`}>
      <div className={`${cssPrefix}table-condition-header`}>
        设置筛选条件
        {selected.length > 1 && (
          <div className={`${cssPrefix}table-condition-extra`}>
            符合一下
            <Dropdown
              menu={{
                onSelect: onConjunctionChange,
                selectedKey: _conjunction,
                items: conjunctions,
              }}>
              <div className={`${cssPrefix}table-condition-conjunction`}>
                {
                  conjunctions.filter((it) => _conjunction === it.key)[0]
                    .children
                }
                <Icon type="angleDown" />
              </div>
            </Dropdown>
            条件
          </div>
        )}
      </div>
      <div className={`${cssPrefix}table-condition-body`}>
        {selected.map((it, index) => (
          <ul key={it.key}>
            <li>
              <div className={`${cssPrefix}table-condition-column`}>
                <Select
                  clearable={false}
                  value={it.key}
                  onChange={(v) => onColumnChange(index, v)}
                  options={columns.map((it) => ({
                    value: it.key,
                    label: it.title,
                  }))}
                />
              </div>
              <div className={`${cssPrefix}table-condition-operate`}>
                <Select
                  popupStyle={{ width: 120 }}
                  clearable={false}
                  value={it.operate}
                  options={filterOperates(it.type)}
                />
              </div>
              <div className={`${cssPrefix}table-condition-value`}>
                {itemValueRender(it, index)}
              </div>
              <div
                className={`${cssPrefix}table-condition-action`}
                onClick={(evt) => onRemove(index, evt)}>
                <Icon type="close"></Icon>
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div className={`${cssPrefix}table-condition-footer`}>
        <Button variant="text" onClick={onAdd} size="small">
          <Icon type="add" style={{ marginRight: 5 }} />
          添加条件
        </Button>
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
