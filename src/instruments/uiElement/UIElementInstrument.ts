import MechanicGroup from '../../MechanicGroup';
import { InstrumentBase } from '../instrument/InstrumentBase';
import { InstrumentOptions } from '../instrument/InstrumentOptions';

const SUPPORTED_STATE_KEYS = [
  'hasClasses',
  'doesNotHaveClasses',
  'textContent',
  'inFocus',
  'isVisible',
];

export interface UIElementState extends Record<string, unknown> {
  hasClasses?: string[];
  doesNotHaveClasses?: string[];
  textContent?: string;
  inFocus?: boolean;
  isVisible?: boolean;
}

export interface UIElementInstrumentOptions<
  TState extends UIElementState = UIElementState
> extends InstrumentOptions<TState> {
  /**
   * CSS selector to get the HTML element.
   */
  selector: string;
}

export class UIElementInstrument<
  TState extends UIElementState = UIElementState,
  TOptions extends UIElementInstrumentOptions<TState> = UIElementInstrumentOptions<TState>
> extends InstrumentBase<TState, TOptions> {
  constructor(mechanicGroup: MechanicGroup, options: TOptions) {
    super(mechanicGroup, options);
    this.currentState = options.initialState;
  }

  protected isStateKeySupported(stateKey: string): boolean {
    return SUPPORTED_STATE_KEYS.includes(stateKey);
  }

  public verifyState(): void {
    if (this.currentState.isVisible === false) {
      this.verifyIsNotVisible();

      // Since the element isn't visible, we don't need to check
      // any of its other state.
      return;
    }

    if (this.currentState.isVisible === true) {
      this.verifyIsVisible();
    }
    if (this.currentState.hasClasses) {
      this.currentState.hasClasses.forEach((aClass) =>
        this.verifyHasClass(aClass)
      );
    }
    if (this.currentState.doesNotHaveClasses) {
      this.currentState.doesNotHaveClasses.forEach((aClass) =>
        this.verifyDoesNotHaveClass(aClass)
      );
    }
    if (this.currentState.textContent) {
      this.verifyTextContent(this.currentState.textContent);
    }
    if (this.currentState.inFocus) {
      this.verifyIsInFocus();
    }
  }

  public verifyIsNotVisible(): void {
    this.mechanicGroup.element.verifyIsNotVisible(this.options.selector);
  }

  public verifyIsNotPresent(): void {
    this.mechanicGroup.element.verifyIsNotPresent(this.options.selector);
  }

  public verifyIsVisible(): void {
    this.mechanicGroup.element.verifyIsVisible(this.options.selector);
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
