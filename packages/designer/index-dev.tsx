import { useState } from 'react';
import { Toolbar } from './src';
import { createRoot } from 'react-dom/client';

function App() {
  const onChange = (key: string, value: boolean | string) => {
    console.log('key:', key, ', value: ', value);
  };
  return (
    <Toolbar
      value={{
        color: '#333333',
        align: 'left',
        valign: 'middle',
        textwrap: false,
        underline: false,
        strikethrough: false,
        bold: false,
        italic: false,
        fontSize: 12,
        fontFamily: 'Lato',
      }}
      onChange={onChange}></Toolbar>
  );
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('找不到 #root 元素');
}
const root = createRoot(container);
root.render(<App />);
