export const INSTRUMENT_TYPES = {
  BUTTON: 'BUTTON',
  CHECKBOX: 'CHECKBOX',
  SIMPLE_ELEMENT: 'SIMPLE_ELEMENT',
  KEYBOARD: 'KEYBOARD',
  LIST: 'LIST',
  TEXT_AREA: 'TEXT_AREA',
  TEXT_BOX: 'TEXT_BOX',
  URL: 'URL',
};

export interface InstrumentOptions<TState = void> {
  /**
   * Instrument Id.  Useful for accessing an instrument after it is created
   * so that it can be used to manipulate or verify a UI element.
   */
  id: string;

  /**
   * The instrument type that determines what instrument gets set up.
   */
  instrumentType: string;

  /**
   * The expected content when the UI component loads.
   * Optional, and not needed if the control is expected to start in
   * the empty state.
   *
   * NOTE: this will not trigger the instrument to take any actions to
   * put the application in this state.  Rather, it is the state the instrument
   * should expect the UI element to be in when when the instrument first encounters
   * the UI element.
   */
  initialState?: TState;
}
