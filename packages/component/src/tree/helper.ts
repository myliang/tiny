import { TreeNodeProps } from '.';

// [0, 0-1, 0-1-1, 0-1-1-1]
export function findNodeKeys(
  nodes: TreeNodeProps[],
  key: string,
  keys: string[] = []
): string[] | null {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const newKeys = [...keys, node.key];
    if (node.key === key) {
      return newKeys;
    }
    if (node.children && node.children.length > 0) {
      const ret = findNodeKeys(node.children, key, newKeys);
      if (ret) return ret;
    }
  }
  return null;
}

export function findParentNode(
  nodes: TreeNodeProps[],
  key: string,
  parent: TreeNodeProps | null = null
): TreeNodeProps | null {
  for (let node of nodes) {
    if (node.key === key) return parent;
    if (node.children) {
      const found = findParentNode(node.children, key, node);
      if (found) return found;
    }
  }
  return null;
}

export function findNodes(
  nodes: TreeNodeProps[],
  keys: Set<string>
): TreeNodeProps[] {
  const nNodes: TreeNodeProps[] = [];
  for (let node of nodes) {
    if (keys.has(node.key)) {
      nNodes.push(node);
    } else if (node.children) {
      nNodes.push(...findNodes(node.children, keys));
    }
  }
  return nNodes;
}

export function indeterminateKeys(
  nodes: TreeNodeProps[],
  checkedKeys: Set<string>
) {
  const keys = new Set();

  const processNode = (
    node: TreeNodeProps
  ): { checked: boolean; indeterminate: boolean } => {
    if (!node.children || node.children.length === 0) {
      return {
        checked: checkedKeys.has(node.key),
        indeterminate: false,
      };
    }
    const status = node.children.map((it) => processNode(it));
    const checkedCount = status.filter((it) => it.checked).length;
    const indeterminateCount = status.filter((it) => it.indeterminate).length;
    const count = node.children.length;
    const indeterminate =
      (checkedCount > 0 && checkedCount < count) || indeterminateCount > 0;
    const checked = checkedCount === count;

    if (indeterminate) {
      keys.add(node.key);
    }
    return {
      indeterminate,
      checked,
    };
  };

  for (let node of nodes) processNode(node);
  return keys;
}

export function unzipKeys(nodes: TreeNodeProps[], keys?: string[]) {
  const keySet = new Set<string>(keys);

  const processNode = ({ key, children }: TreeNodeProps) => {
    if (children && children.length > 0) {
      children.forEach((it) => {
        if (keySet.has(key)) {
          keySet.add(it.key);
        }
        processNode(it);
      });
    }
  };

  for (let node of nodes) processNode(node);
  return keySet;
}

export function zipKeys(nodes: TreeNodeProps[], keySet: Set<string>) {
  const keys: Set<string> = new Set(keySet);

  if (keySet.size > 1) {
    const processNode = ({ key, children }: TreeNodeProps) => {
      if (children && children.length > 0) {
        children.forEach((it) => {
          if (keySet.has(key)) {
            keys.delete(it.key);
          }
          processNode(it);
        });
      }
    };
    for (let node of nodes) processNode(node);
  }

  return [...keys];
}
