import { Mechanics } from "../flying/Mechanics";
import {
  ElementInstrumentOptions,
  ElementInstrument,
} from "./ElementInstrument";

export class ButtonInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public click(): void {
    Mechanics.Button.click(this.options.selector);
  }
}
