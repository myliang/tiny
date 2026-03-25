import { CSSProperties, useEffect, useRef } from 'react';
import { classNames, cssPrefix } from '../helper';
import TinyTable from '@tiny/table';
import '@tiny/table/dist/tiny-table.css';

export type ColumnValidator = RegExp | ((value: string | number) => boolean);

export type SuperTableColumn = {
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  type?:
    | 'text'
    | 'number'
    | 'integer'
    | 'date'
    | 'checkbox'
    | 'select'
    | 'password';
  validator?: ColumnValidator;
  format?: string;
  key: string;
  title: string;
};

export type SuperTableProps = {
  className?: string | string[];
  style?: CSSProperties;
  width?: () => number;
  height?: () => number;
  editable?: boolean;
  filters?: boolean;
  columns: SuperTableColumn[];
  data: Record<string, any>[];
};

export default function SuperTable({
  className,
  style,
  width,
  height = () => 500,
  editable = true,
  columns,
  data,
}: SuperTableProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const _table = useRef<TinyTable>(null);

  useEffect(() => {
    if (rootRef.current) {
      const cells: [number, number, string | number][] = [];
      for (let r = 0; r < data.length; r++) {
        const obj = data[r];
        for (let c = 0; c < columns.length; c++) {
          const v = data[r][columns[c].key];
          if (v !== undefined && v !== null) {
            cells.push([r, c, v]);
          }
        }
      }

      console.log('cells:', cells);

      _table.current = TinyTable.create(
        rootRef.current,
        () => {
          if (width) return width();
          return rootRef.current?.offsetWidth || 500;
        },
        height,
        {
          scrollable: true,
          resizable: true,
          selectable: true,
          editable,
          copyable: editable,
          data: {
            cols: columns.length,
            rows: data.length,
            rowHeight: 26,
          },
          renderer: {
            style: { fontSize: 10 },
            colHeader: {
              height: 28,
              cell: (row, col) => columns[col].title,
            },
          },
        }
      )
        .data({ cells })
        .on('click', (cell, evt) => {
          console.log('cell:', cell, evt);
        })
        .render();
    }
  }, []);
  return (
    <div
      ref={rootRef}
      className={classNames(`${cssPrefix}super-table`, className)}
      style={Object.assign({ position: 'relative' }, style)}></div>
  );
}
