import { CSSProperties, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';
import TableSort, { TableSortValue } from './sort';
import { TableColumn } from './helper';
import Spin from '../spin';
import Pagination, { PaginationProps } from '../pagination';
import TableFilter, { TableFilterValue } from './filter';
import TableSetting, { TableSettingValue } from './setting';

type ToolbarType = boolean | { add: boolean };

export type TableProps = {
  className?: string | string[];
  style?: CSSProperties;
  bordered?: boolean;
  loading?: boolean;
  toolbar?: ToolbarType;
  pagination?: PaginationProps;
  columns: TableColumn[];
  data: Record<string, any>[];
};

export function Table({
  className,
  style,
  bordered = false,
  loading = false,
  toolbar = { add: false },
  pagination,
  columns,
  data,
}: TableProps) {
  const cellStyle = ({ align }: TableColumn) => {
    return { textAlign: align };
  };

  const [_columns, setColumns] = useState(columns);

  const conditionColumns = columns.map(({ key, title, type }) => ({
    key,
    title,
    type: type || 'text',
  }));

  const [sortValues, setSortValues] = useState<TableSortValue[]>([]);
  const onSortChange = (v: TableSortValue[]) => {
    setSortValues(v);
  };

  const [filterValues, setFilterValues] = useState<TableFilterValue[]>([]);
  const onFilterChange = (v: TableFilterValue[]) => {
    setFilterValues(v);
  };

  const onSettingChange = (cols: TableColumn[]) => {
    setColumns(cols);
  };

  return (
    <div
      className={classNames(`${cssPrefix}table`, className, {
        bordered,
      })}
      style={style}>
      <Spin loading={loading}>
        {toolbar && (
          <div className={classNames(`${cssPrefix}table-toolbar`)}>
            <div
              className={classNames(`${cssPrefix}table-toolbar-item`, {
                disabled:
                  typeof toolbar === 'boolean' ? false : toolbar.add !== true,
              })}>
              <Icon type="add" />
            </div>
            <TableSetting columns={conditionColumns} onChange={onSettingChange}>
              <div className={classNames(`${cssPrefix}table-toolbar-item`)}>
                <Icon type="setting" />
              </div>
            </TableSetting>
            <TableFilter
              columns={conditionColumns}
              value={filterValues}
              onChange={onFilterChange}>
              <div
                className={classNames(`${cssPrefix}table-toolbar-item`, {
                  active: filterValues.length > 0,
                })}>
                <Icon type="filter" />
                {filterValues.length > 0 && (
                  <span className="count">{filterValues.length}</span>
                )}
              </div>
            </TableFilter>
            <TableSort
              columns={conditionColumns}
              value={sortValues}
              onChange={onSortChange}>
              <div
                className={classNames(`${cssPrefix}table-toolbar-item`, {
                  active: sortValues.length > 0,
                })}>
                <Icon type="sortAZ" />
                {sortValues.length > 0 && (
                  <span className="count">{sortValues.length}</span>
                )}
              </div>
            </TableSort>
          </div>
        )}
        <div className={classNames(`${cssPrefix}table-content`)}>
          <table>
            <colgroup>
              {_columns.map((c) => (
                <col key={c.key} width={c.width} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {_columns.map((c) => (
                  <th
                    key={c.key}
                    style={cellStyle(c)}
                    className={classNames(
                      c.fixed ? `${cssPrefix}table-cell-fixed ${c.fixed}` : ''
                    )}>
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d, ri) => (
                <tr key={ri}>
                  {_columns.map((c) => (
                    <td
                      key={`${ri}_${c.key}`}
                      style={cellStyle(c)}
                      className={classNames(
                        c.fixed ? `${cssPrefix}table-cell-fixed ${c.fixed}` : ''
                      )}>
                      {c.render ? c.render(c, d) : d[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination && <Pagination {...pagination} />}
      </Spin>
    </div>
  );
}
