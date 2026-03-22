import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  ReactElement,
  ReactNode,
  useCallback,
  useEffectEvent,
  CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';
import { position, Placement, Trigger } from './helper';
import { classNames } from '../helper';

type OverlayContentProps = {
  style?: CSSProperties;
  placement?: Placement;
  zIndex: number;
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
  style,
  placement = 'auto',
  target,
  children,
  zIndex,
  width = 'auto',
  setShow,
  onMouseEnter,
  onMouseLeave,
}: OverlayContentProps) {
  const _ref = useRef(null);
  const [_style, setStyle] = useState<React.CSSProperties>(
    Object.assign(
      {
        zIndex,
      },
      style
    )
  );

  const currentPosition = () => {
    if (_ref && _ref.current && target != null) {
      const [left, top] = position(
        placement,
        document.documentElement,
        target.getBoundingClientRect(),
        (_ref.current as HTMLElement).getBoundingClientRect(),
        SCROLL_WIDTH,
        SPACE
      );
      setStyle(
        Object.assign(
          {
            zIndex,
            width: width === 'with' ? target.offsetWidth : width,
            left: `${left}px`,
            top: `${top}px`,
            maxHeight: 200,
          },
          style
        )
      );
    }
  };

  // calcute position
  useEffect(currentPosition, [target]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      currentPosition();
    });
    target && resizeObserver.observe(target);
    return () => {
      resizeObserver.disconnect();
    };
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
      style={_style}
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
  style?: CSSProperties;
  width?: 'auto' | 'with' | number;
  placement?: Placement;
  trigger?: Trigger;
  content: ReactNode;
  children: ReactElement;
  onChange?: (show: boolean) => void;
  onMounted?: (show: boolean) => void;
};

export function Overlay({
  ref,
  style,
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
  const onClick = (evt: React.MouseEvent<HTMLElement>) => {
    if ('click' === trigger) setTimeout(() => updateShow(!show), 0);
    if (target.props.onClick) {
      target.props.onClick(evt);
    }
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
      onMountedEvent(show);
    }, [show]);
  }

  return (
    <React.Fragment>
      {targetClone}
      {show && (
        <OverlayContent
          onMouseEnter={onContentMouseEnter}
          onMouseLeave={onContentMouseLeave}
          target={targetNode}
          style={style}
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
