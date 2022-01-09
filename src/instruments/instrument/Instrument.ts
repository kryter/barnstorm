/**
 * An Instrument tracks the mechanic(s) needed for a particular UI element
 * as well as the expected results for the UI element, if it is interactive.
 * The expected state is updated automatically based on
 * default reactions to instrument actions.
 * The expected state can also be updated manually to override
 * automated expectations.
 * An instrument with a state type of void is an instrument which is interactive
 * but does not have any state to verify (presumably the results of the interactivity
 * of this instruments is reflected in the state of other instruments based on the context).
 * An example of an instrument with a void return type is a simple, naive button that can be
 * pressed to produce an action but does not have state that we are looking to check in a test.
 */
export interface Instrument<
  TState extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * The id that the test or flight plans will use to get the instrument from the instrument set.
   */
  getId: () => string;

  /**
   * The current expected state of the instrument as a string that is ready to be
   * written to the console.  This can be used for logging to make debugging tests easier.
   */
  getStateString: () => string;

  /**
   * The current expected state of the instrument.
   * This is sometimes useful for calculating the next state in order
   * to update state.
   */
  getState: () => TState;

  /**
   * Update the current expected state of the instrument.
   * This new state will be verified at the end of the next test step.
   */
  updateState: (nextState: TState) => void;

  /**
   * Verify all the expected state of the instrument.
   */
  verifyState: () => void;
}
