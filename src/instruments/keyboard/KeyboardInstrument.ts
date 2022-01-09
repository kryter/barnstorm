import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../instrument/Instrument';

export const KEYBOARD_INSTRUMENT_ID = 'KEYBOARD_INSTRUMENT';

export class KeyboardInstrument implements Instrument {
  constructor(protected mechanicGroup: MechanicGroup) {}

  public getId(): string {
    return KEYBOARD_INSTRUMENT_ID;
  }

  public getStateString(): string {
    throw new Error(
      `getStateString: Getting and setting state is not supported for keyboard instrument.`
    );
  }

  public getState(): Record<string, unknown> {
    throw new Error(
      `getState: Getting and setting state is not supported for keyboard instrument.`
    );
  }

  public updateState(nextState: Record<string, unknown>): void {
    throw new Error(
      `updateState: Getting and setting state is not supported for keyboard instrument.`
    );
  }

  public verifyState(): void {
    // Keyboard does not have state.
    // Or does it and we can add something meaningful here?
  }

  public pressEnter(): void {
    this.mechanicGroup.keyboard.pressEnter();
  }

  public typeKeys(keys: string): void {
    this.mechanicGroup.keyboard.typeKeys(keys);
  }
}
