import { Selector } from '../../instruments/uiElement/Selector';
import { CheckboxMechanic } from './CheckboxMechanic';

export default class CheckboxMechanicMock implements CheckboxMechanic {
  private isChecked: boolean = false;

  toggle(selector: Selector): void {
    this.isChecked = !this.isChecked;
  }

  verifyCheckedState(selector: Selector, expectedIsChecked: boolean): void {
    if (this.isChecked && !expectedIsChecked) {
      throw new Error(`The checkbox was observed to be in a checked state,
                       but the test expected it to be in an unchecked state.`);
    } else if (!this.isChecked && expectedIsChecked) {
      throw new Error(`The checkbox was observed to be in an unchecked state
                       but the test expected it to be in a checked state.`);
    }
  }
}
