import { Selector } from '../../instruments/uiElement/Selector';
import { TextAreaMechanic } from './TextAreaMechanic';

export default class TextAreaMechanicMock implements TextAreaMechanic {
  enterText(selector: Selector, textToType: string): void {}

  verifyTextContent(selector: Selector, expectedText: string): void {}
}
