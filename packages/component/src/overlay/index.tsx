import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  ReactElement,
  ReactNode,
  useCallback,
  useEffectEvent,
} from 'react';
import ReactDOM from 'react-dom';
import { position, Placement, Trigger } from './helper';
import { classNames } from '../helper';

type OverlayContentProps = {
  placement?: Placement;
  zIndex: number;
  maxHeight: number;
  width?: number | 'auto' | 'with';
  target: HTMLElement | null;
  children: React.ReactNode;
  clearOther?: boolean;
  setShow: Function;
  onMouseEnter: (evt: React.MouseEvent) => void;
  onMouseLeave: (evt: React.MouseEvent) => void;
};

const SPACE = 2;
const SCROLL_WIDTH = 15;

let _zIndex = 10;

function OverlayContent({
  placement = 'auto',
  target,
  children,
  zIndex,
  maxHeight,
  width = 'auto',
  setShow,
  onMouseEnter,
  onMouseLeave,
}: OverlayContentProps) {
  const _ref = useRef(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    zIndex,
    maxHeight,
  });

  // calcute position
  useEffect(() => {
    if (_ref && _ref.current && target != null) {
      console.log('rect:', target.getBoundingClientRect());
      const [left, top] = position(
        placement,
        document.documentElement,
        target.getBoundingClientRect(),
        (_ref.current as HTMLElement).getBoundingClientRect(),
        SCROLL_WIDTH,
        SPACE
      );
      setStyle(
        Object.assign({
          maxHeight,
          zIndex,
          width: width === 'with' ? target.offsetWidth : width,
          left: `${left}px`,
          top: `${top}px`,
        })
      );
    }
  }, [target]);

  // click outside and Escape
  useEffect(() => {
    const isCurrent = () => zIndex === _zIndex;
    const closeHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && isCurrent()) setShow(false);
    };
    const handler = (evt: MouseEvent) => {
      if (
        isCurrent() &&
        _ref.current &&
        !(_ref.current as HTMLElement).contains(evt.target as Node) &&
        !target?.contains(evt.target as Node)
      ) {
        setShow(false);
      }
      return false;
    };
    window.addEventListener('keydown', closeHandler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', closeHandler);
      window.removeEventListener('click', handler);
    };
  });

  return ReactDOM.createPortal(
    <div
      className="tiny-overlay"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={_ref}
      style={style}
      onClick={() => false}>
      {children}
    </div>,
    document.body
  );
}

export type OverlayMethods = {
  setShow: (v: boolean) => void;
  toggle: () => void;
};

export type OverlayProps = {
  ref?: React.Ref<OverlayMethods>;
  maxHeight?: number;
  width?: 'auto' | 'with' | number;
  placement?: Placement;
  trigger?: Trigger;
  content: ReactNode;
  children: ReactElement;
  onChange?: (show: boolean) => void;
  onMounted?: (targetNode: HTMLElement) => void;
};

export function Overlay({
  ref,
  maxHeight = 200,
  width = 'auto',
  placement = 'auto',
  trigger = 'click',
  content,
  children,
  onChange,
  onMounted,
}: OverlayProps) {
  const [show, setShow] = useState(false);
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
  const isEnterContent = useRef(false);

  // let targetNode: HTMLElement | null = null;
  const targetRef = (el: HTMLElement) => {
    setTargetNode(el);
  };

  const updateShow = useCallback((v: boolean) => {
    if (v) _zIndex++;
    else _zIndex--;
    setShow(v);
    onChange?.(v);
  }, []);

  // target
  const target = children as ReactElement<{
    onClick: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
    onMouseEnter: React.MouseEventHandler<HTMLElement>;
    onContextMenu: React.MouseEventHandler<HTMLElement>;
    className: string;
    ref?: React.Ref<HTMLElement>;
  }>;

  // setTimeout: Waiting for the completion of the other closing process
  const onClick = (evt: React.MouseEvent) => {
    if ('click' === trigger) setTimeout(() => updateShow(!show), 0);
  };
  const onMouseEnter = (evt: React.MouseEvent) => {
    if ('hover' === trigger) {
      setTimeout(() => updateShow(!show), 0);
    }
  };
  const onMouseLeave = (evt: React.MouseEvent) => {
    if ('hover' === trigger) {
      setTimeout(() => {
        if (!isEnterContent.current) {
          updateShow(!show);
        }
      }, 200);
    }
  };
  const onContextMenu = (evt: React.MouseEvent) => {
    if ('contextMenu' === trigger) setTimeout(() => updateShow(!show), 0);
  };
  const onContentMouseEnter = (evt: React.MouseEvent) => {
    if ('hover' === trigger) {
      isEnterContent.current = true;
    }
  };
  const onContentMouseLeave = (evt: React.MouseEvent) => {
    if ('hover' === trigger) {
      isEnterContent.current = false;
      updateShow(!show);
    }
  };

  const targetClone = React.cloneElement(target, {
    ref: targetRef,
    className: `${classNames(target.props.className, { active: show })}`,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
  });

  // parent-component call methods
  useImperativeHandle(ref, () => ({
    setShow: updateShow,
    toggle: () => updateShow(!show),
  }));

  if (onMounted) {
    const onMountedEvent = useEffectEvent(onMounted);
    useEffect(() => {
      targetNode && onMountedEvent(targetNode);
    }, [targetNode]);
  }

  return (
    <React.Fragment>
      {targetClone}
      {show && (
        <OverlayContent
          onMouseEnter={onContentMouseEnter}
          onMouseLeave={onContentMouseLeave}
          target={targetNode}
          maxHeight={maxHeight}
          width={width}
          zIndex={_zIndex}
          placement={placement}
          setShow={updateShow}>
          {content}
        </OverlayContent>
      )}
    </React.Fragment>
  );
}

export type { Placement };
