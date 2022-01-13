import MechanicGroup from '../../MechanicGroup';
import { InstrumentBase } from '../instrument/InstrumentBase';
import { InstrumentOptions } from '../instrument/InstrumentOptions';

const SUPPORTED_STATE_KEYS = [
  'hasClasses',
  'doesNotHaveClasses',
  'textContent',
  'inFocus',
  'isVisible',
  'isPresent',
  'css',
];

export interface UIElementState extends Record<string, unknown> {
  hasClasses?: string[];
  doesNotHaveClasses?: string[];
  textContent?: string;
  inFocus?: boolean;
  isVisible?: boolean;
  isPresent?: boolean;
  css?: Record<string, string>;
}

export interface UIElementInstrumentOptions<
  TState extends UIElementState = UIElementState
> extends InstrumentOptions<TState> {
  /**
   * CSS selector to get the HTML element.
   */
  selector: string;

  /**
   * In general, Barnstorm will not try to interact with hidden elements.
   * However, there are cases where an element is hidden visually but is still
   * interactive.  Set this flag if we should verify the state of the instrument
   * when the instrument is present but invisible.
   */
  verifyStateWhenInvisible: boolean;
}

export class UIElementInstrument<
  TState extends UIElementState = UIElementState,
  TOptions extends UIElementInstrumentOptions<TState> = UIElementInstrumentOptions<TState>
> extends InstrumentBase<TState, TOptions> {
  constructor(mechanicGroup: MechanicGroup, options: TOptions) {
    super(mechanicGroup, options);
    this.currentState = options.initialState;

    // Default the instrument to expect that the UI control is visible and present unless specified otherwise.
    if (options.initialState.isPresent !== false) {
      this.currentState.isPresent = true;
    }
    if (options.initialState.isVisible !== false) {
      this.currentState.isVisible = true;
    }
  }

  protected isStateKeySupported(stateKey: string): boolean {
    return SUPPORTED_STATE_KEYS.includes(stateKey);
  }

  protected canVerifyState(): boolean {
    if (!this.currentState.isPresent) {
      return false;
    }

    if (this.options.verifyStateWhenInvisible) {
      return true;
    }

    return this.currentState.isVisible;
  }

  public verifyState(): void {
    if (!this.currentState.isPresent) {
      this.verifyIsNotPresent();

      // Since the element isn't present, we don't need to check
      // any of its other state.
      return;
    }
    this.verifyIsPresent();

    if (!this.currentState.isVisible) {
      this.verifyIsNotVisible();

      // Since the element isn't visible, we don't need to check
      // any of its other state.
      if (!this.options.verifyStateWhenInvisible) {
        return;
      }
    } else {
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
    if (this.currentState.css) {
      Object.keys(this.currentState.css).forEach((cssPropertyKey: string) => {
        this.verifyCssProperty(
          cssPropertyKey,
          this.currentState.css[cssPropertyKey]
        );
      });
    }
  }

  protected createUpdatedState(stateUpdates: TState): TState {
    return {
      ...this.currentState,
      ...stateUpdates,
      css: {
        ...this.currentState.css,
        ...stateUpdates.css,
      },
    };
  }

  public verifyIsNotVisible(): void {
    this.mechanicGroup.element.verifyIsNotVisible(this.options.selector);
  }

  public verifyIsVisible(): void {
    this.mechanicGroup.element.verifyIsVisible(this.options.selector);
  }

  public verifyIsNotPresent(): void {
    this.mechanicGroup.element.verifyIsNotPresent(this.options.selector);
  }

  public verifyIsPresent(): void {
    this.mechanicGroup.element.verifyIsPresent(this.options.selector);
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

  public verifyCssProperty(propertyKey: string, propertyValue: string): void {
    this.mechanicGroup.element.verifyCssProperty(
      this.options.selector,
      propertyKey,
      propertyValue
    );
  }
}
