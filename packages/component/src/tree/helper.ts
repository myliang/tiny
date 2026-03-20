import { TreeNodeProps } from '.';

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
