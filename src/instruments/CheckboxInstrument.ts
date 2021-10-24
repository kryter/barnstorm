import {
  ElementInstrument,
  ElementInstrumentOptions,
} from "./ElementInstrument";
import { Mechanics } from "../flying/Mechanics";

export class CheckboxInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public toggle(): void {
    Mechanics.Checkbox.toggle(this.getSelector());
  }

  public verifyIsChecked(): void {
    Mechanics.Checkbox.verifyCheckedState(this.getSelector(), true);
  }

  public verifyIsNotChecked(): void {
    Mechanics.Checkbox.verifyCheckedState(this.getSelector(), false);
  }

  public uncheck(): void {
    this.verifyIsChecked();
    this.toggle();
    this.verifyIsNotChecked();
  }

  public check(): void {
    this.verifyIsNotChecked();
    this.toggle();
    this.verifyIsChecked();
  }
}
