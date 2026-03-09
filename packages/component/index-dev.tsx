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
  Tabs,
  Radio,
  Checkbox,
} from './src';

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
      <Space compact>
        <Button>Add</Button>
        <Button>delete</Button>
      </Space>
    </Space>
    <Divider />
    <Space>
      <Radio checked>Radio</Radio>
      <Radio.Group
        value="a"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Pear' },
          { value: 'c', label: 'Orange' },
        ]}
      />
      <Radio.Group
        vertical
        value="b"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Pear' },
          { value: 'c', label: 'Orange' },
        ]}
      />
      <Radio.Group
        type="button"
        value="b"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Pear' },
          { value: 'c', label: 'Orange' },
        ]}
      />
    </Space>
    <Divider />
    <Space>
      <Checkbox checked>Checkbox</Checkbox>
      <Checkbox.Group
        value={['a']}
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Pear' },
          { value: 'c', label: 'Orange' },
        ]}
      />
      <Checkbox.Group
        vertical
        value={['a']}
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Pear', indeterminate: true },
          { value: 'c', label: 'Orange' },
        ]}
      />
    </Space>
    <Divider />
    <Dropdown
      menu={{
        items: [
          { key: 'jack', children: 'Jack' },
          { key: 'luck', children: 'Lucy' },
          { key: 'active', children: 'Active' },
          { key: 'disabled', children: 'Disabled', disabled: true },
        ],
      }}>
      <a style={{ width: '80px' }}>Dropdown</a>
    </Dropdown>
    <Divider />
    <Space>
      <Menu
        selectedKey="active"
        style={{ width: '200px' }}
        items={[
          { key: 'jack', children: 'Jack' },
          { key: 'luck', children: 'Lucy' },
          { key: 'active', children: 'Active' },
          { key: 'disabled', children: 'Disabled', disabled: true },
          {
            key: 'group',
            type: 'group',
            label: 'Manager',
            children: [
              { key: 'yuliang', children: 'yuLiang' },
              { key: 'jonson', children: 'Joson' },
            ],
          },
        ]}></Menu>
      <Menu
        type="horizontal"
        selectedKey="lucy"
        style={{ width: '300px' }}
        items={[
          { key: 'jack', children: 'Jack' },
          { key: 'lucy', children: 'Lucy' },
          { key: 'active', children: 'Active' },
          { key: 'disabled', children: 'Disabled', disabled: true },
        ]}
      />
      <Menu
        theme="dark"
        selectedKey="active"
        style={{ width: '200px' }}
        items={[
          { key: 'jack', children: 'Jack' },
          { key: 'lucy', children: 'Lucy' },
          { key: 'active', children: 'Active' },
          { key: 'disabled', children: 'Disabled', disabled: true },
          {
            key: 'submenu-1',
            type: 'submenu',
            label: 'Submenu-1',
            children: [
              { key: 'sub1', children: 'Sub1' },
              { key: 'sub2', children: 'Sub2' },
              { key: 'sub3', children: 'Sub3' },
              { key: 'sub4', children: 'Sub4' },
              { key: 'sub5', children: 'Sub5' },
            ],
          },
        ]}
      />
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
        <p
          style={{
            width: '300px',
            color: '#333',
            border: '1px solid #69b1ff',
            padding: '5px',
          }}>
          ByteDance's core product, Toutiao "Headlines", is a content platform
          in China and around the world. Toutiao started out as a news
          recommendation engine and gradually evolved into a platform delivering
          content in various formats.
        </p>
      </Spin>
    </Space>
    <Divider />
    <Space>
      <Tabs
        style={{ width: '300px', height: '120px' }}
        placement="left"
        selectedKey="t1"
        items={[
          {
            key: 't1',
            label: 'Tab 1',
            children: <div style={{ padding: '20px' }}>tab 1 content</div>,
          },
          {
            key: 't2',
            label: 'Tab 2',
            children: <div style={{ padding: '20px' }}>tab 2 content</div>,
          },
          {
            key: 't3',
            label: 'Tab 3',
            children: <div style={{ padding: '20px' }}>tab 1 content</div>,
          },
          {
            key: 't4',
            label: 'Tab 4',
            children: <div style={{ padding: '20px' }}>tab 2 content</div>,
          },
          {
            key: 't5',
            label: 'Tab 5',
            children: <div style={{ padding: '20px' }}>tab 1 content</div>,
          },
          {
            key: 't6',
            label: 'Tab 6',
            children: <div style={{ padding: '20px' }}>tab 6 content</div>,
          },
        ]}
      />
      <Tabs
        style={{ width: '300px', height: '160px' }}
        selectedKey="t2"
        type="card"
        placement="top"
        editable
        items={[
          {
            key: 't1',
            label: 'Tab 1',
            closable: true,
            children: <div style={{ padding: '20px' }}>tab 1 content</div>,
          },
          {
            key: 't2',
            label: 'Tab 2',
            children: <div style={{ padding: '20px' }}>tab 2 content</div>,
          },
          {
            key: 't3',
            label: 'Tab 3',
            children: <div style={{ padding: '20px' }}>tab 3 content</div>,
          },
          {
            key: 't4',
            label: 'Tab 4',
            children: <div style={{ padding: '20px' }}>tab 4 content</div>,
          },
          {
            key: 't5',
            label: 'Tab 5',
            children: <div style={{ padding: '20px' }}>tab 5 content</div>,
          },
          {
            key: 't6',
            label: 'Tab 6',
            children: <div style={{ padding: '20px' }}>tab 6 content</div>,
          },
        ]}
      />
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
