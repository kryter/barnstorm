import { ElementInstrument, ElementInstrumentOptions } from './ElementInstrument';
import { Mechanics } from '../flying/Mechanics';

export class CheckboxInstrument extends ElementInstrument {
  constructor(options: ElementInstrumentOptions) {
    super(options);
  }

  public toggle(): void {
    Mechanics.Checkbox.toggle(this.options.selector);
  }

  public verifyCheckedState(expectedIsChecked: boolean): void {
    Mechanics.Checkbox.verifyCheckedState(this.options.selector, expectedIsChecked);
  }
}
