import { CSSProperties, forwardRef, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import { ImagePreview } from './preview';

export type ImageProps = {
  className?: string | string[];
  style?: CSSProperties;
  alt?: string;
  height?: number | 'auto';
  width?: number;
  padding?: number;
  preview?: boolean;
  src: string;
  onClick?: () => void;
};

const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      className,
      style,
      alt,
      height = 'auto',
      width = 200,
      preview = true,
      src,
      onClick,
    },
    ref
  ) => {
    const [showPreview, setShowPreview] = useState(false);
    const _onClick = () => {
      if (onClick) {
        onClick();
      }
      if (preview) {
        setShowPreview(true);
      }
    };
    return (
      <>
        <div
          ref={ref}
          className={classNames(`${cssPrefix}image`, className)}
          style={Object.assign({}, style)}
          onClick={_onClick}>
          <img
            tabIndex={0}
            src={src}
            alt={alt}
            style={Object.assign({}, { width, height })}
          />
        </div>
        {preview && showPreview && (
          <ImagePreview src={src} onClose={() => setShowPreview(false)} />
        )}
      </>
    );
  }
);

export default Image;
