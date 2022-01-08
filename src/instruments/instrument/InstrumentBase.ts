import MechanicGroup from '../../MechanicGroup';
import { InstrumentOptions } from './InstrumentOptions';
import { Instrument } from './Instrument';

export abstract class InstrumentBase<
  TState extends Record<string, unknown>,
  TOptions extends InstrumentOptions<TState> = InstrumentOptions<TState>
> implements Instrument<TState>
{
  protected currentState: TState;

  constructor(
    protected mechanicGroup: MechanicGroup,
    protected options: TOptions
  ) {
    this.verifyStateKeys(options.initialState);
    this.currentState = options.initialState;
  }

  public getId(): string {
    return this.options.id;
  }

  public getStateString(): string {
    return JSON.stringify(this.currentState, null, 2);
  }

  public updateState(nextState: TState): void {
    this.verifyStateKeys(nextState);

    // Update only the fields specified by the update.
    this.currentState = {
      ...this.currentState,
      ...nextState,
    };
  }

  private verifyStateKeys(nextState: TState) {
    Object.keys(nextState).forEach((stateKey: string) => {
      const isSupported = this.isStateKeySupported(stateKey);
      if (!isSupported) {
        throw new Error(
          `State key ${stateKey} is not supported for verification by this instrument type.  instrumentId=\`${this.getId()}\` stateValue=\`${
            nextState[stateKey]
          }\``
        );
      }
    });
  }

  public abstract verifyState(): void;

  protected abstract isStateKeySupported(stateKey: string): boolean;
}
