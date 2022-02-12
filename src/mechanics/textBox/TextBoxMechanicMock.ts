import { Selector } from '../../instruments/uiElement/Selector';
import { TextBoxMechanic } from './TextBoxMechanic';

export default class TextBoxMechanicMock implements TextBoxMechanic {
  enterText(selector: Selector, textToType: string): void {}

  verifyTextContent(selector: Selector, expectedText: string): void {}
}
