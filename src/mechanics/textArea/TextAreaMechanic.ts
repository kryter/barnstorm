export interface TextAreaMechanic {
  enterText(selector: string, textToType: string): void;
  verifyText(selector: string, expectedText: string): void;
}
