import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentOptions,
  UIElementState,
} from '../uiElement/UIElementInstrument';

export interface TextBoxState extends UIElementState {
  inputText?: string;
}

export class TextBoxInstrument extends UIElementInstrument<
  TextBoxState,
  UIElementInstrumentOptions<TextBoxState>
> {
  constructor(
    mechanicGroup: MechanicGroup,
    options: UIElementInstrumentOptions<TextBoxState>
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
    this.mechanicGroup.textBox.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicGroup.textBox.verifyText(this.options.selector, expectedText);
  }
}
