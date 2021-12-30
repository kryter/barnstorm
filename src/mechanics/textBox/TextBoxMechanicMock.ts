import { TextBoxMechanic } from './TextBoxMechanic';

export default class TextBoxMechanicMock implements TextBoxMechanic {
  enterText(selector: string, textToType: string): void {}

  verifyText(selector: string, expectedText: string): void {}
}
