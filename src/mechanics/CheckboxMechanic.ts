export interface CheckboxMechanicOptions {
    /**
   * CSS selector to get the checkbox control.
   * This selector should match the DOM element
   * that provides the tab index for the control.
   */
  checkboxSelector: string;
}

export abstract class CheckboxMechanic {
  constructor(protected options: CheckboxMechanicOptions) {
  }

  public abstract toggle(): void;
  public abstract verifyCheckedState(expectedIsChecked: boolean): void;
}
