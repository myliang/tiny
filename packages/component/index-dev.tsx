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
  Input,
  Tag,
  Select,
  Calendar,
  YearPicker,
  MonthPicker,
  DatePicker,
  Tree,
  Popconfirm,
  message,
  Upload,
  Image,
  Card,
  Table,
} from './src';

const container = document.getElementById('root');

if (!container) {
  throw new Error('找不到 #root 元素');
}
const root = createRoot(container);

root.render(
  <div style={{ padding: '20px' }}>
    <Space vertical>
      <Space>
        <Button>Default</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="outlined">Outline</Button>
        <Button variant="text">Text</Button>
        <Space.Compact>
          <Button>Add</Button>
          <Button>delete</Button>
        </Space.Compact>
      </Space>
      <Space>
        <Button color="primary">Primary</Button>
        <Button color="primary" variant="dashed">
          Dashed
        </Button>
        <Button color="primary" variant="outlined">
          Outlined
        </Button>
      </Space>
    </Space>
    <Divider />
    <Space>
      <Tag>tag</Tag>
      <Tag closable>tag-close</Tag>
      <Tag variant="outlined" closable>
        tag-close
      </Tag>
      <Tag color="success">tag</Tag>
      <Tag color="warning">tag</Tag>
      <Tag color="error">tag</Tag>
      <Tag color="success" variant="outlined">
        tag
      </Tag>
      <Tag color="warning" variant="outlined">
        tag
      </Tag>
      <Tag color="error" variant="outlined">
        tag
      </Tag>
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
    <Space vertical>
      <Space>
        <Input placeholder="...abc" style={{ width: '160px' }} clearable />
        <Input placeholder="...abc" style={{ width: '160px' }} loading />
        <Input
          variant="borderless"
          style={{ width: '160px' }}
          placeholder="...abc"
        />
        <Input
          variant="underlined"
          style={{ width: '160px' }}
          placeholder="...abc"
        />
        <Input
          variant="filled"
          style={{ width: '160px' }}
          placeholder="...abc"
        />
      </Space>
      <Space>
        <Input prefix="￥" clearable placeholder="ab" disabled />
        <Input prefix="￥" suffix="RMB" placeholder="ab" />
        <Input
          variant="underlined"
          prefix="￥"
          suffix="RMB"
          placeholder="ab"
          status="error"
        />
        <Input.Password />
      </Space>
      <Space>
        <Input.Textarea />
        <Input.Number value="100000.25" step={1.1} />
        <Input.Number variant="filled" value="100000.25" step={1.1} />
        <Input.Number variant="underlined" value="100000.25" step={1.1} />
        <Input.Number variant="borderless" value="100000.25" step={1.1} />
      </Space>
    </Space>
    <Divider />
    <Space>
      <Dropdown
        menu={{
          items: [
            { key: 'jack', children: 'Jack' },
            { key: 'luck', children: 'Lucy' },
            { key: 'active', children: 'Active' },
            { key: 'disabled', children: 'Disabled', disabled: true },
          ],
        }}>
        <Button style={{ width: 120 }}>Dropdown</Button>
      </Dropdown>
      <Popconfirm
        title="Confirm"
        content="Are you sure you want to delete?"
        onOk={() => message('success', 'warning', 100000)}>
        <Button>Delete</Button>
      </Popconfirm>
    </Space>
    <Divider />
    <Space>
      <Image
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        alt="lamp"
      />
      <Image.PreviewGroup
        images={[
          {
            width: 200,
            src: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
          },
        ]}
        items={[
          'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
          'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        ]}></Image.PreviewGroup>
    </Space>
    <Divider />
    <Card style={{ width: 300 }} title="department" extra="more">
      Department content
    </Card>
    <Divider />
    <Table
      bordered
      columns={[
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Salary',
          key: 'salary',
        },
        {
          title: 'Address',
          key: 'address',
        },
        {
          title: 'Email',
          key: 'email',
        },
      ]}
      data={[
        {
          key: '1',
          name: 'Jane Doe',
          salary: 23000,
          address: '32 Park Road, London',
          email: 'jane.doe@example.com',
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
        {
          key: '3',
          name: 'Kevin Sandra',
          salary: 22000,
          address: '31 Park Road, London',
          email: 'kevin.sandra@example.com',
        },
        {
          key: '4',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
        },
      ]}
    />
    <Divider />
    <Space>
      <Upload
        action=""
        showFiles={false}
        value={[
          {
            uid: '1',
            name: 'xxx.png',
            status: 'uploading',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
            percent: 33,
          },
        ]}>
        <Button>Upload</Button>
      </Upload>
      <div style={{ width: 500 }}>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          value={[
            {
              uid: '1',
              name: 'xxx.png',
              status: 'uploading',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
              percent: 33,
            },
            {
              uid: '2',
              name: 'yyy.png',
              status: 'done',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
            },
            {
              uid: '3',
              name: 'zzz.png',
              status: 'error',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
            },
          ]}>
          <Button>Upload</Button>
        </Upload>
      </div>
      <Upload
        action=""
        type="picture"
        value={[
          {
            uid: '1',
            name: 'xxx.png',
            status: 'uploading',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
            percent: 33,
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
          },
        ]}>
        <Button>Upload</Button>
      </Upload>
    </Space>
    <Divider />
    <Space>
      <Select
        style={{ width: '300px' }}
        placeholder="select user"
        clearable
        searchable
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'luck', label: 'Luck' },
          {
            label: 'Group',
            options: [
              { value: 'jon', label: 'Jon' },
              { value: 'abcd', label: 'Abcd' },
              { value: 'yuliang', label: 'yuliang' },
            ],
          },
        ]}
      />
      <Select
        style={{ width: '300px' }}
        placeholder="select user"
        multiple
        clearable
        searchable
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'luck', label: 'Luck' },
          {
            label: 'Group',
            options: [
              { value: 'luck1', label: 'Luck-1' },
              { value: 'luck2', label: 'Luck-2' },
              { value: 'luck3', label: 'Luck-3' },
            ],
          },
        ]}
      />
      <Select.Tree
        style={{ width: 200 }}
        popupStyle={{ maxHeight: 300 }}
        value="0-0-0-1"
        data={[
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0', disabled: true },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0' },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              {
                title: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          },
          {
            title: '0-2',
            key: '0-2',
          },
        ]}
      />
      <Select.Tree
        multiple
        style={{ width: 300 }}
        popupStyle={{ minWidth: 300, maxHeight: 300 }}
        value="0-0-0-1"
        data={[
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0', disabled: true },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0' },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              {
                title: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          },
          {
            title: '0-2',
            key: '0-2',
          },
        ]}
      />
    </Space>
    <Divider />
    <Space>
      <YearPicker />
      <MonthPicker />
      <DatePicker variant="filled" />
    </Space>
    <Divider />
    <Space>
      <Tree
        multiple
        selectedKey="0-0-0-1"
        checkedKeys={['0-0-0-1', '0-0-1']}
        data={[
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0', disabled: true },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0' },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              {
                title: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          },
          {
            title: '0-2',
            key: '0-2',
          },
        ]}
      />
    </Space>
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
      <Pagination
        current={1}
        total={500}
        rows={20}
        simple
        style={{ width: '100%' }}
      />
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
    <Calendar />
    <Divider />
    <Space>
      <Tabs
        style={{ width: '300px', height: '120px' }}
        placement="left"
        selectedKey="t1"
        items={[
          {
            key: 't1',
            label: '全部',
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
            label: '处理中',
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
