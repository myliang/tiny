function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export type UploadOption = {
  action: string;
  filename: string;
  method?: 'post';
  file: File;
  onProgress: (evt: ProgressEvent, xhr: XMLHttpRequest) => void;
  onError: (evt: ProgressEvent, xhr: XMLHttpRequest) => void;
  onSuccess: (body: object) => void;
  withCredentials?: boolean;
  headers?: Record<string, any>;
  data?: Record<string, any>;
};

export default function upload({
  action,
  filename = 'file',
  method = 'post',
  file,
  onProgress,
  onError,
  onSuccess,
  withCredentials,
  headers = {},
  data = {},
}: UploadOption) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr = new XMLHttpRequest();

  if (xhr.upload) {
    xhr.upload.onprogress = (e) => {
      onProgress(e, xhr);
    };
  }

  const formData = new FormData();

  if (data) {
    for (let key in data) {
      formData.append(key, data[key]);
    }
  }

  formData.append(filename, file);

  xhr.onerror = (e) => {
    onError(e, xhr);
  };

  xhr.onload = (e) => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(e, xhr);
    }

    onSuccess(getBody(xhr));
  };

  xhr.open(method, action, true);

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
