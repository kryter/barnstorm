import MechanicGroup from '../../MechanicGroup';
import { ListInstrument } from '../list/ListInstrument';
import { Instrument, InstrumentOptions } from '../../Instrument';

export interface ElementInstrumentOptions<TState = void>
  extends InstrumentOptions<TState> {
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
  TState = void,
  TOptions extends ElementInstrumentOptions<TState> = ElementInstrumentOptions<TState>
> implements Instrument<TState>
{
  protected currentState: TState;

  constructor(
    protected mechanicGroup: MechanicGroup,
    protected options: TOptions
  ) {}

  public getId(): string {
    return this.options.id;
  }

  public getState(): TState {
    return this.currentState;
  }

  public setState(nextState: TState): void {
    this.currentState = nextState;
  }

  public verifyState(): void {
    // TODO what can we verify about a element?
  }

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
    this.mechanicGroup.element.verifyIsNotVisible(this.getSelector());
  }

  public verifyTextContent(content: string): void {
    this.mechanicGroup.element.verifyTextContent(this.getSelector(), content);
  }

  public verifyHasClass(className: string): void {
    this.mechanicGroup.element.verifyHasClass(this.getSelector(), className);
  }

  public verifyDoesNotHaveClass(className: string): void {
    this.mechanicGroup.element.verifyDoesNotHaveClass(
      this.getSelector(),
      className
    );
  }

  public verifyIsInFocus(): void {
    this.mechanicGroup.element.verifyIsInFocus(this.getSelector());
  }
}
