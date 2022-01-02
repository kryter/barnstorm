import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../../Instrument';
import { InstrumentOptions } from '../../InstrumentOptions';

export interface ElementInstrumentOptions<TState = void>
  extends InstrumentOptions<TState> {
  /**
   * CSS selector to get the HTML element.
   */
  selector: string;
}

export abstract class ElementInstrument<
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

  public setState(nextState: TState): void {
    this.currentState = nextState;
  }

  public abstract verifyState(): void;

  public verifyIsNotVisible(): void {
    this.mechanicGroup.element.verifyIsNotVisible(this.options.selector);
  }

  public verifyTextContent(content: string): void {
    this.mechanicGroup.element.verifyTextContent(
      this.options.selector,
      content
    );
  }

  public verifyHasClass(className: string): void {
    this.mechanicGroup.element.verifyHasClass(this.options.selector, className);
  }

  public verifyDoesNotHaveClass(className: string): void {
    this.mechanicGroup.element.verifyDoesNotHaveClass(
      this.options.selector,
      className
    );
  }

  public verifyIsInFocus(): void {
    this.mechanicGroup.element.verifyIsInFocus(this.options.selector);
  }
}
