import { Selector } from '../../instruments/uiElement/Selector';

export interface TextAreaMechanic {
  enterText(selector: Selector, textToType: string): void;
  verifyTextContent(selector: Selector, expectedText: string): void;
}
