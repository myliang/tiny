import { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';
import Image, { ImageProps } from './image';
import { bindMousemoveAndMouseup } from '../event';

export type ImagePreviewProps = {
  src: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export function ImagePreview({
  src,
  onClose,
  hasNext = false,
  hasPrev = false,
  onPrev,
  onNext,
}: ImagePreviewProps) {
  const [translate, setTranslate] = useState([0, 0]);
  const [scale, setScale] = useState([1, 1]);
  const [rotate, setRotate] = useState(0);

  const updateScale = (v: number) => {
    setScale(
      scale.map((it) => {
        const n = it * (1 + v);
        if (n <= 0.25 && n >= -0.25) return it;
        return n;
      })
    );
  };

  const onRotate = (v: number) => {
    setRotate(rotate + v);
  };
  const onZoom = (type: 'in' | 'out') => {
    const v = type === 'in' ? 0.5 : -0.5;
    updateScale(v);
  };
  const onSwap = (type: 'x' | 'y') => {
    if (type === 'x') {
      setScale([0 - scale[0], scale[1]]);
    } else {
      setScale([scale[0], 0 - scale[1]]);
    }
  };

  const onReset = () => {
    setTranslate([0, 0]);
    setScale([1, 1]);
    setRotate(0);
  };

  const dragStart = useRef({ x: 0, y: 0 });
  const maskRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const onKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') onClose();
    };

    const onWheel = (evt: WheelEvent) => {
      evt.preventDefault();
      evt.stopPropagation();
      updateScale(evt.deltaY > 0 ? -0.2 : 0.2);
    };

    const onImgMouseDown = (evt: MouseEvent) => {
      dragStart.current = {
        x: evt.clientX - translate[0],
        y: evt.clientY - translate[1],
      };
      bindMousemoveAndMouseup(
        window,
        (e) => {
          setTranslate([
            e.clientX - dragStart.current.x,
            e.clientY - dragStart.current.y,
          ]);
        },
        () => {}
      );
    };

    const wheelName = 'wheel';
    maskRef.current?.addEventListener(wheelName, onWheel, { passive: false });
    imgRef.current?.addEventListener(wheelName, onWheel, { passive: false });
    imgRef.current?.addEventListener('mousedown', onImgMouseDown, {
      passive: false,
    });

    window.addEventListener('keydown', onKeydown);
    return () => {
      maskRef.current?.removeEventListener(wheelName, onWheel);
      imgRef.current?.removeEventListener(wheelName, onWheel);
      imgRef.current?.removeEventListener('mousedown', onImgMouseDown);
      window.removeEventListener('keydown', onKeydown);
    };
  });

  return ReactDOM.createPortal(
    <div className={classNames(`${cssPrefix}image-preview`)}>
      <div
        ref={maskRef}
        className={`${cssPrefix}image-preview-mask`}
        onDoubleClick={() => onReset()}></div>
      <div className={`${cssPrefix}image-preview-body`}>
        <img
          src={src}
          ref={imgRef}
          draggable={false}
          onDoubleClick={() => onReset()}
          style={{
            transform: `translate(${translate[0]}px, ${translate[1]}px) scale(${scale[0]}, ${scale[1]}) rotate(${rotate}deg)`,
          }}
        />
      </div>
      <div className={`${cssPrefix}image-preview-close`} onClick={onClose}>
        <Icon type="close" />
      </div>
      {hasPrev && (
        <div className={`${cssPrefix}image-preview-prev`} onClick={onPrev}>
          <Icon type="angleLeft" />
        </div>
      )}
      {hasNext && (
        <div className={`${cssPrefix}image-preview-next`} onClick={onNext}>
          <Icon type="angleRight" />
        </div>
      )}
      <div className={`${cssPrefix}image-preview-toolbar`}>
        <div className={`${cssPrefix}image-preview-toolbar-action`}>
          <Icon
            type="swap"
            style={{ transform: 'rotate(90deg)' }}
            onClick={() => onSwap('y')}
          />
        </div>
        <div
          className={`${cssPrefix}image-preview-toolbar-action`}
          onClick={() => onSwap('x')}>
          <Icon type="swap" />
        </div>
        <div
          className={`${cssPrefix}image-preview-toolbar-action`}
          onClick={() => onRotate(-90)}>
          <Icon type="rotateLeft" />
        </div>
        <div
          className={`${cssPrefix}image-preview-toolbar-action`}
          onClick={() => onRotate(90)}>
          <Icon type="rotateRight" />
        </div>
        <div
          className={`${cssPrefix}image-preview-toolbar-action`}
          onClick={() => onZoom('out')}>
          <Icon type="zoomOut" />
        </div>
        <div
          className={`${cssPrefix}image-preview-toolbar-action`}
          onClick={() => onZoom('in')}>
          <Icon type="zoomIn" />
        </div>
      </div>
    </div>,
    document.body
  );
}

export type ImagePreviewChildren = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export type ImagePreviewGroup = {
  items: string[];
  images: ImageProps[];
};
export function ImagePreviewGroup({ items, images }: ImagePreviewGroup) {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const onClose = () => {
    setShow(false);
  };
  const onNext = () => {
    setIndex(index + 1);
  };
  const onPrev = () => {
    setIndex(index - 1);
  };
  const onItemClick = (i: number) => {
    if (i < items.length - 1) {
      setIndex(i);
      setShow(true);
    }
  };
  return (
    <Fragment>
      {images.map((img, i) => (
        <Image
          preview={false}
          key={img.src}
          {...img}
          onClick={() => onItemClick(i)}
        />
      ))}
      {show && (
        <ImagePreview
          src={items[index]}
          hasNext={index < items.length - 1}
          hasPrev={index > 0}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </Fragment>
  );
}
