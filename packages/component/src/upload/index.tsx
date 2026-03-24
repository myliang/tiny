import { CSSProperties, ReactElement, useRef, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import upload from './ajax';
import Icon from '../icon';

export type UploadFile = {
  percent?: number;
  name?: string;
  uid: string;
  url: string;
  status?: 'init' | 'error' | 'done' | 'uploading';
};

export type UploadProps = {
  className?: string | string[];
  style?: CSSProperties;
  type?: 'text' | 'picture';
  disabled?: boolean;
  showFiles?: boolean;
  withCredentials?: boolean;
  data?: Record<string, any>;
  limit?: number;
  accept?: string;
  action: string;
  method?: string;
  headers?: Record<string, any>;
  children?: ReactElement;
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
  onProgress?: (file: UploadFile, evt: ProgressEvent) => void;
  onSuccess?: (file: UploadFile, res: object) => void;
  onError?: (file: UploadFile, evt: ProgressEvent) => void;
};
export default function Upload({
  action,
  headers = {},
  data = {},
  type = 'text',
  value = [],
  className,
  style,
  children,
  disabled,
  showFiles = true,
  limit = 1,
  withCredentials = true,
  accept = '*/*',
  onChange,
  onSuccess,
  onProgress,
  onError,
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useRef<number>(1);
  const [_files, setFiles] = useState<UploadFile[]>(value);

  const updateFiles = (f: UploadFile) => {
    setFiles((files) => {
      const nfiles = files.map((it) => (it.uid === f.uid ? f : it));
      if (onChange) onChange(nfiles);
      return nfiles;
    });
  };

  const onInputClick = () => {
    inputRef.current?.click();
  };

  const onClose = (f: UploadFile) => {
    setFiles((files) => {
      const nfiles = files.filter((it) => it.uid !== f.uid);
      if (onChange) onChange(nfiles);
      return nfiles;
    });
  };

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const reqs: Record<number, XMLHttpRequest> = {};
    let { files } = evt.target;
    if (!files) return;
    if (files.length <= 0) return;
    const uploadFiles: UploadFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadFile: UploadFile = {
        percent: 0,
        name: file.name,
        uid: `n_${uid.current}`,
        url: '',
        status: 'init',
      };
      uploadFiles.push(uploadFile);
      uid.current += 1;

      const req = upload({
        action,
        filename: file.name,
        headers,
        data,
        file,
        withCredentials,
        onProgress: (evt) => {
          uploadFile.status = 'uploading';
          if (evt.total > 0) {
            uploadFile.percent = (evt.loaded / evt.total) * 100;
          }
          updateFiles(uploadFile);
          if (onProgress) onProgress(uploadFile, evt);
        },
        onError: (evt) => {
          uploadFile.status = 'error';
          updateFiles(uploadFile);
          if (onError) onError(uploadFile, evt);
          delete reqs[i];
        },
        onSuccess: (res) => {
          uploadFile.status = 'done';
          uploadFile.percent = 100;
          updateFiles(uploadFile);
          if (onSuccess) onSuccess(uploadFile, res);
          delete reqs[i];
        },
      });
      if (req) reqs[i] = req;
      setFiles((files) => [...files, ...uploadFiles]);
    }
  };

  const input = (
    <input
      type="file"
      onChange={onInputChange}
      multiple={limit > 1}
      accept={accept}
      ref={inputRef}
    />
  );
  const fileRender = (f: UploadFile) => {
    return (
      <div
        className={classNames(`${cssPrefix}upload-item`, f.status)}
        key={f.uid}>
        {type === 'picture' && f.status === 'done' && (
          <div className={classNames(`${cssPrefix}upload-item-thumbnail`)}>
            <img src={f.url} />
          </div>
        )}
        {type === 'text' && (
          <div className={classNames(`${cssPrefix}upload-item-icon`)}>
            <Icon type="paperClip" />
          </div>
        )}
        {type === 'text' && (
          <div className={classNames(`${cssPrefix}upload-item-name`)}>
            {f.name}
          </div>
        )}
        {f.status === 'uploading' && (
          <div
            className={`${cssPrefix}upload-progress ${cssPrefix}upload-percent-${parseInt(f.percent + '')}`}
          />
        )}
        {(f.status === 'done' || f.status === 'error') && (
          <div className={classNames(`${cssPrefix}upload-item-actions`)}>
            <Icon type="close" onClick={() => onClose(f)} />
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={classNames(`${cssPrefix}upload`, className, type, {
        disabled,
      })}
      style={style}>
      {type === 'text' && (
        <div
          className={classNames(`${cssPrefix}upload-trigger`)}
          onClick={onInputClick}>
          {input}
          {children}
        </div>
      )}
      <div className={classNames(`${cssPrefix}upload-list`)}>
        {showFiles && _files.map((f) => fileRender(f))}
        {type === 'picture' && (
          <div
            className={classNames(
              `${cssPrefix}upload-item`,
              `${cssPrefix}upload-trigger`
            )}
            onClick={onInputClick}>
            {input}
            <i>+</i>
          </div>
        )}
      </div>
    </div>
  );
}
