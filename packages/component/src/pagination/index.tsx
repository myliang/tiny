import { CSSProperties, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';

export interface PaginationProps {
  className?: string | string[];
  style?: CSSProperties;
  simple?: boolean;
  total: number;
  current: number;
  rows: number;
  align?: 'start' | 'end' | 'center';
  onChange?: (page: number, rows: number) => void;
}
export default function Pagination({
  className,
  style,
  simple = false,
  total,
  current,
  rows,
  align = 'start',
  onChange,
}: PaginationProps) {
  const [_rows, setRows] = useState(rows);
  const [_current, setCurrent] = useState(current);
  const pages = Math.ceil(total / _rows);
  const currentPages = () => {
    const delta = 2;
    const range = [];
    for (let i = 1; i < pages; i++) {
      if (
        i > 1 &&
        i < pages &&
        i >= _current - delta &&
        i <= _current + delta
      ) {
        range.push(i);
      }
    }
    return range;
  };
  const _onChange = (index: number) => {
    setCurrent(index);
    if (onChange) onChange(index, _rows);
  };
  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const v = evt.target.value;
    if (/^\s*$/.test(v)) {
      return;
    }
    if (/(^\d+$)/.test(v) && parseInt(v) >= 1 && parseInt(v) <= pages) {
      setCurrent(parseInt(v));
    }
  };
  const onInputKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      _onChange(parseInt(evt.currentTarget.value));
    }
  };
  return (
    <ul
      className={classNames(`${cssPrefix}pagination`, className, { simple })}
      style={Object.assign({ justifyContent: align }, style)}>
      {!simple && (
        <li className="total" key="total">
          {(_current - 1) * _rows + 1} - {_current * _rows} / {total}
        </li>
      )}
      <li
        key="prev"
        className={classNames('prev', { disabled: _current <= 1 })}
        onClick={() => _onChange(_current - 1)}>
        <Icon type="angleLeft" />
      </li>
      {!simple && (
        <li
          key="first"
          className={classNames({ active: _current === 1 })}
          onClick={() => _onChange(1)}>
          {1}
        </li>
      )}
      {!simple && pages > 5 && _current > 3 && (
        <li className="disabled">...</li>
      )}
      {!simple &&
        currentPages().map((i) => (
          <li
            key={`page-${i}`}
            className={classNames({ active: _current === i })}
            onClick={() => _onChange(i)}>
            {i}
          </li>
        ))}
      {!simple && pages > 5 && pages - _current > 3 && (
        <li className="disabled">...</li>
      )}
      {!simple && pages > 1 && (
        <li
          key="last"
          className={classNames({ active: _current === pages })}
          onClick={() => _onChange(pages)}>
          {pages}
        </li>
      )}
      {simple && (
        <li className="pages" key="pages">
          <input
            value={_current + ''}
            onChange={onInputChange}
            onKeyDown={onInputKeydown}
          />
          <span>/</span>
          {pages}
        </li>
      )}
      <li
        key="next"
        className={classNames('next', { disabled: _current >= pages })}
        onClick={() => _onChange(_current + 1)}>
        <Icon type="angleRight" />
      </li>
    </ul>
  );
}
