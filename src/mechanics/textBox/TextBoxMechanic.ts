export interface TextBoxMechanic {
  enterText(selector: string, textToType: string): void;
  verifyTextContent(selector: string, expectedText: string): void;
}
