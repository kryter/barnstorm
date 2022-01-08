import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentOptions,
  UIElementState,
} from '../uiElement/UIElementInstrument';

export interface CheckboxState extends UIElementState {
  isChecked?: boolean;
}

export class CheckboxInstrument extends UIElementInstrument<CheckboxState> {
  constructor(
    mechanicGroup: MechanicGroup,
    options: UIElementInstrumentOptions<CheckboxState>
  ) {
    super(mechanicGroup, options);
  }

  protected isStateKeySupported(stateKey: string): boolean {
    if (super.isStateKeySupported(stateKey)) {
      return true;
    }
    return stateKey === 'isChecked';
  }

  public verifyState(): void {
    super.verifyState();

    if (this.currentState.isVisible === false) {
      return;
    }

    if (this.currentState.isChecked) {
      this.verifyIsChecked();
    } else if (this.currentState.isChecked === false) {
      this.verifyIsNotChecked();
    }
  }

  public toggle(): void {
    this.mechanicGroup.checkbox.toggle(this.options.selector);
    this.updateState({
      isChecked: !this.currentState.isChecked,
    });
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
