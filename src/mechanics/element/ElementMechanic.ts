export interface ElementMechanic {
  verifyIsNotVisible(selector: string, iFrameSelector?: string): void;
  verifyIsVisible(selector: string, iFrameSelector?: string): void;
  verifyIsNotPresent(selector: string, iFrameSelector?: string): void;
  verifyIsPresent(selector: string, iFrameSelector?: string): void;
  verifyTextContent(
    selector: string,
    content: string,
    iFrameSelector?: string
  ): void;
  verifyHasClass(
    selector: string,
    className: string,
    iFrameSelector?: string
  ): void;
  verifyDoesNotHaveClass(
    selector: string,
    className: string,
    iFrameSelector?: string
  ): void;
  verifyIsInFocus(selector: string, iFrameSelector?: string): void;
  verifyCssProperty(
    selector: string,
    propertyKey: string,
    propertyValue: string,
    iFrameSelector?: string
  ): void;
}
