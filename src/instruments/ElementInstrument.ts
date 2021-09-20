import { Mechanics } from "../flying/Mechanics";

export interface ElementInstrumentOptions {
  /**
   * CSS selector to get the HTML element.
   */
  selector: string;
}

export class ElementInstrument<TOptions extends ElementInstrumentOptions = ElementInstrumentOptions> {
  constructor(protected options: TOptions) {
  }

  public verifyIsNotVisible(): void {
    Mechanics.Element.verifyIsNotVisible(this.options.selector);
  }

  public verifyTextContent(content: string): void {
    Mechanics.Element.verifyTextContent(this.options.selector, content);
  }

  public verifyIsInFocus(): void {
    Mechanics.Element.verifyIsInFocus(this.options.selector);
  }
}
