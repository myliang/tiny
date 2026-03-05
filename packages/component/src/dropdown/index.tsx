import { Overlay, OverlayProps } from '../overlay';

export default function Dropdown(props: OverlayProps) {
  return <Overlay {...props}>{props.children}</Overlay>;
}
