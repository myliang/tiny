import './style.index.less';
import Layout from './layout';
import { Row, Col } from './grid';
import Button from './button';
import Space from './space';
import Divider from './divider';
import Splitter from './splitter';
import Dropdown from './dropdown';
import Menu from './menu/index';
import Pagination from './pagination';
import Spin from './spin';
import Tabs from './tabs';
import { useEffect, useState } from 'react';

function Test() {
  const [count, setCount] = useState(0);
  const clicker = () => {
    console.log('>>>', count);
    setCount(count + 1);
  };
  useEffect(() => {
    console.log('count:', count);
  }, []);
  return (
    <div>
      <button onClick={clicker}>add {count}</button>
      <div>{count}</div>
    </div>
  );
}

export {
  Test,
  Layout,
  Button,
  Row,
  Col,
  Space,
  Divider,
  Splitter,
  Dropdown,
  Menu,
  Pagination,
  Spin,
  Tabs,
};
