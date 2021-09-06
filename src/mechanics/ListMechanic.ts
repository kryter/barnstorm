export interface ListMechanicOptions {
  /**
   * CSS selector to get the list control.
   */
  listSelector: string;

  /**
   * CSS selector to get an item in the list.
   * This selector is relative to the listSelector.
   */
  relativeItemSelector: string;
}

export abstract class ListMechanic {
  constructor(protected options: ListMechanicOptions) {
  }

  protected genericListItemSelector(): string {
    return `${this.options.listSelector} ${this.options.relativeItemSelector}`;
  }

  /**
   * Takes a zero-based item index and returns a selector for that item.
   */
  protected listItemSelector(itemIndex: number): string {
    // Increment the zero-based item index (which is handy for writing loops in tests)
    // to convert it to the one-based item number that the CSS nth-child selector is expecting.
    const itemNumber = itemIndex + 1;
    return `${this.genericListItemSelector()}:nth-child(${itemNumber})`;
  }

  public verifyContent(expectedContent: string[]): void {
    // First verify the expected length of the list to make sure there
    // are no extra actual items in the DOM and we are in the right ballpark
    // for additionally verifying the content.
    this.verifyContentLength(expectedContent.length);

    // Then verify the content for all expected items in the list.
    for (let i = 0; i < expectedContent.length; i++) {
      this.verifyItemContent(i, expectedContent[i]);
    }
  }

  public abstract verifyItemContent(itemIndex: number, expectedItemContent: string): void;
  public abstract verifyContentLength(expectedLength: number): void;
}