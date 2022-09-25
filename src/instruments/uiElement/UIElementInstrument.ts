import MechanicGroup from '../../MechanicGroup';
import { InstrumentBase } from '../instrument/InstrumentBase';
import { InstrumentConfig } from '../instrument/InstrumentConfig';
import { ExpectedBoundingBox } from './ExpectedBoundingBox';
import { Selector } from './Selector';

const SUPPORTED_STATE_KEYS = [
  'hasClasses',
  'doesNotHaveClasses',
  'textContent',
  'inFocus',
  'isEnabled',
  'isVisible',
  'isPresent',
  'css',
  'boundingBox',
  'attributes',
  'ignoreState',
];

export interface UIElementState extends Record<string, unknown> {
  hasClasses?: string[];
  doesNotHaveClasses?: string[];
  textContent?: string;
  inFocus?: boolean;
  isEnabled?: boolean;
  isVisible?: boolean;
  isPresent?: boolean;
  css?: Record<string, string | boolean>;
  boundingBox?: ExpectedBoundingBox;
  attributes?: Record<string, string>;
  ignoreState?: boolean;
}

export interface UIElementInstrumentConfig<
  TState extends UIElementState = UIElementState
> extends InstrumentConfig<TState> {
  /**
   * Selection details used to find the HTML element.
   */
  selector: Selector;

  /**
   * In general, Barnstorm will not try to interact with hidden elements.
   * However, there are cases where an element is hidden visually but is still
   * interactive.  Set this flag if we should verify the state of the instrument
   * when the instrument is present but invisible.
   */
  verifyStateWhenInvisible?: boolean;
}

export class UIElementInstrument<
  TState extends UIElementState = UIElementState,
  TConfig extends UIElementInstrumentConfig<TState> = UIElementInstrumentConfig<TState>
> extends InstrumentBase<TState, TConfig> {
  constructor(mechanicGroup: MechanicGroup, config: TConfig) {
    super(mechanicGroup, config);
    this.currentState = config.initialState;

    // Default the instrument to expect that the UI control is visible and present unless specified otherwise.
    if (config.initialState.isPresent !== false) {
      this.currentState.isPresent = true;
    }
    if (config.initialState.isVisible !== false) {
      this.currentState.isVisible = true;
    }
  }

  protected isStateKeySupported(stateKey: string): boolean {
    return SUPPORTED_STATE_KEYS.includes(stateKey);
  }

  protected canVerifyState(): boolean {
    if (this.currentState.ignoreState) {
      return false;
    }

    if (!this.currentState.isPresent) {
      return false;
    }

    if (this.config.verifyStateWhenInvisible) {
      return true;
    }

    if (this.isCurrentStateVerified) {
      return false;
    }

    return this.currentState.isVisible;
  }

  public verifyState(): void {
    // In general, this should not be used,
    // but it is available as an escape hatch if needed.
    if (this.currentState.ignoreState) {
      return;
    }

    if (!this.currentState.isPresent) {
      this.verifyIsNotPresent();

      // Since the element isn't present, we don't need to check
      // any of its other state.
      return;
    }

    if (!this.currentState.isVisible) {
      this.verifyIsNotVisible();

      // Since the element isn't visible, we don't need to check
      // any of its other state.
      if (!this.config.verifyStateWhenInvisible) {
        return;
      }
    }

    let hasVerifiedSomethingVisible: boolean = false;

    if (this.currentState.hasClasses) {
      this.currentState.hasClasses.forEach((aClass) => {
        this.verifyHasClass(aClass);
      });
    }
    if (this.currentState.doesNotHaveClasses) {
      this.currentState.doesNotHaveClasses.forEach((aClass) => {
        this.verifyDoesNotHaveClass(aClass);
      });
    }
    if (this.currentState.textContent) {
      this.verifyTextContent(this.currentState.textContent);
      hasVerifiedSomethingVisible = true;
    }
    if (this.currentState.inFocus) {
      this.verifyIsInFocus();
      hasVerifiedSomethingVisible = true;
    }
    if (this.currentState.isEnabled !== undefined) {
      this.verifyIsEnabled(this.currentState.isEnabled);
      hasVerifiedSomethingVisible = true;
    }
    if (this.currentState.css) {
      Object.keys(this.currentState.css).forEach((cssPropertyKey: string) => {
        this.verifyCssProperty(
          cssPropertyKey,
          this.currentState.css[cssPropertyKey]
        );
      });
    }
    if (
      this.currentState.boundingBox &&
      Object.keys(this.currentState.boundingBox).length > 0
    ) {
      this.verifyBoundingBox(this.currentState.boundingBox);
    }
    if (this.currentState.attributes) {
      Object.keys(this.currentState.attributes).forEach(
        (attributeKey: string) => {
          this.verifyAttribute(
            attributeKey,
            this.currentState.attributes[attributeKey]
          );
        }
      );
    }

    if (
      !hasVerifiedSomethingVisible &&
      this.currentState.isVisible &&
      this.toVerifyIsVisible()
    ) {
      this.verifyIsVisible();
    }

    this.isCurrentStateVerified = true;
  }

  /**
   * Return true if we should verify the visibility of the element if no other basic verifications
   * were made.
   * Instruments that have a verification by default,
   * for example,
   * the checked state of a button or the length of a list,
   * should override this method and return false because validating visibility is redundant.
   */
  protected toVerifyIsVisible(): boolean {
    return true;
  }

  protected createUpdatedState(stateUpdates: TState): TState {
    return {
      ...this.currentState,
      ...stateUpdates,
      css: {
        ...this.currentState.css,
        ...stateUpdates.css,
      },
      boundingBox: {
        ...this.currentState.boundingBox,
        ...stateUpdates.boundingBox,
      },
      attributes: {
        ...this.currentState.attributes,
        ...stateUpdates.attributes,
      },
    };
  }

  public verifyIsNotVisible(): void {
    this.mechanicGroup.element.verifyIsNotVisible(this.config.selector);
  }

  public verifyIsVisible(): void {
    this.mechanicGroup.element.verifyIsVisible(this.config.selector);
  }

  public verifyIsNotPresent(): void {
    this.mechanicGroup.element.verifyIsNotPresent(this.config.selector);
  }

  public verifyIsPresent(): void {
    this.mechanicGroup.element.verifyIsPresent(this.config.selector);
  }

  public verifyTextContent(content: string): void {
    this.mechanicGroup.element.verifyTextContent(this.config.selector, content);
  }

  public verifyHasClass(className: string): void {
    this.mechanicGroup.element.verifyHasClass(this.config.selector, className);
  }

  public verifyDoesNotHaveClass(className: string): void {
    this.mechanicGroup.element.verifyDoesNotHaveClass(
      this.config.selector,
      className
    );
  }

  public verifyIsInFocus(): void {
    this.mechanicGroup.element.verifyIsInFocus(this.config.selector);
  }

  public verifyIsEnabled(expectedIsEnabled: boolean): void {
    this.mechanicGroup.element.verifyIsEnabled(
      this.config.selector,
      expectedIsEnabled
    );
  }

  public verifyCssProperty(
    propertyKey: string,
    propertyValue: string | boolean
  ): void {
    this.mechanicGroup.element.verifyCssProperty(
      this.config.selector,
      propertyKey,
      String(propertyValue)
    );
  }

  public verifyBoundingBox(expectedBoundingBox: ExpectedBoundingBox): void {
    this.mechanicGroup.element.verifyBoundingBox(
      this.config.selector,
      expectedBoundingBox
    );
  }

  public verifyAttribute(attributeKey: string, attributeValue: string): void {
    this.mechanicGroup.element.verifyAttribute(
      this.config.selector,
      attributeKey,
      attributeValue
    );
  }
}
