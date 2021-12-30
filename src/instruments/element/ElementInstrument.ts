import MechanicsSet from '../../MechanicsSet';
import { ListInstrument } from '../list/ListInstrument';

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
  constructor(
    protected mechanicsSet: MechanicsSet,
    protected options: TOptions
  ) {}

  public getSelector(): string {
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
    this.mechanicsSet.element.verifyIsNotVisible(this.getSelector());
  }

  public verifyTextContent(content: string): void {
    this.mechanicsSet.element.verifyTextContent(this.getSelector(), content);
  }

  public verifyHasClass(className: string): void {
    this.mechanicsSet.element.verifyHasClass(this.getSelector(), className);
  }

  public verifyDoesNotHaveClass(className: string): void {
    this.mechanicsSet.element.verifyDoesNotHaveClass(
      this.getSelector(),
      className
    );
  }

  public verifyIsInFocus(): void {
    this.mechanicsSet.element.verifyIsInFocus(this.getSelector());
  }
}
