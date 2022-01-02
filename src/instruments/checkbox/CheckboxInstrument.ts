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

    this.currentState = options.initialState || false;
  }

  public verifyState(): void {
    if (this.currentState) {
      this.verifyIsChecked();
    } else {
      this.verifyIsNotChecked();
    }
  }

  public toggle(): void {
    this.mechanicGroup.checkbox.toggle(this.options.selector);
    this.currentState = !this.currentState;
  }

  public verifyIsChecked(): void {
    this.mechanicGroup.checkbox.verifyCheckedState(this.options.selector, true);
  }

  public verifyIsNotChecked(): void {
    this.mechanicGroup.checkbox.verifyCheckedState(
      this.options.selector,
      false
    );
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
