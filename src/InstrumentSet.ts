import MechanicGroup from './MechanicGroup';
import { ButtonInstrument } from './instruments/button/ButtonInstrument';
import { CheckboxInstrument } from './instruments/checkbox/CheckboxInstrument';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from './instruments/element/ElementInstrument';
import { KeyboardInstrument } from './instruments/keyboard/KeyboardInstrument';
import { TextAreaInstrument } from './instruments/textArea/TextAreaInstrument';
import { TextBoxInstrument } from './instruments/textBox/TextBoxInstrument';
import { UrlInstrument } from './instruments/url/UrlInstrument';
import {
  ListInstrument,
  ListInstrumentOptions,
} from './instruments/list/ListInstrument';
import { FlightPlan } from './FlightPlan';
import { Instrument } from './Instrument';
import { FlightPlanLeg } from './FlightPlanLeg';

export class InstrumentSet {
  private instruments: Instrument<unknown>[] = [];

  private idToInstrument: Record<string, Instrument<unknown>> = {};

  constructor(protected mechanicGroup: MechanicGroup) {
    this.trackInstrument(new KeyboardInstrument(this.mechanicGroup));
    this.trackInstrument(new UrlInstrument(this.mechanicGroup));
  }

  public fly(flightPlan: FlightPlan): void {
    // Verify initial state.
    this.verifyState();

    flightPlan.legs.forEach((leg: FlightPlanLeg) => {
      // Do the test action.
      leg.doTestAction();

      // Update expectations based on the action and verify updated state.
      leg.updateExpectations();
      this.verifyState();
    });
  }

  protected verifyState(): void {
    this.instruments.forEach((instrument) => instrument.verifyState());
  }

  public use<TInstrument extends Instrument<unknown>>(
    instrumentId: string
  ): TInstrument {
    return this.idToInstrument[instrumentId] as TInstrument;
  }

  /**
   * Build and configure a button instrument with the current mechanics set.
   */
  public setupButton(instrumentOptions: ElementInstrumentOptions): void {
    this.trackInstrument(
      new ButtonInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  /**
   * Build and configure  a checkbox instrument with the current mechanics set.
   */
  public setupCheckbox(
    instrumentOptions: ElementInstrumentOptions<boolean>
  ): void {
    this.trackInstrument(
      new CheckboxInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  /**
   * Build and configure  a element instrument with the current mechanics set.
   */
  public setupElement(instrumentOptions: ElementInstrumentOptions): void {
    this.trackInstrument(
      new ElementInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  /**
   * Build and configure  a list instrument with the current mechanics set.
   */
  public setupList(instrumentOptions: ListInstrumentOptions): void {
    this.trackInstrument(
      new ListInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  /**
   * Build and configure  a text area instrument with the current mechanics set.
   */
  public setupTextArea(
    instrumentOptions: ElementInstrumentOptions<string>
  ): void {
    this.trackInstrument(
      new TextAreaInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  /**
   * Build and configure  a text box instrument with the current mechanics set.
   */
  public setupTextBox(
    instrumentOptions: ElementInstrumentOptions<string>
  ): void {
    this.trackInstrument(
      new TextBoxInstrument(this.mechanicGroup, instrumentOptions)
    );
  }

  protected trackInstrument(instrument: Instrument<unknown>) {
    if (instrument) {
      this.instruments.push(instrument);
      this.idToInstrument[instrument.getId()] = instrument;
    }
  }
}
