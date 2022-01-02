import MechanicGroup from './MechanicGroup';
import { ButtonInstrument } from './instruments/button/ButtonInstrument';
import { CheckboxInstrument } from './instruments/checkbox/CheckboxInstrument';
import {
  KeyboardInstrument,
  KEYBOARD_INSTRUMENT_ID,
} from './instruments/keyboard/KeyboardInstrument';
import { TextAreaInstrument } from './instruments/textArea/TextAreaInstrument';
import { TextBoxInstrument } from './instruments/textBox/TextBoxInstrument';
import {
  UrlInstrument,
  URL_INSTRUMENT_ID,
} from './instruments/url/UrlInstrument';
import {
  ListInstrument,
  ListInstrumentOptions,
} from './instruments/list/ListInstrument';
import { Instrument } from './Instrument';
import { ElementInstrumentOptions } from './instruments/element/ElementInstrument';
import { InstrumentOptions, INSTRUMENT_TYPES } from './InstrumentOptions';
import {
  InstrumentManager,
  InstrumentSetupEvent,
  InstrumentTeardownEvent,
} from './InstrumentManager';
import { SimpleElementInstrument } from './instruments/simpleElement/SimpleElementInstrument';

export class InstrumentSet {
  private instrumentManager: InstrumentManager = new InstrumentManager();

  private idToInstrument: Record<string, Instrument<unknown>> = {};

  constructor(protected mechanicGroup: MechanicGroup) {
    // Setup instrument manager before setting up any instruments.
    this.instrumentManager
      .getInstrumentSetupObservable()
      .subscribe(({ instrumentOptions }: InstrumentSetupEvent) => {
        this.setup(instrumentOptions);
      });

    this.instrumentManager
      .getInstrumentTeardownObservable()
      .subscribe(({ instrumentId }: InstrumentTeardownEvent) => {
        this.teardown(instrumentId);
      });

    // By default setup a single instance of a keyboard and a URL bar.
    this.instrumentManager.setupInstrument({
      id: KEYBOARD_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.KEYBOARD,
    });
    this.instrumentManager.setupInstrument({
      id: URL_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.URL,
    });
  }

  public verifyState(): void {
    Object.values(this.idToInstrument).forEach((instrument) =>
      instrument.verifyState()
    );
  }

  public use<TInstrument extends Instrument<unknown>>(
    instrumentId: string
  ): TInstrument {
    return this.idToInstrument[instrumentId] as TInstrument;
  }

  /**
   * Get the instrument for a UI element within the row of a list
   * using the rowIndex (zero based for convenience in test code),
   * and the columnId which needs to match the columnId of the columnDefinitions
   * in the list instrument options.
   */
  public useColumnInstrument<TInstrument extends Instrument<unknown>>({
    listInstrument,
    rowIndex,
    columnId,
  }: {
    listInstrument: ListInstrument;
    rowIndex: number;
    columnId: string;
  }): TInstrument {
    const columnDefinition = listInstrument.getColumnOptions(columnId);

    return this.setup({
      ...columnDefinition,
      selector: `${listInstrument.listItemSelectorByIndex(rowIndex)} ${
        columnDefinition.selector || ''
      }`,
    });
  }

  /**
   * Build and configure an instrument with the current mechanics set.
   */
  public setup<
    TInstrument extends Instrument<unknown>,
    TInstrumentOptions extends InstrumentOptions<unknown>
  >(instrumentOptions: TInstrumentOptions): TInstrument {
    const existingInstrument = this.idToInstrument[instrumentOptions.id];
    if (existingInstrument) {
      return existingInstrument as TInstrument;
    }

    const instrument = this.createInstrument(instrumentOptions);
    this.idToInstrument[instrument.getId()] = instrument;
    return instrument as TInstrument;
  }

  /**
   * Build and configure an instrument with the current mechanics set.
   */
  private teardown(instrumentId: string): void {
    delete this.idToInstrument[instrumentId];
  }

  private createInstrument(
    instrumentOptions: InstrumentOptions<unknown>
  ): Instrument<unknown> {
    switch (instrumentOptions.instrumentType) {
      case INSTRUMENT_TYPES.BUTTON:
        return new ButtonInstrument(
          this.mechanicGroup,
          <ElementInstrumentOptions>instrumentOptions
        );

      case INSTRUMENT_TYPES.CHECKBOX:
        return new CheckboxInstrument(
          this.mechanicGroup,
          <ElementInstrumentOptions<boolean>>instrumentOptions
        );

      case INSTRUMENT_TYPES.SIMPLE_ELEMENT:
        return new SimpleElementInstrument(
          this.mechanicGroup,
          <ElementInstrumentOptions<string>>instrumentOptions
        );

      case INSTRUMENT_TYPES.KEYBOARD:
        return new KeyboardInstrument(this.mechanicGroup);

      case INSTRUMENT_TYPES.LIST:
        return new ListInstrument(
          this.mechanicGroup,
          <ListInstrumentOptions>instrumentOptions,
          this.instrumentManager
        );

      case INSTRUMENT_TYPES.TEXT_AREA:
        return new TextAreaInstrument(
          this.mechanicGroup,
          <ElementInstrumentOptions<string>>instrumentOptions
        );

      case INSTRUMENT_TYPES.TEXT_BOX:
        return new TextBoxInstrument(
          this.mechanicGroup,
          <ElementInstrumentOptions<string>>instrumentOptions
        );

      case INSTRUMENT_TYPES.URL:
        return new UrlInstrument(this.mechanicGroup);

      default:
        throw new Error(
          `Creating an instrument of type ${instrumentOptions.instrumentType}, id=\`${instrumentOptions.id}\` is not supported.`
        );
    }
  }
}
