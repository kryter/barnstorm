import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentOptions,
  UIElementState,
} from '../uiElement/UIElementInstrument';

export interface TextAreaState extends UIElementState {
  inputText?: string;
}

export class TextAreaInstrument extends UIElementInstrument<
  TextAreaState,
  UIElementInstrumentOptions<TextAreaState>
> {
  constructor(
    mechanicGroup: MechanicGroup,
    options: UIElementInstrumentOptions<TextAreaState>
  ) {
    super(mechanicGroup, options);
  }

  protected isStateKeySupported(stateKey: string): boolean {
    if (super.isStateKeySupported(stateKey)) {
      return true;
    }
    return stateKey === 'inputText';
  }

  public verifyState(): void {
    super.verifyState();

    if (this.currentState.isVisible === false) {
      return;
    }

    if (this.currentState.inputText) {
      this.verifyText(this.currentState.inputText);
    }
  }

  public enterText(textToType: string): void {
    this.mechanicGroup.textArea.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicGroup.textArea.verifyText(this.options.selector, expectedText);
  }
}
