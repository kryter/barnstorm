import MechanicGroup from '../../MechanicGroup';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class TextBoxInstrument extends ElementInstrument<
  string,
  ElementInstrumentOptions<string>
> {
  constructor(
    mechanicGroup: MechanicGroup,
    options: ElementInstrumentOptions<string>
  ) {
    super(mechanicGroup, options);
    this.currentState = options.initialState || '';
  }

  public verifyState(): void {
    this.verifyText(this.currentState);
  }

  public enterText(textToType: string): void {
    this.mechanicGroup.textBox.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicGroup.textBox.verifyText(this.options.selector, expectedText);
  }
}
