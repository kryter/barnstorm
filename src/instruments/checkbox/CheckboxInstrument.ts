import MechanicGroup from '../../MechanicGroup';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class CheckboxInstrument extends ElementInstrument<
  boolean,
  ElementInstrumentOptions<boolean>
> {
  constructor(
    mechanicGroup: MechanicGroup,
    options: ElementInstrumentOptions<boolean>
  ) {
    super(mechanicGroup, options);

    this.currentState = options.initialState;
  }

  public verifyState(): void {
    if (this.currentState) {
      this.verifyIsChecked();
    } else {
      this.verifyIsNotChecked();
    }

    super.verifyState();
  }

  public toggle(): void {
    this.mechanicGroup.checkbox.toggle(this.getSelector());
    this.currentState = !this.currentState;
  }

  public verifyIsChecked(): void {
    this.mechanicGroup.checkbox.verifyCheckedState(this.getSelector(), true);
  }

  public verifyIsNotChecked(): void {
    this.mechanicGroup.checkbox.verifyCheckedState(this.getSelector(), false);
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
