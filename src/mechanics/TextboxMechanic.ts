export interface TextBoxMechanicOptions {
  /**
   * CSS selector to get the text box control.
   * This selector should match the DOM element
   * that provides the tab index for the control.
   */
  textBoxSelector: string;
}

export abstract class TextBoxMechanic {
  constructor(protected options: TextBoxMechanicOptions) {
  }

  public abstract verifyIsInFocus(): void;
  public abstract enterText(textToType: string): void;
  public abstract verifyText(expectedText: string): void;
}
