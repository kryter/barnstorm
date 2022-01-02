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
export interface Instrument<TState = void> {
  getId: () => string;
  setState: (nextState: TState) => void;
  verifyState: () => void;
}
