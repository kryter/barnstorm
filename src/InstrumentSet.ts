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
import { TextAreaInstrument } from './instruments/textArea/TextAreaInstrument';
import { TextBoxInstrument } from './instruments/textBox/TextBoxInstrument';
import {
  UrlInstrument,
  URL_INSTRUMENT_ID,
} from './instruments/url/UrlInstrument';
import {
  ListInstrument,
  ListInstrumentConfig,
} from './instruments/list/ListInstrument';
import { Instrument } from './instruments/instrument/Instrument';
import {
  UIElementInstrument,
  UIElementInstrumentConfig,
} from './instruments/uiElement/UIElementInstrument';
import { InstrumentConfig } from './instruments/instrument/InstrumentConfig';
import {
  InstrumentManager,
  InstrumentToCreateEvent,
  InstrumentToDestroyEvent,
} from './InstrumentManager';
import { INSTRUMENT_TYPES } from './INSTRUMENT_TYPES';

export class InstrumentSet {
  private instrumentManager: InstrumentManager = new InstrumentManager();

  private idToInstrument: Record<string, Instrument> = {};

  /**
   * Keep track of instruments whose state we potentially
   * want to keep and reconnect to begin verifications of
   * expected state once again.
   */
  private idToDisconnectedInstrument: Record<string, Instrument> = {};

  constructor(protected mechanicGroup: MechanicGroup) {
    // Setup instrument manager before creating any instruments.
    this.instrumentManager
      .getInstrumentToCreateObservable()
      .subscribe(({ instrumentConfig }: InstrumentToCreateEvent) => {
        this.createInstrument(instrumentConfig);
      });

    this.instrumentManager
      .getInstrumentsToDestroyObservable()
      .subscribe(({ instrumentId }: InstrumentToDestroyEvent) => {
        this.destroyInstruments([instrumentId]);
      });

    // By default, build a keyboard instrument and a URL instrument.
    this.instrumentManager.triggerCreateInstrument({
      id: KEYBOARD_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.KEYBOARD,
      initialState: {},
    });

    this.instrumentManager.triggerCreateInstrument({
      id: URL_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.URL,
      initialState: {
        currentUrl: '',
      },
    });
  }

  /**
   * Verify the expected state of all connected instruments.
   */
  public verifyState(): void {
    Object.values(this.idToInstrument).forEach((instrument) =>
      instrument.verifyState()
    );
  }

  /**
   * Get any existing instrument by its id.
   * Throws an error if the instrument is not found.
   */
  public use<TInstrument extends Instrument>(
    instrumentId: string
  ): TInstrument {
    const instrument = this.findInstrument(instrumentId) as TInstrument;
    if (instrument) {
      return instrument;
    }

    throw new Error(
      `Unable to find instrument by id ${instrumentId} in order to use it.  Available connected instruments are "${Object.keys(
        this.idToInstrument
      )}" and disconnected instruments are "${Object.keys(
        this.idToDisconnectedInstrument
      )}"`
    );
  }

  /**
   * Get any existing instrument by its id.
   * Returns null if the instrument is not found.
   */
  public findInstrument<TInstrument extends Instrument>(
    instrumentId: string
  ): TInstrument | null {
    const instrument = this.idToInstrument[instrumentId] as TInstrument;
    if (instrument) {
      return instrument;
    }

    const disconnectedInstrument = this.idToDisconnectedInstrument[
      instrumentId
    ] as TInstrument;
    if (disconnectedInstrument) {
      return disconnectedInstrument;
    }

    return null;
  }

  /**
   * Get the one keyboard instrument.
   */
  public keyboard(): KeyboardInstrument {
    return this.use<KeyboardInstrument>(KEYBOARD_INSTRUMENT_ID);
  }

  /**
   * Get the one url instrument.
   */
  public url(): UrlInstrument {
    return this.use<UrlInstrument>(URL_INSTRUMENT_ID);
  }

  /**
   * Create an instrument using the configuration and mechanics group and connect it by default and configure an instrument with the current mechanics set.
   */
  public createInstrument<
    TInstrument extends Instrument,
    TInstrumentConfig extends InstrumentConfig
  >(instrumentConfig: TInstrumentConfig): TInstrument {
    const existingInstrument = this.findInstrument(instrumentConfig.id);
    if (existingInstrument) {
      throw new Error(
        `Instrument with id "${instrumentConfig.id}" has already been created.  Check for duplicate ids (especially prevalent from copy/paste omissions).`
      );
    }

    const instrument = this.buildInstrument(instrumentConfig);
    this.idToInstrument[instrumentConfig.id] = instrument;
    return instrument as TInstrument;
  }

  /**
   * Build and configure an instrument with the current mechanics set.
   */
  public createInstruments(instrumentConfigs: InstrumentConfig[]): void {
    instrumentConfigs.forEach((instrumentConfig: InstrumentConfig) =>
      this.createInstrument(instrumentConfig)
    );
  }

  /**
   * Disconnect a group of instruments so their state is no longer validated.
   * A disconnected instrument can be reconnected later.
   */
  public disconnect(instrumentIds: string[]): void {
    instrumentIds.forEach((instrumentId) =>
      this.disconnectInstrument(instrumentId)
    );
  }

  /**
   * Reconnect a group of instruments so their state will be verified again.
   */
  public reconnect(instrumentIds: string[]): void {
    instrumentIds.forEach((instrumentId) =>
      this.reconnectInstrument(instrumentId)
    );
  }

  private disconnectInstrument(instrumentId: string): void {
    const instrument = this.idToInstrument[instrumentId];
    if (instrument) {
      // Disconnect the instrument.
      this.idToDisconnectedInstrument[instrumentId] = instrument;
      delete this.idToInstrument[instrumentId];
    } else {
      const disconnectedInstrument =
        this.idToDisconnectedInstrument[instrumentId];
      if (disconnectedInstrument) {
        // The instrument has already been disconnected, so there is nothing to do.
        return;
      }

      throw new Error(
        `Unable to find a connected instrument for id "${instrumentId}" to disconnect.`
      );
    }
  }

  private reconnectInstrument(instrumentId: string): void {
    const instrument = this.idToDisconnectedInstrument[instrumentId];
    if (instrument) {
      // Connect the instrument.
      this.idToInstrument[instrumentId] = instrument;
      delete this.idToDisconnectedInstrument[instrumentId];
    } else {
      throw new Error(
        `Unable to find disconnected instrument for id "${instrumentId}" to reconnect.`
      );
    }
  }

  /**
   * Disconnect and destroy the instruments and references to the instruments
   * Once destroyed, instruments cannot be reconnected.
   */
  public destroyInstruments(instrumentIds: string[]): void {
    instrumentIds.forEach((id) => delete this.idToInstrument[id]);
    instrumentIds.forEach((id) => delete this.idToDisconnectedInstrument[id]);
  }

  /**
   * Update the instruments expected visibility.
   */
  public setAreVisible(instrumentIds: string[], isVisible: boolean): void {
    instrumentIds.forEach((id) => {
      this.use(id).updateState({
        isVisible,
      });
    });
  }

  /**
   * Update the instruments expected existence.
   */
  public setArePresent(instrumentIds: string[], isPresent: boolean): void {
    instrumentIds.forEach((id) => {
      this.use(id).updateState({
        isPresent,
      });
    });
  }

  /**
   * Build an instrument based on its instrument type and config.
   * Can be overridden to support custom instrument types.
   */
  protected buildInstrument(instrumentConfig: InstrumentConfig): Instrument {
    switch (instrumentConfig.instrumentType) {
      case INSTRUMENT_TYPES.BUTTON:
        return new ButtonInstrument(
          this.mechanicGroup,
          <UIElementInstrumentConfig>instrumentConfig
        );

      case INSTRUMENT_TYPES.CHECKBOX:
        return new CheckboxInstrument(
          this.mechanicGroup,
          <UIElementInstrumentConfig<CheckboxState>>instrumentConfig
        );

      case INSTRUMENT_TYPES.KEYBOARD:
        return new KeyboardInstrument(this.mechanicGroup);

      case INSTRUMENT_TYPES.LIST:
        return new ListInstrument(
          this.mechanicGroup,
          <ListInstrumentConfig>instrumentConfig,
          this.instrumentManager
        );

      case INSTRUMENT_TYPES.TEXT_AREA:
        return new TextAreaInstrument(
          this.mechanicGroup,
          <UIElementInstrumentConfig>instrumentConfig
        );

      case INSTRUMENT_TYPES.TEXT_BOX:
        return new TextBoxInstrument(
          this.mechanicGroup,
          <UIElementInstrumentConfig>instrumentConfig
        );

      case INSTRUMENT_TYPES.UI_ELEMENT:
        return new UIElementInstrument(
          this.mechanicGroup,
          <UIElementInstrumentConfig>instrumentConfig
        );

      case INSTRUMENT_TYPES.URL:
        return new UrlInstrument(this.mechanicGroup);

      default:
        throw new Error(
          `Creating an instrument of type ${instrumentConfig.instrumentType}, id=\`${instrumentConfig.id}\` is not supported.`
        );
    }
  }

  public log(message: string) {
    this.mechanicGroup.log?.log(message);
  }
}

export function useInstrumentSet(mechanics: MechanicGroup): InstrumentSet {
  return new InstrumentSet(mechanics);
}
