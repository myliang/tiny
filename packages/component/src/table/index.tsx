import { CSSProperties, ReactNode } from 'react';
import { classNames, cssPrefix } from '../helper';

export type TableColumn = {
  className?: string | string[];
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
  width?: number | string;
  key: string;
  title: ReactNode;
  render?: (col: TableColumn, item: object) => ReactNode;
};
export type TableProps = {
  className?: string | string[];
  style?: CSSProperties;
  bordered?: boolean;
  loading?: boolean;
  columns: TableColumn[];
  data: Record<string, any>[];
};

export function Table({
  className,
  style,
  bordered,
  loading,
  columns,
  data,
}: TableProps) {
  return (
    <div
      className={classNames(`${cssPrefix}table`, className, {
        bordered,
        loading,
      })}
      style={style}>
      <table>
        <colgroup>
          {columns.map((c) => (
            <col width={c.width} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr>
              {columns.map((c) => (
                <td>{c.render ? c.render(c, d) : d[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
