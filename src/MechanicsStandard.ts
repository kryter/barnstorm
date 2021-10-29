import { Mechanics } from './Mechanics';
import ButtonMechanicStandard from './mechanics/button/ButtonMechanicStandard';
import CheckboxMechanicStandard from './mechanics/checkbox/CheckboxMechanicStandard';
import ElementMechanicStandard from './mechanics/element/ElementMechanicStandard';
import KeyboardMechanicStandard from './mechanics/keyboard/KeyboardMechanicStandard';
import ListMechanicStandard from './mechanics/list/ListMechanicStandard';
import TextAreaMechanicStandard from './mechanics/textArea/TextAreaMechanicStandard';
import TextBoxMechanicStandard from './mechanics/textBox/TextBoxMechanicStandard';
import UrlMechanicStandard from './mechanics/url/UrlMechanicStandard';

let isRegistered: boolean = false;

/**
 * Provides the standard for how mechanics are expected to behave.
 *
 * These "standard" mechanics will all track state appropriate for the control
 * they know how to work with, but do not communicate with any actual controls.
 *
 * These "standard" mechanics assume that all passed in css selectors are valid.
 *
 * These "standard" mechanics are used in unit tests to make sure flight instruments
 * are operating correctly.
 */
export function register(): void {
  if (isRegistered) {
    return;
  }

  Mechanics.Button = new ButtonMechanicStandard();
  Mechanics.Checkbox = new CheckboxMechanicStandard();
  Mechanics.Element = new ElementMechanicStandard();
  Mechanics.Keyboard = new KeyboardMechanicStandard();
  Mechanics.List = new ListMechanicStandard();
  Mechanics.TextArea = new TextAreaMechanicStandard();
  Mechanics.TextBox = new TextBoxMechanicStandard();
  Mechanics.Url = new UrlMechanicStandard();

  isRegistered = true;
}
