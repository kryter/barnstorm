import { Selector } from '../../instruments/uiElement/Selector';

export interface TextBoxMechanic {
  enterText(selector: Selector, textToType: string): void;
  verifyTextContent(selector: Selector, expectedText: string): void;
}
