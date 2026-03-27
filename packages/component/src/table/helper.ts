import { ReactNode } from 'react';
import { SelectOptionType } from '../select';
import { TreeProps } from '../tree';

export type TableColumnType =
  | 'text'
  | 'integer'
  | 'number'
  | 'date'
  | 'year'
  | 'month'
  | 'selector'
  | 'tree';

export type TableConditionColumn = {
  key: string;
  title: ReactNode;
  type: TableColumnType;
};

export type TableColumn = {
  className?: string | string[];
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
  width?: number | string;
  key: string;
  title: ReactNode;
  type?: TableColumnType;
  options?: TreeProps[] | SelectOptionType[];
  render?: (col: TableColumn, item: object) => ReactNode;
};

export function filterOperates(type: TableColumnType) {
  const operates: SelectOptionType[] = [
    { value: 'equal', label: '等于' },
    { value: 'notEqual', label: '不等于' },
  ];

  if (['integer', 'number', 'date', 'year', 'month'].includes(type)) {
    operates.push(
      { value: 'greater', label: '大于' },
      { value: 'greaterEqual', label: '大于等于' },
      { value: 'less', label: '小于' },
      { value: 'lessEqual', label: '小于等于' }
    );
  } else {
    operates.push(
      { value: 'in', label: '包含' },
      { value: 'notIn', label: '不包含' }
    );
  }

  operates.push(
    { value: 'isEmpty', label: '为空' },
    { value: 'isNotEmpty', label: '不为空' }
  );

  return operates;
}
