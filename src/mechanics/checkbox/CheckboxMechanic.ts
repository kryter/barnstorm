import { Selector } from '../../instruments/uiElement/Selector';

export interface CheckboxMechanic {
  toggle(selector: Selector): void;
  verifyCheckedState(selector: Selector, expectedIsChecked: boolean): void;
}
