import { ReactElement, useRef, useState } from 'react';
import { Overlay } from '../overlay';
import { TableColumn } from './helper';
import { cssPrefix } from '../helper';
import Icon from '../icon';

export type TableSettingProps = {
  columns: TableColumn[];
  children: ReactElement;
  onChange: (columns: TableColumn[]) => void;
};

export default function TableSetting({
  columns,
  children,
  onChange,
}: TableSettingProps) {
  const [_columns, setColumns] = useState<TableColumn[]>([...columns]);
  const [_hideKeys, setHideKeys] = useState(new Set());

  const onValueChange = (column: TableColumn) => {
    const nHideKeys = new Set(_hideKeys);
    if (nHideKeys.has(column.key)) nHideKeys.delete(column.key);
    else nHideKeys.add(column.key);
    if (_columns.length > nHideKeys.size) {
      setHideKeys(nHideKeys);
      if (onChange) onChange(_columns.filter((it) => !nHideKeys.has(it.key)));
    }
  };

  const drag = useRef<number[]>([-1, -1]);
  const onDragStart = (evt: React.DragEvent, index: number) => {
    drag.current[0] = index;
  };
  const onDrop = (evt: React.DragEvent) => {
    const [index, targetIndex] = drag.current;
    if (index !== targetIndex) {
      const current = _columns[index];
      let selected1 = _columns.slice(0, targetIndex);
      if (index <= targetIndex) {
        selected1 = selected1.filter((it) => it.key !== current.key);
      }
      let selected2 = _columns.slice(targetIndex);
      if (index >= targetIndex) {
        selected2 = selected2.filter((it) => it.key !== current.key);
      }

      const nColumns = [...selected1, current, ...selected2];
      setColumns(nColumns);
      if (onChange) onChange(nColumns.filter((it) => !_hideKeys.has(it.key)));
    }
  };
  const onDragOver = (evt: React.DragEvent, index: number) => {
    evt.preventDefault();
    drag.current[1] = index;
  };

  const content = (
    <ul className={`${cssPrefix}table-columns`} onDrop={onDrop}>
      <li className={`${cssPrefix}table-column`}>字段配置</li>
      {_columns.map((it, index) => (
        <li
          className={`${cssPrefix}table-column`}
          key={it.key}
          draggable
          onDragOver={(evt) => onDragOver(evt, index)}
          onDragStart={(evt) => onDragStart(evt, index)}>
          <div className={`${cssPrefix}table-column-move`}>
            <Icon type="drag" />
          </div>
          <div className={`${cssPrefix}table-column-title`}>{it.title}</div>
          <div
            className={`${cssPrefix}table-column-action`}
            onClick={() => onValueChange(it)}>
            <Icon type={_hideKeys.has(it.key) ? 'eyeInvisible' : 'eye'} />
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <Overlay
      trigger={'click'}
      placement={'bottomLeft'}
      style={{ width: 260, maxHeight: 600 }}
      content={content}>
      {children}
    </Overlay>
  );
}
