import {
  CSSProperties,
  ReactNode,
  useState,
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useReducer,
  useRef,
  Ref,
  ReactElement,
  useCallback,
} from 'react';
import { classNames, cssPrefix, percentageToPixels } from '../helper';
import { bindMousemoveAndMouseup } from '../event';

export interface SplitterPanelProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  ref?: React.RefCallback<HTMLElement>;
  resizable?: boolean;
  min?: number | string;
  max?: number | string;
  size?: number | string;
}
function Panel({
  className,
  style,
  children,
  ref,
  size = 'stretch',
}: SplitterPanelProps) {
  return (
    <div
      ref={ref}
      className={classNames(`${cssPrefix}splitter-panel`, className)}
      style={Object.assign(
        {
          flexBasis: typeof size === 'number' ? `${size}px` : size,
          flexGrow: 0,
        },
        style
      )}>
      {children}
    </div>
  );
}

export interface SplitterDraggerProps {
  vertical?: boolean;
  onResize: (a: number) => void;
}
function Dragger({ vertical, onResize }: SplitterDraggerProps) {
  const [active, setActive] = useState(false);
  let timer: NodeJS.Timeout | null = null;
  const onMouseDownHander = (evt: React.MouseEvent) => {
    setActive(true);
    document.body.style.cursor = `${vertical ? 'row' : 'col'}-resize`;

    evt.stopPropagation();
    evt.preventDefault();

    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      bindMousemoveAndMouseup(
        window,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          const diff = vertical ? e.movementY : e.movementX;
          onResize(diff);
        },
        () => {
          setActive(false);
          document.body.style.cursor = 'auto';
        }
      );
    }, 20);
  };
  return (
    <div
      className={classNames(`${cssPrefix}splitter-bar`)}
      onMouseDown={onMouseDownHander}>
      <div
        className={classNames(`${cssPrefix}splitter-bar-dragger`, { active })}
      />
    </div>
  );
}

export interface SplitterProps {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactElement<SplitterPanelProps>[];
  vertical?: boolean;
}

export default function Splitter({
  className,
  style,
  children,
  vertical = false,
}: SplitterProps) {
  const ref = useRef(null);
  const childRefs = useRef<Map<number, HTMLElement>>(new Map());

  const onResizeHandler = (index: number, a: number) => {
    // console.log('pref:', index, a, childRefs);
    let maxWidth = 10;
    if (ref.current) {
      const { width, height } = (
        ref.current as HTMLElement
      ).getBoundingClientRect();
      maxWidth = vertical ? height : width;
    }
    const getValue = (v: number) => {
      if (ref.current) {
        const it = children[index - 1];
        const range = [
          percentageToPixels(it.props.min || 0, ref.current),
          it.props.max
            ? percentageToPixels(it.props.max, ref.current)
            : maxWidth,
        ];
        if (v > range[1]) return range[1];
        if (v < range[0]) return range[0];
        return v;
      }
      return v;
    };
    const prev = childRefs.current.get(index - 1);
    const curr = childRefs.current.get(index);
    if (prev && curr) {
      const prevRect = prev.getBoundingClientRect();
      const currRect = curr.getBoundingClientRect();
      const prevV = vertical ? prevRect.height : prevRect.width;
      const currV = vertical ? currRect.height : currRect.width;
      // console.log('prev:', a, prevV, getValue(prevV + a));
      if (a !== 0) {
        prev.style.flexBasis = `${getValue(prevV + a)}px`;
        curr.style.flexBasis = `${getValue(currV - a)}px`;
      }
    }
  };

  // --children
  const createChildRef = useCallback(
    (i: number) => {
      return (el: HTMLElement | null) => {
        // console.log('el:', el);
        if (el) childRefs.current.set(i, el);
        else childRefs.current.delete(i);
      };
    },
    [children]
  );

  const cloneChildren = Children.map(children, (_, i) => (
    <Fragment>
      {i > 0 && _.props.resizable !== false ? (
        <Dragger vertical={vertical} onResize={(a) => onResizeHandler(i, a)} />
      ) : (
        ''
      )}
      {isValidElement(_)
        ? cloneElement(_, {
            ref: createChildRef(i),
          })
        : _}
    </Fragment>
  ));
  return (
    <div
      className={classNames(
        `${cssPrefix}splitter`,
        vertical ? 'vertical' : 'horizontal',
        className
      )}
      style={style}
      ref={ref}>
      {cloneChildren}
    </div>
  );
}

Splitter.Panel = Panel;
Splitter.Dragger = Dragger;
