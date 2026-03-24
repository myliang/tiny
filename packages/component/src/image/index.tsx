import InnerImage from './image';
import { ImagePreviewGroup } from './preview';

type CompoundedComponent = typeof InnerImage & {
  PreviewGroup: typeof ImagePreviewGroup;
};
const Image = InnerImage as CompoundedComponent;
Image.PreviewGroup = ImagePreviewGroup;

export default Image;
