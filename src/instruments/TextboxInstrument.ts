import {
  ElementInstrument,
  ElementInstrumentOptions,
} from "./ElementInstrument";
import { Mechanics } from "../flying/Mechanics";

export class TextBoxInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public enterText(textToType: string): void {
    Mechanics.TextBox.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    Mechanics.TextBox.verifyText(this.options.selector, expectedText);
  }
}
