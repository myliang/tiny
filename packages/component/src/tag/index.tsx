import { ReactNode, CSSProperties, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Icon from '../icon';

export type TagProps = {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactNode;
  variant?: 'filled' | 'outlined';
  color?: 'default' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  closable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClose?: (evt: React.MouseEvent) => void;
};

export default function Tag({
  className,
  style,
  children,
  variant = 'filled',
  color,
  disabled = false,
  closable = false,
  checkable = false,
  checked = false,
  onChange,
  onClose,
}: TagProps) {
  const [show, setShow] = useState(true);
  const onCloser = (evt: React.MouseEvent) => {
    if (onClose) onClose(evt);
    setShow(false);
  };
  const nStyle = Object.assign({}, style);
  return (
    show && (
      <div
        className={classNames(
          `${cssPrefix}tag`,
          variant,
          color,
          { disabled, checked },
          className
        )}
        style={nStyle}>
        {children}
        {closable && (
          <div className={`${cssPrefix}tag-close`}>
            <Icon type="close" onClick={onCloser} />
          </div>
        )}
      </div>
    )
  );
}
