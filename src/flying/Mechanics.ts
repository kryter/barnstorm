import { ButtonMechanic } from "../mechanics/button/ButtonMechanic";
import { CheckboxMechanic } from "../mechanics/checkbox/CheckboxMechanic";
import { ElementMechanic } from "../mechanics/element/ElementMechanic";
import { KeyboardMechanic } from "../mechanics/keyboard/KeyboardMechanic";
import { TextAreaMechanic } from "../mechanics/textArea/TextAreaMechanic";
import { TextBoxMechanic } from "../mechanics/textBox/TextBoxMechanic";
import { UrlMechanic } from "../mechanics/url/UrlMechanic";
import { ListMechanic } from "../mechanics/list/ListMechanic";

/**
 * Before running a test, be sure to populate the mechanics
 * so they are available to the test.
 */
export class Mechanics {
  public static Button: ButtonMechanic = null;

  public static Checkbox: CheckboxMechanic = null;

  public static Element: ElementMechanic = null;

  public static Keyboard: KeyboardMechanic = null;

  public static List: ListMechanic = null;

  public static TextArea: TextAreaMechanic = null;

  public static TextBox: TextBoxMechanic = null;

  public static Url: UrlMechanic = null;
}
