import { ButtonMechanic } from './mechanics/button/ButtonMechanic';
import { CheckboxMechanic } from './mechanics/checkbox/CheckboxMechanic';
import { ElementMechanic } from './mechanics/element/ElementMechanic';
import { KeyboardMechanic } from './mechanics/keyboard/KeyboardMechanic';
import { TextAreaMechanic } from './mechanics/textArea/TextAreaMechanic';
import { TextBoxMechanic } from './mechanics/textBox/TextBoxMechanic';
import { UrlMechanic } from './mechanics/url/UrlMechanic';
import { ListMechanic } from './mechanics/list/ListMechanic';
import { LogMechanic } from './mechanics/log/LogMechanic';

export default interface MechanicGroup {
  button?: ButtonMechanic;
  checkbox?: CheckboxMechanic;
  element?: ElementMechanic;
  keyboard?: KeyboardMechanic;
  log?: LogMechanic;
  list?: ListMechanic;
  textArea?: TextAreaMechanic;
  textBox?: TextBoxMechanic;
  url?: UrlMechanic;
}
