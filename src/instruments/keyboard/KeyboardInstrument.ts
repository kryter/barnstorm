import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../../Instrument';

export const KEYBOARD_INSTRUMENT_ID = 'KEYBOARD_INSTRUMENT';

export class KeyboardInstrument implements Instrument<void> {
  constructor(protected mechanicGroup: MechanicGroup) {}

  public getId(): string {
    return KEYBOARD_INSTRUMENT_ID;
  }

  public getState(): void {
    // TODO what is a keyboard's state?
  }

  public setState(): void {
    // TODO what is a keyboard's state?
  }

  public verifyState(): void {
    // TODO what can we verify about a keyboard?
  }

  public pressEnter(): void {
    this.mechanicGroup.keyboard.pressEnter();
  }
}
