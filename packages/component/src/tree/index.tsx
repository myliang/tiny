import { CSSProperties, Fragment, ReactNode, useEffect, useState } from 'react';
import { classNames, cssPrefix } from '../helper';
import Checkbox from '../checkbox';
import Icon from '../icon';
import {
  findNodeKeys,
  findParentNode,
  indeterminateKeys,
  unzipKeys,
  zipKeys,
} from './helper';

export type TreeNodeProps = {
  disabled?: boolean;
  checkable?: boolean;
  key: string;
  title: ReactNode;
  children?: TreeNodeProps[];
};

export type TreeProps = {
  className?: string | string[];
  style?: CSSProperties;
  multiple?: boolean;
  selectedKey?: string;
  checkedKeys?: string[];
  data: TreeNodeProps[];
  onCheck?: (keys: string[]) => void;
  onSelect?: (key: string) => void;
};

export default function Tree({
  data,
  className,
  style,
  multiple,
  selectedKey,
  checkedKeys,
  onSelect,
  onCheck,
}: TreeProps) {
  const [_expandedKeys, setExpandedKeys] = useState(new Set());
  const [_selectedKey, setSelectedKey] = useState(selectedKey);
  const [_checkedKeys, setCheckedKeys] = useState(new Set<string>());
  const [_indeterminateKeys, setIndeterminateKeys] = useState(new Set());

  useEffect(() => {
    const checkedKeySet = unzipKeys(data, checkedKeys);
    // console.log('checked:', checkedKeySet);
    setCheckedKeys(checkedKeySet);
    setSelectedKey(selectedKey);
    if (multiple) {
      if (checkedKeys && checkedKeys.length > 0) {
        const keySet = new Set();
        checkedKeys.forEach((k) => {
          const keys = findNodeKeys(data, k);
          if (keys && keys.length > 1)
            keys.slice(0, -1).forEach((k1) => keySet.add(k1));
        });
        setExpandedKeys(keySet);
        setIndeterminateKeys(indeterminateKeys(data, checkedKeySet));
      }
    } else if (selectedKey) {
      const keys = findNodeKeys(data, selectedKey);
      if (keys && keys.length > 1) {
        setExpandedKeys(new Set(keys.slice(0, -1)));
      }
    }
  }, [multiple, checkedKeys, selectedKey]);

  // expand ..
  const onExpandToggle = (key: string) => {
    const newExpandedKeys = new Set(_expandedKeys);
    if (newExpandedKeys.has(key)) {
      newExpandedKeys.delete(key);
    } else {
      newExpandedKeys.add(key);
    }
    setExpandedKeys(newExpandedKeys);
  };

  const onItemClick = (node: TreeNodeProps) => {
    setSelectedKey(node.key);
    if (onSelect) onSelect(node.key);
  };

  // on check
  const onCheckChange = (node: TreeNodeProps, checked: boolean) => {
    const newCheckedKeys = new Set<string>(_checkedKeys);

    const updateChildrenCheck = (v: boolean, nodes?: TreeNodeProps[]) => {
      if (nodes) {
        nodes.forEach((it) => {
          if (v) {
            newCheckedKeys.add(it.key);
          } else {
            newCheckedKeys.delete(it.key);
          }
          updateChildrenCheck(v, it.children);
        });
      }
    };

    const updateParentCheck = (parentNode: TreeNodeProps | null) => {
      if (!parentNode) return;
      const { children } = parentNode;
      if (!children || children.length === 0) return;

      if (children.every((it) => newCheckedKeys.has(it.key))) {
        newCheckedKeys.add(parentNode.key);
      } else {
        newCheckedKeys.delete(parentNode.key);
      }
      updateParentCheck(findParentNode(data, parentNode.key));
    };

    if (node) {
      if (checked) {
        newCheckedKeys.add(node.key);
        updateChildrenCheck(true, node.children);
      } else {
        newCheckedKeys.delete(node.key);
        updateChildrenCheck(false, node.children);
      }
    }

    // console.log('checkedKeys', newCheckedKeys);
    updateParentCheck(findParentNode(data, node.key));
    setCheckedKeys(newCheckedKeys);
    setIndeterminateKeys(indeterminateKeys(data, newCheckedKeys));

    // console.log('zipKeys', zipKeys(data, newCheckedKeys));
    if (onCheck) onCheck(zipKeys(data, newCheckedKeys));
  };

  const nodeRender = (node: TreeNodeProps, level = 0) => {
    const expanded = _expandedKeys.has(node.key);
    const selected = _selectedKey === node.key;
    const checked = _checkedKeys.has(node.key);
    const indeterminate = _indeterminateKeys.has(node.key);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <Fragment key={node.key}>
        <li
          style={{ paddingLeft: `${level * 20}px` }}
          className={classNames(`${cssPrefix}tree-item`, {
            active: selected,
            disabled: node.disabled,
          })}>
          <div
            className={classNames(`${cssPrefix}tree-item-expand`, {
              disabled: !hasChildren,
            })}
            onClick={() => onExpandToggle(node.key)}>
            {hasChildren && (
              <Icon type={expanded ? 'angleDown' : 'angleRight'} />
            )}
          </div>
          {multiple && (
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={(v) => onCheckChange(node, v)}
            />
          )}
          <div
            className={`${cssPrefix}tree-item-title`}
            onClick={() => onItemClick(node)}>
            {node.title}
          </div>
        </li>
        {hasChildren &&
          expanded &&
          node.children?.map((it) => nodeRender(it, level + 1))}
      </Fragment>
    );
  };

  return (
    <ul className={classNames(`${cssPrefix}tree`, className)} style={style}>
      {data.map((node) => nodeRender(node))}
    </ul>
  );
}
