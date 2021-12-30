import { ElementMechanic } from './ElementMechanic';

export default class ElementMechanicDefault implements ElementMechanic {
  verifyIsNotVisible(selector: string): void {}

  verifyTextContent(selector: string, content: string): void {}

  verifyHasClass(selector: string, className: string): void {}

  verifyDoesNotHaveClass(selector: string, className: string): void {}

  verifyIsInFocus(selector: string): void {}
}
