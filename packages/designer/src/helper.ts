export const cssPrefix = 'tiny-designer-';
export function classNames(...values: Array<string | Record<string, any>>) {
  const classes = [];

  for (let value of values) {
    if (typeof value === 'string') {
      classes.push(`${cssPrefix}${value}`);
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
