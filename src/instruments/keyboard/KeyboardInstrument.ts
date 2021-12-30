import MechanicsSet from '../../MechanicsSet';

export class KeyboardInstrument {
  constructor(protected mechanicsSet: MechanicsSet) {}

  public pressEnter(): void {
    this.mechanicsSet.keyboard.pressEnter();
  }
}
