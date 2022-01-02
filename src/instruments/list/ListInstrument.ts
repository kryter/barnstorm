import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../../Instrument';
import { ElementInstrumentOptions } from '../element/ElementInstrument';
import { InstrumentManager } from '../../InstrumentManager';

export interface ListInstrumentOptions
  extends ElementInstrumentOptions<Record<string, unknown>[]> {
  /**
   * CSS selector to get an item in the list.
   * This selector is relative to the listSelector.
   */
  relativeItemSelector: string;

  /**
   * A list instrument operates on a set of rows.
   * Each row contains zero or more columns.  The possible columns a row can have
   * are specified by column keys.  The column options are used to create an instrument
   * for the column item within the row.
   */
  columns: ElementInstrumentOptions<unknown>[];
}

export class ListInstrument implements Instrument<Record<string, unknown>[]> {
  private columnIdToColumnOptions: Record<
    string,
    ElementInstrumentOptions<unknown>
  > = {};

  private rows: Record<string, string>[] = [];

  constructor(
    protected mechanicGroup: MechanicGroup,
    protected options: ListInstrumentOptions,
    protected instrumentManager: InstrumentManager
  ) {
    this.options.columns.forEach((columnOptions) => {
      this.columnIdToColumnOptions[columnOptions.id] = columnOptions;
    });

    this.setState(options.initialState || []);
  }

  public getId(): string {
    return this.options.id;
  }

  public getCellId(rowIndex: number, columnId: string): string {
    return `${this.getId()}--${rowIndex}--${columnId}`;
  }

  public addRow(columnIdToState: Record<string, unknown>): void {
    const newRow = this.createRow(this.rows.length, columnIdToState);
    this.rows.push(newRow);
  }

  public createRow(
    rowIndex: number,
    columnIdToState: Record<string, unknown>
  ): Record<string, string> {
    const newRow = {};
    Object.keys(columnIdToState).forEach((columnId: string) => {
      const cellId = this.setupInstrument(
        rowIndex,
        columnId,
        columnIdToState[columnId]
      );
      newRow[columnId] = cellId;
    });
    return newRow;
  }

  public setState(nextState: Record<string, unknown>[]): void {
    // Clear out old state.
    if (this.rows) {
      this.rows.forEach((row: Record<string, string>) => {
        Object.values(row).forEach((instrumentId: string) =>
          this.instrumentManager.teardownInstrument(instrumentId)
        );
      });
    }

    // Populate new state.
    this.rows = nextState.map(
      (columnIdToState: Record<string, unknown>, rowIndex: number) =>
        this.createRow(rowIndex, columnIdToState)
    );
  }

  private setupInstrument(
    rowIndex: number,
    columnId: string,
    initialState: unknown
  ): string {
    const columnOptions: ElementInstrumentOptions<unknown> =
      this.getColumnOptions(columnId);

    const cellId = this.getCellId(rowIndex, columnId);

    this.instrumentManager.setupInstrument({
      ...columnOptions,
      id: this.getCellId(rowIndex, columnId),
      initialState,
      selector: `${this.listItemSelectorByIndex(rowIndex)} ${
        columnOptions.selector || ''
      }`,
    });

    return cellId;
  }

  public verifyState(): void {
    // Just check the length here.
    // The cell instruments will check their own cell states.
    this.verifyContentLength(this.rows.length);
  }

  public getColumnOptions(columnId: string): ElementInstrumentOptions<unknown> {
    const columnOptions = this.columnIdToColumnOptions[columnId];

    if (!columnOptions) {
      throw new Error(
        `Column key \`columnId = ${columnId} \` was not found in the column definitions: ${Object.keys(
          this.columnIdToColumnOptions
        ).join(', ')}`
      );
    }

    return columnOptions;
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

  protected genericListItemSelector(): string {
    return `${this.options.selector} ${this.options.relativeItemSelector}`;
  }

  public verifyContentLength(expectedLength: number): void {
    this.mechanicGroup.list.verifyListLength(
      this.genericListItemSelector(),
      expectedLength
    );
  }
}
