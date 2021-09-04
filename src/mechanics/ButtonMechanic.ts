export interface ButtonMechanicOptions {
  /**
   * CSS selector to get the button control.
   * This selector should match the DOM element
   * that provides the tab index for the control.
   */
  buttonSelector: string;
}

export abstract class ButtonMechanic {
  constructor(protected options: ButtonMechanicOptions) {
  }

  public abstract click(): void;
}
