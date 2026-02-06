import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { position, Placement } from './helper';

interface OverlayContentProps {
  placement?: Placement;
  zIndex: number;
  target: HTMLElement | null;
  children: React.ReactNode;
  clearOther?: boolean;
  setShow: Function;
}

const SPACE = 2;
const SCROLL_WIDTH = 15;

let _zIndex = 10;

function OverlayContent({
  placement = 'auto',
  target,
  children,
  zIndex,
  setShow,
}: OverlayContentProps) {
  const ref = useRef(null);
  const [style, setStyle] = useState<React.CSSProperties>({ zIndex });

  // calcute position
  useEffect(() => {
    if (ref && ref.current && target != null) {
      const [left, top] = position(
        placement,
        document.documentElement,
        target.getBoundingClientRect(),
        (ref.current as HTMLElement).getBoundingClientRect(),
        SCROLL_WIDTH,
        SPACE
      );
      setStyle({ zIndex, left: `${left}px`, top: `${top}px` });
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
        ref.current &&
        !(ref.current as HTMLElement).contains(evt.target as Node) &&
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
      className="tiny-designer-overlay"
      ref={ref}
      style={style}
      onClick={() => false}>
      {children}
    </div>,
    document.body
  );
}

export interface OverlayMethods {
  setShow: (v: boolean) => void;
}

export type OverlayProps = {
  ref: React.Ref<OverlayMethods>;
  placement?: Placement;
  trigger?: 'click' | 'hover' | 'contextMenu';
  content: ReactNode;
  children: ReactElement;
};

export function Overlay({
  ref,
  placement = 'auto',
  trigger = 'click',
  content,
  children,
}: OverlayProps) {
  const [show, setShow] = useState(false);
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);

  // let targetNode: HTMLElement | null = null;
  const targetRef = (el: HTMLElement) => {
    setTargetNode(el);
  };

  const updateShow = useCallback((v: boolean) => {
    if (v) _zIndex++;
    else _zIndex--;
    setShow(v);
  }, []);

  // target
  const target = children as ReactElement<{
    onClick: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
    onMouseEnter: React.MouseEventHandler<HTMLElement>;
    onContextMenu: React.MouseEventHandler<HTMLElement>;
    ref?: React.Ref<HTMLElement>;
  }>;

  // setTimeout: Waiting for the completion of the other closing process
  const onClick = (evt: React.MouseEvent) => {
    if ('click' === trigger) setTimeout(() => updateShow(!show), 0);
  };
  const onMouseEnter = (evt: React.MouseEvent) => {
    if ('hover' === trigger) setTimeout(() => updateShow(!show), 0);
  };
  const onMouseLeave = (evt: React.MouseEvent) => {
    if ('hover' === trigger) setTimeout(() => updateShow(!show), 0);
  };
  const onContextMenu = (evt: React.MouseEvent) => {
    if ('contextMenu' === trigger) setTimeout(() => updateShow(!show), 0);
  };

  const targetClone = React.cloneElement(target, {
    ref: targetRef,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
  });

  // parent-component call methods
  useImperativeHandle(ref, () => ({ setShow: updateShow }));

  return (
    <React.Fragment>
      {targetClone}
      {show && (
        <OverlayContent
          target={targetNode}
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
