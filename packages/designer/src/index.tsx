import { useEffect, useRef } from 'react';
import { classNames } from './helper';
import { Toolbar } from './toolbar';
import Table, { TableData } from '@tiny/table';
import '@tiny/table/dist/tiny-table.css';
import './style.index.less';

export interface DesignerProps {
  width: () => number;
  height: () => number;
  tableData?: TableData;
  fontFamilies?: string[];
  fontSizes?: string[];
}

export function Designer({
  width,
  height,
  tableData,
  fontFamilies = 'Microsoft YaHei,SimSun,Songti SC, serif'.split(','),
  fontSizes = '6,8,9,10,12,14,16,18,20,22,24,26,28,36,48,72'.split(','),
}: DesignerProps) {
  const onChange = (key: string, value: boolean | string) => {
    console.log('key:', key, ', value: ', value);
  };

  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef && tableRef.current) {
      const t = Table.create(tableRef.current, width, height, {
        scrollable: true,
        resizable: true,
        selectable: true,
        editable: true,
        copyable: true,
      }).render();
      if (tableData) t.data(tableData);
    }
  });
  return (
    <div className={classNames('wrapper')}>
      <Toolbar
        fontFamilies={fontFamilies}
        fontSizes={fontSizes}
        value={{
          color: '#333333',
          align: 'left',
          valign: 'middle',
          textwrap: false,
          underline: false,
          strikethrough: false,
          bold: false,
          italic: false,
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
        }}
        onChange={onChange}
      />
      <div ref={tableRef} />
    </div>
  );
}
