export interface Selector {
  /**
   * CSS selector to get the HTML element.
   */
  css: string;

  /**
   * Text content that exists within the HTML element.
   */
  content?: string;

  /**
   * If this element lives within an iFrame, use this selector to find
   * the iFrame before searching for the element.
   */
  iFrame?: string;
}
