import { Selector } from '../../instruments/uiElement/Selector';

export interface ElementMechanic {
  verifyIsNotVisible(selector: Selector): void;
  verifyIsVisible(selector: Selector): void;
  verifyIsNotPresent(selector: Selector): void;
  verifyIsPresent(selector: Selector): void;
  verifyTextContent(selector: Selector, content: string): void;
  verifyHasClass(selector: Selector, className: string): void;
  verifyDoesNotHaveClass(selector: Selector, className: string): void;
  verifyIsInFocus(selector: Selector): void;
  verifyCssProperty(
    selector: Selector,
    propertyKey: string,
    propertyValue: string
  ): void;
}
