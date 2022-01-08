import MechanicGroup from './MechanicGroup';
import { ButtonInstrument } from './instruments/button/ButtonInstrument';
import {
  CheckboxInstrument,
  CheckboxState,
} from './instruments/checkbox/CheckboxInstrument';
import {
  KeyboardInstrument,
  KEYBOARD_INSTRUMENT_ID,
} from './instruments/keyboard/KeyboardInstrument';
import {
  TextAreaInstrument,
  TextAreaState,
} from './instruments/textArea/TextAreaInstrument';
import {
  TextBoxInstrument,
  TextBoxState,
} from './instruments/textBox/TextBoxInstrument';
import {
  UrlInstrument,
  URL_INSTRUMENT_ID,
} from './instruments/url/UrlInstrument';
import {
  ListInstrument,
  ListInstrumentOptions,
} from './instruments/list/ListInstrument';
import { Instrument } from './instruments/instrument/Instrument';
import {
  UIElementInstrument,
  UIElementInstrumentOptions,
} from './instruments/uiElement/UIElementInstrument';
import { InstrumentOptions } from './instruments/instrument/InstrumentOptions';
import {
  InstrumentManager,
  InstrumentSetupEvent,
  InstrumentTeardownEvent,
} from './InstrumentManager';
import { INSTRUMENT_TYPES } from './INSTRUMENT_TYPES';

export class InstrumentSet {
  private instrumentManager: InstrumentManager = new InstrumentManager();

  private idToInstrument: Record<string, Instrument> = {};

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
        this.teardown([instrumentId]);
      });

    // By default setup a single instance of a keyboard and a URL bar.
    this.instrumentManager.setupInstrument({
      id: KEYBOARD_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.KEYBOARD,
      initialState: {},
    });
    this.instrumentManager.setupInstrument({
      id: URL_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.URL,
      initialState: {
        currentUrl: '',
      },
    });
  }

  /**
   * Verify all instruments that are currently set up.
   */
  public verifyState(): void {
    Object.values(this.idToInstrument).forEach((instrument) =>
      instrument.verifyState()
    );
  }

  /**
   * Get an instrument that has been setup previously.
   */
  public use<TInstrument extends Instrument>(
    instrumentId: string
  ): TInstrument {
    return this.idToInstrument[instrumentId] as TInstrument;
  }

  /**
   * Get the keyboard instrument singleton.
   */
  public keyboard(): KeyboardInstrument {
    return this.use<KeyboardInstrument>(KEYBOARD_INSTRUMENT_ID);
  }

  /**
   * Get the url instrument singleton.
   */
  public url(): UrlInstrument {
    return this.use<UrlInstrument>(URL_INSTRUMENT_ID);
  }

  /**
   * Build and configure an instrument with the current mechanics set.
   */
  public setup<
    TInstrument extends Instrument,
    TInstrumentOptions extends InstrumentOptions
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
   * Remove the instrument from the instrument set so its state
   * is no longer verified at the end of each test step.
   */
  public teardown(instrumentIds: string[]): void {
    instrumentIds.forEach((id) => delete this.idToInstrument[id]);
  }

  private createInstrument(instrumentOptions: InstrumentOptions): Instrument {
    switch (instrumentOptions.instrumentType) {
      case INSTRUMENT_TYPES.BUTTON:
        return new ButtonInstrument(
          this.mechanicGroup,
          <UIElementInstrumentOptions>instrumentOptions
        );

      case INSTRUMENT_TYPES.CHECKBOX:
        return new CheckboxInstrument(
          this.mechanicGroup,
          <UIElementInstrumentOptions<CheckboxState>>instrumentOptions
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
          <UIElementInstrumentOptions<TextAreaState>>instrumentOptions
        );

      case INSTRUMENT_TYPES.TEXT_BOX:
        return new TextBoxInstrument(
          this.mechanicGroup,
          <UIElementInstrumentOptions<TextBoxState>>instrumentOptions
        );

      case INSTRUMENT_TYPES.UI_ELEMENT:
        return new UIElementInstrument(
          this.mechanicGroup,
          <UIElementInstrumentOptions>instrumentOptions
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
