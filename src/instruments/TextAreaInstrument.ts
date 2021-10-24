import { ElementInstrument, ElementInstrumentOptions } from './ElementInstrument';
import { Mechanics } from '../flying/Mechanics';

export class TextAreaInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public enterText(textToType: string): void {
    Mechanics.TextArea.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    Mechanics.TextArea.verifyText(this.options.selector, expectedText);
  }
}
