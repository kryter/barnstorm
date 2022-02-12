import { Selector } from '../../instruments/uiElement/Selector';
import { ElementMechanic } from './ElementMechanic';

export default class ElementMechanicMock implements ElementMechanic {
  verifyIsVisible(selector: Selector): void {}

  verifyIsNotVisible(selector: Selector): void {}

  verifyIsPresent(selector: Selector): void {}

  verifyIsNotPresent(selector: Selector): void {}

  verifyTextContent(selector: Selector, content: string): void {}

  verifyHasClass(selector: Selector, className: string): void {}

  verifyDoesNotHaveClass(selector: Selector, className: string): void {}

  verifyIsInFocus(selector: Selector): void {}

  verifyCssProperty(
    selector: Selector,
    propertyKey: string,
    propertyValue: string
  ): void {}
}
