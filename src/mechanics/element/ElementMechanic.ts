export interface ElementMechanic {
  verifyIsNotVisible(selector: string): void;
  verifyIsVisible(selector: string): void;
  verifyTextContent(selector: string, content: string): void;
  verifyHasClass(selector: string, className: string): void;
  verifyDoesNotHaveClass(selector: string, className: string): void;
  verifyIsInFocus(selector: string): void;
}
