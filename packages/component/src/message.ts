import { h } from '@tiny/table';

let messageWrapper = h('div', 'tiny-messages');
document.body.appendChild(messageWrapper.element());

export default function message(
  type: 'info' | 'success' | 'error' | 'warning',
  html: string,
  fadeTime: number = 3000
) {
  const content = h('div', `tiny-message ${type}`).html(html);
  messageWrapper.append(content);
  setTimeout(() => {
    messageWrapper.remove(content);
  }, fadeTime);
}
