import { ElementInstrument, ElementInstrumentOptions } from './ElementInstrument';
export interface ListMechanicOptions extends ElementInstrumentOptions {
  /**
   * CSS selector to get an item in the list.
   * This selector is relative to the listSelector.
   */
  relativeItemSelector: string;
}

export class ListInstrument extends ElementInstrument<ListMechanicOptions> {
  constructor(options: ListMechanicOptions) {
    super(options);
  }

  protected genericListItemSelector(): string {
    return `${this.options.selector} ${this.options.relativeItemSelector}`;
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

  public verifyListContent(expectedContent: string[]): void {
    // First verify the expected length of the list to make sure there
    // are no extra actual items in the DOM and we are in the right ballpark
    // for additionally verifying the content.
    this.verifyContentLength(expectedContent.length);

    // Then verify the content for all expected items in the list.
    for (let i = 0; i < expectedContent.length; i++) {
      this.verifyItemContent(i, expectedContent[i]);
    }
  }

  public verifyItemContent(itemIndex: number, expectedItemContent: string): void {

  }

  public verifyContentLength(expectedLength: number): void {

  }
}