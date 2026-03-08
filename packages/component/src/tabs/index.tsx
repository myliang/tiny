import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';
import { bind, unbind } from '../event';

export type TabPanelProps = {
  style?: CSSProperties;
  key: string;
  label: ReactNode;
  children: ReactNode;
  closable?: boolean;
  disabled?: boolean;
};
function TabPanel({ children, style }: TabPanelProps) {
  return (
    <div className={classNames(`${cssPrefix}tabs-tabpanel`)} style={style}>
      {children}
    </div>
  );
}

export type TabsProps = {
  className?: string | string[];
  style?: CSSProperties;
  type?: 'line' | 'card';
  placement?: 'left' | 'right' | 'top' | 'bottom';
  selectedKey?: string;
  editable?: boolean;
  items?: TabPanelProps[];
  onChange?: (index: number) => void;
  onEdit?: (action: 'add' | 'delete', index?: number) => void;
};
export default function Tabs({
  className,
  style,
  type = 'line',
  placement = 'top',
  selectedKey,
  editable = false,
  items = [],
  onChange,
  onEdit,
}: TabsProps) {
  const isVertical = ['left', 'right'].includes(placement);

  const [_selectedKey, setSelectedKey] = useState(selectedKey);

  const onTabClose = (index: number) => {
    if (onEdit) onEdit('delete', index);
  };
  const onTabAdd = () => {
    if (onEdit) onEdit('add');
  };
  const onTabClick = (index: number, it: TabPanelProps) => {
    setSelectedKey(it.key);
    if (onChange) onChange(index);
  };

  const [translateV, setTranslateV] = useState(0);
  // const [translateMinV, setTranslateMinV] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const translateMinRef = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  const setTranslate = (delta: number) => {
    let v = translateV - parseInt(delta + '');
    if (v > 0) v = 0;
    else if (v <= translateMinRef.current) v = translateMinRef.current;
    setTranslateV(v);
  };

  const navWrapperSize = useCallback(() => {
    const rectKey = isVertical ? 'height' : 'width';
    return navWrapperRef.current?.getBoundingClientRect()[rectKey] || 0;
  }, [items]);

  useEffect(() => {
    if (ref.current && navRef.current && navWrapperRef.current) {
      const elKey = isVertical ? 'scrollHeight' : 'scrollWidth';
      // console.log('rectKey:', rectKey, navRect, rect);
      if (navRef.current[elKey] > ref.current[elKey]) {
        setOverflow(true);

        translateMinRef.current = navWrapperSize() - navRef.current[elKey];
        // wheel
        const wheelHandler = (evt: any) => {
          if (navWrapperRef.current) {
            const { deltaY, target } = evt;
            if (navWrapperRef.current.contains(target)) {
              evt.preventDefault();
              setTranslate(deltaY);
            }
          }
        };
        bind(window, 'wheel', wheelHandler);
        return () => {
          unbind(window, 'wheel', wheelHandler);
        };
      }
    }
  }, [overflow, translateV]);

  return (
    <div
      ref={ref}
      className={classNames(`${cssPrefix}tabs`, type, placement, className)}
      style={style}>
      <div className={classNames(`${cssPrefix}tabs-nav-container`)}>
        {overflow && (
          <div
            key="prev"
            onClick={() => setTranslate(-navWrapperSize())}
            className={classNames('prev', { disabled: translateV >= 0 })}>
            <Icon type={isVertical ? 'angleUp' : 'angleLeft'} />
          </div>
        )}
        <div className="content" ref={navWrapperRef}>
          <ul
            className={classNames(`${cssPrefix}tabs-nav`)}
            style={{
              transform: isVertical
                ? `translateY(${translateV}px)`
                : `translateX(${translateV}px)`,
            }}
            ref={navRef}>
            {items.map((it, i) => (
              <li
                key={`nav-item-${i}`}
                onClick={() => onTabClick(i, it)}
                className={classNames({
                  active: it.key === _selectedKey,
                  disabled: it.disabled,
                })}>
                {it.label}
                {editable &&
                  (it.closable === undefined ? true : it.closable) && (
                    <div className="close" onClick={() => onTabClose(i)}>
                      <Icon type="close" />
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
        {overflow && (
          <div
            key="next"
            onClick={() => setTranslate(navWrapperSize())}
            className={classNames('next', {
              disabled: translateV <= translateMinRef.current,
            })}>
            <Icon type={isVertical ? 'angleDown' : 'angleRight'} />
          </div>
        )}
      </div>
      <div className={classNames(`${cssPrefix}tabs-content`)}>
        {items.map(({ style = {}, key, ...it }) => (
          <TabPanel
            key={key}
            style={Object.assign(style, {
              display: key === _selectedKey ? 'block' : 'none',
            })}
            {...it}
          />
        ))}
      </div>
    </div>
  );
}
