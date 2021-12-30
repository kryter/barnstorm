import { TextAreaMechanic } from './TextAreaMechanic';

export default class TextAreaMechanicMock implements TextAreaMechanic {
  enterText(selector: string, textToType: string): void {}

  verifyText(selector: string, expectedText: string): void {}
}
