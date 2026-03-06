import { createRoot } from 'react-dom/client';
import {
  Space,
  Splitter,
  Button,
  Divider,
  Layout,
  Dropdown,
  Menu,
  Pagination,
  Spin,
} from './src';
import { useState } from 'react';

const container = document.getElementById('root');

if (!container) {
  throw new Error('找不到 #root 元素');
}
const root = createRoot(container);

root.render(
  <div style={{ padding: '20px' }}>
    <Space>
      <Button type="primary" loading>
        Primary
      </Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
    <Divider />
    <Dropdown
      content={
        <ul style={{ width: '100px' }}>
          <li>l1</li>
          <li>l2</li>
        </ul>
      }>
      <div style={{ width: '80px' }}>Dropdown</div>
    </Dropdown>
    <Divider />
    <Space>
      <Menu selectedKey="active" style={{ width: '200px' }}>
        <Menu.Item key="jack">Jack</Menu.Item>
        <Menu.Item key="lucy">Lucy</Menu.Item>
        <Menu.Item key="active">Active</Menu.Item>
        <Menu.Item key="disabled" disabled>
          Disabled
        </Menu.Item>
      </Menu>
      <Menu mode="horizontal" selectedKey="lucy" style={{ width: '300px' }}>
        <Menu.Item key="jack">Jack</Menu.Item>
        <Menu.Item key="lucy">Lucy</Menu.Item>
        <Menu.Item key="disabled" disabled>
          Disabled
        </Menu.Item>
      </Menu>
      <Menu theme="dark" selectedKey="active" style={{ width: '200px' }}>
        <Menu.Item key="jack">Jack</Menu.Item>
        <Menu.Item key="lucy">Lucy</Menu.Item>
        <Menu.Item key="active">Active</Menu.Item>
        <Menu.Item key="disabled" disabled>
          Disabled
        </Menu.Item>
        <Menu.SubMenu key="submenu" label="SubMenu">
          <Menu.Item key="sub1">Sub1</Menu.Item>
          <Menu.Item key="sub2">Sub2</Menu.Item>
          <Menu.Item key="sub3">Sub3</Menu.Item>
          <Menu.Item key="sub4">Sub4</Menu.Item>
          <Menu.Item key="sub5">Sub5</Menu.Item>
          <Menu.Item key="sub6">Sub6</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Space>
    <Divider />
    <Space>
      <Pagination current={1} total={500} rows={20} />
      <Pagination current={1} total={500} rows={20} simple />
    </Space>
    <Divider />
    <Space>
      <Spin loading />
      <Spin loading size="large">
        <p style={{ width: '300px', color: '#333' }}>
          ByteDance's core product, Toutiao "Headlines", is a content platform
          in China and around the world. Toutiao started out as a news
          recommendation engine and gradually evolved into a platform delivering
          content in various formats.
        </p>
      </Spin>
    </Space>
    <Divider />
    <Layout>
      <Layout.Header style={{ height: '100px', background: '#69b1ff' }}>
        Header
      </Layout.Header>
      <Layout.Content>
        <Layout>
          <Layout.Sider
            width={200}
            style={{ height: '200px', background: '#bae0ff' }}>
            Sider
          </Layout.Sider>
          <Layout.Content
            style={{ height: '200px', background: 'rgba(0, 0, 0, 0.06)' }}>
            Content
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
    <Divider />
    <Splitter style={{ height: '400px', width: '1000px' }}>
      <Splitter.Panel size="20%">abc</Splitter.Panel>
      <Splitter.Panel>
        <Splitter vertical>
          <Splitter.Panel size="30%">Top</Splitter.Panel>
          <Splitter.Panel size="70%">Content</Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  </div>
);
