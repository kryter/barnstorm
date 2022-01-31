import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentConfig,
  UIElementState,
} from '../uiElement/UIElementInstrument';
import { InstrumentManager } from '../../InstrumentManager';

export interface ListState extends UIElementState {
  rows?: Record<string, Record<string, unknown>>[];
}

export interface ListInstrumentConfig
  extends UIElementInstrumentConfig<ListState> {
  /**
   * CSS selector to get an item in the list.
   * This selector is relative to the listSelector.
   */
  relativeItemSelector: string;

  /**
   * A list instrument operates on a set of rows.
   * Each row contains zero or more columns.  The possible columns a row can have
   * are specified by column keys.  The column config are used to create an instrument
   * for the column item within the row.
   */
  columns: UIElementInstrumentConfig[];
}

export class ListInstrument extends UIElementInstrument<
  ListState,
  ListInstrumentConfig
> {
  private columnKeyToColumnOptions: Record<string, UIElementInstrumentConfig> =
    {};

  private rowsOfColumnKeyToCellId: Record<string, string>[] = [];

  constructor(
    mechanicGroup: MechanicGroup,
    config: ListInstrumentConfig,
    protected instrumentManager: InstrumentManager
  ) {
    super(mechanicGroup, config);

    this.config.columns.forEach((columnOptions) => {
      this.columnKeyToColumnOptions[columnOptions.id] = columnOptions;
    });

    // Populate initial instruments.
    this.populateContentInstruments();
  }

  protected isStateKeySupported(stateKey: string): boolean {
    if (super.isStateKeySupported(stateKey)) {
      return true;
    }
    return stateKey === 'rows';
  }

  public verifyState(): void {
    super.verifyState();

    if (!this.canVerifyState()) {
      return;
    }

    // Just check the length here.
    // The cell instruments will check their own cell states.
    this.verifyContentLength(this.rowsOfColumnKeyToCellId.length);
  }

  public getCellId(rowIndex: number, columnKey: string): string {
    return `${this.getId()}--${rowIndex}--${columnKey}`;
  }

  public addRow(
    columnKeyToState: Record<string, Record<string, unknown>>
  ): void {
    // Update expected state.
    this.updateState({
      ...this.currentState,
      rows: [...this.currentState.rows, columnKeyToState],
    });
  }

  public createRow(
    rowIndex: number,
    columnKeyToState: Record<string, Record<string, unknown>>
  ): Record<string, string> {
    const columnKeyToCellId = {};
    Object.keys(columnKeyToState).forEach((columnKey: string) => {
      const cellId = this.setupInstrument(
        rowIndex,
        columnKey,
        columnKeyToState[columnKey]
      );
      columnKeyToCellId[columnKey] = cellId;
    });
    return columnKeyToCellId;
  }

  public updateState(nextState: ListState): void {
    // Update expected state.
    super.updateState(nextState);

    // Clear out old state instruments.
    this.rowsOfColumnKeyToCellId.forEach(
      (columnIdToCellId: Record<string, string>) => {
        Object.values(columnIdToCellId).forEach((cellId: string) =>
          this.instrumentManager.triggerDestroyInstrument(cellId)
        );
      }
    );

    // Populate new state instruments.
    this.populateContentInstruments();
  }

  private populateContentInstruments(): void {
    if (this.currentState.rows) {
      this.rowsOfColumnKeyToCellId = this.currentState.rows.map(
        (
          columnKeyToState: Record<string, Record<string, unknown>>,
          rowIndex: number
        ) => this.createRow(rowIndex, columnKeyToState)
      );
    } else {
      this.rowsOfColumnKeyToCellId = [];
    }
  }

  private setupInstrument(
    rowIndex: number,
    columnKey: string,
    initialState: Record<string, unknown>
  ): string {
    const columnOptions: UIElementInstrumentConfig =
      this.getColumnOptions(columnKey);

    const cellId = this.getCellId(rowIndex, columnKey);

    this.instrumentManager.triggerCreateInstrument({
      ...columnOptions,
      id: cellId,
      initialState,
      selector: `${this.listItemSelectorByIndex(rowIndex)} ${
        columnOptions.selector || ''
      }`,
      iFrameSelector: this.config.iFrameSelector,
    });

    return cellId;
  }

  public getColumnOptions(columnKey: string): UIElementInstrumentConfig {
    const columnOptions = this.columnKeyToColumnOptions[columnKey];

    if (!columnOptions) {
      throw new Error(
        `Column key \`columnKey = ${columnKey} \` was not found in the column definitions: ${Object.keys(
          this.columnKeyToColumnOptions
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
    return `${this.config.selector} ${this.config.relativeItemSelector}`;
  }

  public verifyContentLength(expectedLength: number): void {
    this.mechanicGroup.list.verifyListLength(
      this.genericListItemSelector(),
      expectedLength,
      this.config.iFrameSelector
    );
  }
}
