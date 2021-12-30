import MechanicsSet from '../../MechanicsSet';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class CheckboxInstrument extends ElementInstrument {
  constructor(mechanicsSet: MechanicsSet, options: ElementInstrumentOptions) {
    super(mechanicsSet, options);
  }

  public toggle(): void {
    this.mechanicsSet.checkbox.toggle(this.getSelector());
  }

  public verifyIsChecked(): void {
    this.mechanicsSet.checkbox.verifyCheckedState(this.getSelector(), true);
  }

  public verifyIsNotChecked(): void {
    this.mechanicsSet.checkbox.verifyCheckedState(this.getSelector(), false);
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
