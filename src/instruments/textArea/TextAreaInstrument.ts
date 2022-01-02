import MechanicGroup from '../../MechanicGroup';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class TextAreaInstrument extends ElementInstrument<
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
    this.mechanicGroup.textArea.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicGroup.textArea.verifyText(this.options.selector, expectedText);
  }
}
