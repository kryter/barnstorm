import MechanicGroup from '../../MechanicGroup';
import { InstrumentConfig } from './InstrumentConfig';
import { Instrument } from './Instrument';

export abstract class InstrumentBase<
  TState extends Record<string, unknown>,
  TConfig extends InstrumentConfig<TState> = InstrumentConfig<TState>
> implements Instrument<TState>
{
  protected currentState: TState;

  constructor(
    protected mechanicGroup: MechanicGroup,
    protected config: TConfig
  ) {
    this.verifyStateKeys(config.initialState);
    this.currentState = config.initialState;
  }

  public getId(): string {
    return this.config.id;
  }

  public getStateString(): string {
    return JSON.stringify(this.currentState, null, 2);
  }

  public getState(): TState {
    return this.currentState;
  }

  public updateState(stateUpdates: TState): void {
    // Verify the keys.
    this.verifyStateKeys(stateUpdates);

    // Update the values.
    this.currentState = this.createUpdatedState(stateUpdates);
  }

  /**
   * Update only the fields specified by the update.
   * Can be overwritten in instruments with more complex state.
   */
  protected createUpdatedState(stateUpdates: TState): TState {
    return {
      ...this.currentState,
      ...stateUpdates,
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
