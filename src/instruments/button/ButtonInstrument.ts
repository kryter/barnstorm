import { Mechanics } from '../../Mechanics';
import {
  ElementInstrumentOptions,
  ElementInstrument,
} from "../element/ElementInstrument";

export class ButtonInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public click(): void {
    Mechanics.Button.click(this.options.selector);
  }
}
