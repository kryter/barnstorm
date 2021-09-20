export interface CheckboxMechanic {
  toggle(selector: string): void;
  verifyCheckedState(selector: string, expectedIsChecked: boolean): void;
}
