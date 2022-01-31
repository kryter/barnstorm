export interface TextAreaMechanic {
  enterText(
    selector: string,
    textToType: string,
    iFrameSelector?: string
  ): void;
  verifyTextContent(
    selector: string,
    expectedText: string,
    iFrameSelector?: string
  ): void;
}
