import { Mechanics } from '../../flying/Mechanics';
import { ListInstrument } from "../list/ListInstrument";

export interface ElementInstrumentOptions {
  /**
   * Optional: List instrument that provides
   * the parent CSS selector for this HTML element.
   */
  listInstrument?: ListInstrument;

  /**
   * Optional: 1 based number of the item in the list instrument
   * (used if list instrument is provided).
   */
  itemNumber?: number;

  /**
   * CSS selector to get the HTML element.
   */
  selector: string;
}

export class ElementInstrument<
  TOptions extends ElementInstrumentOptions = ElementInstrumentOptions
> {
  constructor(protected options: TOptions) {}

  protected getSelector(): string {
    if (this.options.listInstrument) {
      const { listInstrument } = this.options;
      const itemSelector = listInstrument.listItemSelectorByNumber(
        this.options.itemNumber
      );
      return `${itemSelector} ${this.options.selector}`;
    }
    return this.options.selector;
  }

  public verifyIsNotVisible(): void {
    Mechanics.Element.verifyIsNotVisible(this.getSelector());
  }

  public verifyTextContent(content: string): void {
    Mechanics.Element.verifyTextContent(this.getSelector(), content);
  }

  public verifyHasClass(className: string): void {
    Mechanics.Element.verifyHasClass(this.getSelector(), className);
  }

  public verifyDoesNotHaveClass(className: string): void {
    Mechanics.Element.verifyDoesNotHaveClass(this.getSelector(), className);
  }

  public verifyIsInFocus(): void {
    Mechanics.Element.verifyIsInFocus(this.getSelector());
  }
}
