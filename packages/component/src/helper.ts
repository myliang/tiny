export const cssPrefix = 'tiny-';
export function classNames(
  ...values: Array<undefined | string | string[] | Record<string, any>>
) {
  const classes = [];

  for (let value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string') {
      classes.push(`${value}`);
    } else if (Array.isArray(value)) {
      classes.push(...value);
    } else {
      const mapping = value as Record<string, any>;
      for (let k in mapping) {
        const v = mapping[k];
        if (v) classes.push(`${k}`);
      }
    }
  }
  return classes.join(' ');
}

export function percentageToPixels(
  percentage: string | number,
  parent: HTMLElement
) {
  if (typeof percentage === 'number') return percentage;

  const parentStyle = window.getComputedStyle(parent);
  const flexDirection = parentStyle.flexDirection;

  let parentSize;
  if (flexDirection.startsWith('row')) {
    parentSize = parent.clientWidth;
  } else {
    parentSize = parent.clientHeight;
  }

  const percentValue = parseFloat(percentage + '') / 100;
  return parentSize * percentValue;
}

export function textWidth(
  text: string,
  fontSize: string,
  fontFamily: string = 'inherit'
) {
  const el = document.createElement('span');
  el.style.display = 'inline-block';
  el.style.position = 'absolute';
  el.style.zIndex = '-900';
  el.style.whiteSpace = 'nowrap';
  el.style.fontSize = fontSize;
  el.style.fontFamily = fontFamily;
  el.textContent = text;
  document.body.appendChild(el);
  const width = el.clientWidth;
  document.body.removeChild(el);
  return width;
}
