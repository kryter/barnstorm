export interface TextBoxMechanic {
  enterText(selector: string, textToType: string): void;
  verifyText(selector: string, expectedText: string): void;
}
