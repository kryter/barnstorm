import { Mechanics } from '../../flying/Mechanics';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from "../element/ElementInstrument";

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
