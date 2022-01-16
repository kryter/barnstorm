export interface TextAreaMechanic {
  enterText(selector: string, textToType: string): void;
  verifyTextContent(selector: string, expectedText: string): void;
}
