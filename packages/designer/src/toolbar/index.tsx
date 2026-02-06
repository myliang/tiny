import { classNames } from '../helper';
import { ItemBoolean } from './index.boolean';
import { ColorPicker } from './index.color';
import { BorderPicker } from './index.border';
import { TextAlign } from './index.align';
import { FontFamily, FontSize } from './index.font';
import { Style } from '@tiny/table-renderer';

function Divider() {
  return <li className="divider"></li>;
}

export type ToolbarValue = Style;
export interface ToolbarProps {
  value: ToolbarValue;
  fontFamilies: string[];
  fontSizes: string[];
  onChange?: (key: string, value: boolean | string) => void;
}

export function Toolbar({
  value,
  fontSizes,
  fontFamilies,
  onChange,
}: ToolbarProps) {
  return (
    <ul className={classNames('toolbar')}>
      <Divider />
      <FontFamily
        items={fontFamilies}
        value={value['fontFamily'] + ''}
        onSelect={() => {}}
      />
      <Divider />
      <FontSize
        items={fontSizes}
        value={value['fontSize'] + ''}
        onSelect={() => {}}
      />
      <Divider />
      <ItemBoolean type="bold" value={value['bold']} onChange={() => {}} />
      <ItemBoolean type="italic" value={value['italic']} onChange={() => {}} />
      <ItemBoolean
        type="underline"
        value={value['underline']}
        onChange={() => {}}
      />
      <ItemBoolean
        type="strikethrough"
        value={value['strikethrough']}
        onChange={() => {}}
      />
      <ColorPicker type="color" value={value['color']} onChange={onChange} />
      <Divider />
      <ColorPicker
        type="bgcolor"
        value={value['bgcolor']}
        onChange={onChange}
      />
      <BorderPicker />
      <Divider />
      <ItemBoolean
        type="textwrap"
        value={value['textwrap']}
        onChange={() => {}}
      />
      <TextAlign value={value['align']} onSelect={() => {}} />
      <TextAlign vertical value={value['valign']} onSelect={() => {}} />
      <ItemBoolean type="merge" value={false} onChange={() => {}} />
      <Divider />
      <ItemBoolean type="freeze" value={false} onChange={() => {}} />
    </ul>
  );
}
