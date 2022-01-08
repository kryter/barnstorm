import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../instrument/Instrument';

export const KEYBOARD_INSTRUMENT_ID = 'KEYBOARD_INSTRUMENT';

export class KeyboardInstrument implements Instrument {
  constructor(protected mechanicGroup: MechanicGroup) {}

  public getId(): string {
    return KEYBOARD_INSTRUMENT_ID;
  }

  public updateState(): void {
    throw new Error(`Setting state is not supported for keyboard instrument.`);
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
