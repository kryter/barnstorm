export interface ElementMechanic {
  verifyIsNotVisible(selector: string): void;
  verifyTextContent(selector: string, content: string): void;
  verifyIsInFocus(selector: string): void;
}
