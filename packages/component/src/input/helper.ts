export function numberFormatter(value: string | number) {
  const [start, end] = `${value}`.split('.') || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${end ? `${v}.${end}` : `${v}`}`;
}
export function numberParser(txt: string) {
  return parseFloat(txt?.replace(/\s?|(,*)/g, ''));
}

function numberToInt(a: number, scale: number) {
  return Math.round(a * Math.pow(10, scale));
}

export function numberAdd(a: number, b: number, scale: number) {
  const result = numberToInt(a, scale) + numberToInt(b, scale);
  return result / Math.pow(10, scale);
}
