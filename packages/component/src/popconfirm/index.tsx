import { CSSProperties, ReactElement, ReactNode, useRef } from 'react';
import { Overlay, OverlayMethods, Placement } from '../overlay';
import { Trigger } from '../overlay/helper';
import { classNames, cssPrefix } from '../helper';
import Button from '../button';
import Icon from '../icon';

export type PopconfirmProps = {
  className?: string | string[];
  style?: CSSProperties;
  children: ReactElement;
  placement?: Placement;
  trigger?: Trigger;
  title: ReactNode;
  content?: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
};

export default function Popconfirm({
  className,
  style,
  trigger = 'click',
  placement = 'auto',
  children,
  title,
  content,
  okText = 'OK',
  cancelText = 'Cancel',
  onOk,
  onCancel,
  ...restProps
}: PopconfirmProps) {
  const overlayRef = useRef<OverlayMethods>(null);
  const onBtnCancel = () => {
    overlayRef.current?.setShow(false);
    if (onCancel) onCancel();
  };
  const onBtnOk = () => {
    overlayRef.current?.setShow(false);
    if (onOk) onOk();
  };
  return (
    <Overlay
      ref={overlayRef}
      trigger={trigger}
      placement={placement}
      width="auto"
      content={
        <div className={classNames(`${cssPrefix}popconfirm`)}>
          <div className={classNames(`${cssPrefix}popconfirm-icon`)}>
            <Icon type="exclamation" />
          </div>
          <div className={classNames(`${cssPrefix}popconfirm-body`)}>
            <div className={classNames(`${cssPrefix}popconfirm-title`)}>
              {title}
            </div>
            {content && (
              <div className={classNames(`${cssPrefix}popconfirm-content`)}>
                {content}
              </div>
            )}
            <div className={classNames(`${cssPrefix}popconfirm-actions`)}>
              <Button size="small" onClick={onBtnCancel}>
                {cancelText}
              </Button>
              <Button
                size="small"
                onClick={onBtnOk}
                variant="filled"
                color="primary">
                {okText}
              </Button>
            </div>
          </div>
        </div>
      }
      {...restProps}>
      {children}
    </Overlay>
  );
}
