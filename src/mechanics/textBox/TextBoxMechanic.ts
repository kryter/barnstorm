export interface TextBoxMechanic {
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
