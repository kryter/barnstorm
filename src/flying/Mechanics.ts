import { ButtonMechanic } from '../mechanics/ButtonMechanic';
import { CheckboxMechanic } from '../mechanics/CheckboxMechanic';
import { ElementMechanic } from '../mechanics/ElementMechanic';
import { KeyboardMechanic } from '../mechanics/KeyboardMechanic';
import { TextAreaMechanic } from '../mechanics/TextAreaMechanic';
import { TextBoxMechanic } from '../mechanics/TextBoxMechanic';
import { UrlMechanic } from '../mechanics/UrlMechanic';
import { ListMechanic } from '../mechanics/ListMechanic';

/**
 * Before running a test, be sure to populate the mechanics
 * so they are available to the test.
 */
export class Mechanics {
  public static Button : ButtonMechanic = null;

  public static Checkbox : CheckboxMechanic = null;

  public static Element : ElementMechanic = null;

  public static Keyboard : KeyboardMechanic = null;

  public static List : ListMechanic = null;

  public static TextArea : TextAreaMechanic = null;

  public static TextBox : TextBoxMechanic = null;

  public static Url : UrlMechanic = null;
}
