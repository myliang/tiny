export type Placement =
  | 'auto'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'leftBottom'
  | 'leftTop'
  | 'right'
  | 'rightBottom'
  | 'rightTop';

/**
 *
 * @returns [left, top]
 */
export function position(
  placement: Placement,
  {
    clientHeight,
    clientWidth,
    scrollLeft,
    scrollTop,
  }: {
    clientHeight: number;
    clientWidth: number;
    scrollTop: number;
    scrollLeft: number;
  },
  target: {
    width: number;
    height: number;
    top: number;
    left: number;
  },
  content: { width: number; height: number },
  scrollWidth: number = 15,
  space: number = 2
): Array<number> {
  let nLeft = 0;
  let nTop = 0;
  const tw = target.left + target.width + content.width + scrollWidth;
  const th = target.top + target.height + content.height + scrollWidth;
  const cw = clientWidth + scrollLeft;
  const ch = clientHeight + scrollTop;
  if (placement === 'auto') {
    placement = `${th > ch ? 'top' : 'bottom'}${tw > cw ? 'Right' : 'Left'}`;
  }
  if (placement.startsWith('bottom') || placement.startsWith('top')) {
    nTop = target.top + target.height + space;
    if (placement.startsWith('top')) {
      nTop = target.top - content.height - space;
    }

    nLeft = target.left + target.width / 2 - content.width / 2;
    if (placement.endsWith('Right')) {
      nLeft = target.left + target.width - content.width;
    } else if (placement.endsWith('Left')) {
      nLeft = target.left;
    }
  } else if (placement.startsWith('left') || placement.startsWith('right')) {
    nLeft = target.left - content.width - space;
    if (placement.startsWith('right')) {
      nLeft = target.left + target.width + space;
    }
    nTop = target.top + target.height / 2 - content.height / 2;
    if (placement.endsWith('Bottom')) {
      nTop = target.top;
    } else if (placement.endsWith('Top')) {
      nTop = target.top + target.height - content.height;
    }
  }
  return [nLeft, nTop];
}
