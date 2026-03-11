import InnerInput, { InputProps } from './input';
import Password, { PasswordProps } from './password';
import Textarea, { TextareaProps } from './textarea';
import InputNumber, { InputNumberProps } from './number';

export type { InputProps, PasswordProps, TextareaProps, InputNumberProps };

type CompoundedComponent = typeof InnerInput & {
  Password: typeof Password;
  Textarea: typeof Textarea;
  Number: typeof InputNumber;
};
const Input = InnerInput as CompoundedComponent;

Input.Password = Password;
Input.Textarea = Textarea;
Input.Number = InputNumber;

export default Input;
