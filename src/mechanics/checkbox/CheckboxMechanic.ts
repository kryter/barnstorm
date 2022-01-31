export interface CheckboxMechanic {
  toggle(selector: string, iFrameSelector?: string): void;
  verifyCheckedState(
    selector: string,
    expectedIsChecked: boolean,
    iFrameSelector?: string
  ): void;
}
