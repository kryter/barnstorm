import { ButtonMechanic } from './mechanics/button/ButtonMechanic';
import { CheckboxMechanic } from './mechanics/checkbox/CheckboxMechanic';
import { ElementMechanic } from './mechanics/element/ElementMechanic';
import { KeyboardMechanic } from './mechanics/keyboard/KeyboardMechanic';
import { TextAreaMechanic } from './mechanics/textArea/TextAreaMechanic';
import { TextBoxMechanic } from './mechanics/textBox/TextBoxMechanic';
import { UrlMechanic } from './mechanics/url/UrlMechanic';
import { ListMechanic } from './mechanics/list/ListMechanic';

export default interface MechanicsSet {
  button?: ButtonMechanic;
  checkbox?: CheckboxMechanic;
  element?: ElementMechanic;
  keyboard?: KeyboardMechanic;
  list?: ListMechanic;
  textArea?: TextAreaMechanic;
  textBox?: TextBoxMechanic;
  url?: UrlMechanic;
}
