import { Designer } from './src';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error('找不到 #root 元素');
}
const root = createRoot(container);

root.render(<Designer width={() => 1200} height={() => 500} />);
