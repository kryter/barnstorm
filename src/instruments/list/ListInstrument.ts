import MechanicGroup from '../../MechanicGroup';
import { Instrument, InstrumentOptions } from '../../Instrument';

export interface ListInstrumentOptions extends InstrumentOptions<string[]> {
  /**
   * CSS selector to get the root HTML element representing the list as a whole.
   */
  selector: string;

  /**
   * CSS selector to get an item in the list.
   * This selector is relative to the listSelector.
   */
  relativeItemSelector: string;
}

export class ListInstrument implements Instrument<string[]> {
  private currentState: string[];

  constructor(
    protected mechanicGroup: MechanicGroup,
    protected options: ListInstrumentOptions
  ) {
    this.currentState = options.initialState;
  }

  public getId(): string {
    return this.options.id;
  }

  public getState(): string[] {
    return this.currentState;
  }

  public setState(nextState: string[]): void {
    this.currentState = nextState;
  }

  public verifyState(): void {
    this.verifyListContent(this.currentState);
  }

  protected genericListItemSelector(): string {
    return `${this.options.selector} ${this.options.relativeItemSelector}`;
  }

  /**
   * Takes a zero-based item index and returns a selector for that item.
   */
  public listItemSelectorByIndex(itemIndex: number): string {
    // Increment the zero-based item index (which is handy for writing loops in tests)
    // to convert it to the one-based item number that the CSS nth-child selector is expecting.
    const itemNumber = itemIndex + 1;
    return this.listItemSelectorByNumber(itemNumber);
  }

  /**
   * Takes a one-based item index and returns a selector for that item.
   */
  public listItemSelectorByNumber(itemNumber: number): string {
    return `${this.genericListItemSelector()}:nth-child(${itemNumber})`;
  }

  public verifyListContent(expectedContent: string[]): void {
    // First verify the expected length of the list to make sure there
    // are no extra actual items in the DOM and we are in the right ballpark
    // for additionally verifying the content.
    this.verifyContentLength(expectedContent.length);

    // Then verify the content for all expected items in the list.
    for (let i = 0; i < expectedContent.length; i += 1) {
      this.verifyItemContent(i, expectedContent[i]);
    }
  }

  public verifyItemContent(
    itemIndex: number,
    expectedItemContent: string
  ): void {
    const itemSelector = this.listItemSelectorByIndex(itemIndex);
    this.mechanicGroup.element.verifyTextContent(
      itemSelector,
      expectedItemContent
    );
  }

  public verifyContentLength(expectedLength: number): void {
    this.mechanicGroup.list.verifyListLength(
      this.genericListItemSelector(),
      expectedLength
    );
  }
}
