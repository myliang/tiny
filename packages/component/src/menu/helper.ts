import { ReactNode, Children, isValidElement, cloneElement } from 'react';

export function processChildren(children: ReactNode) {
  return Children.map(children, (it, index) => {
    if (isValidElement(it)) {
      const nProps = {
        ...(it.props || {}),
        _key: it.key || `menu-item-${index}`,
      };
      return cloneElement(it, nProps);
    }
    return it;
  });
}
