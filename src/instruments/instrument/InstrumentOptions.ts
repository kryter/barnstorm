export interface InstrumentOptions<
  TState extends Record<string, unknown> = Record<string, unknown>
> {
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
   * The expected state of the UI component when it loads.
   *
   * NOTE: this will not trigger the instrument to take any actions to
   * put the application in this state.  Rather, the instrument will
   * verify that the UI element is initialized to match this expected state.
   */
  initialState: TState;
}
