export interface TextAreaMechanicOptions {
  /**
   * CSS selector to get the text area control.
   * This selector should match the DOM element
   * that provides the tab index for the control.
   */
  textAreaSelector: string;
}

export abstract class TextAreaMechanic {
  constructor(protected options: TextAreaMechanicOptions) {
  }

  public abstract enterText(textToType: string): void;
  public abstract verifyText(expectedText: string): void;
}
