import { createRoot } from 'react-dom/client';
import { Space, Splitter, Button, Divider, Layout, Dropdown } from './src';

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
