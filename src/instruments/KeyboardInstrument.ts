import { Mechanics } from "../flying/Mechanics";

export class KeyboardInstrument {
  private static instance: KeyboardInstrument = null;

  public static use() {
    if (!KeyboardInstrument.instance) {
      KeyboardInstrument.instance = new KeyboardInstrument();
    }
    return KeyboardInstrument.instance;
  }

  private constructor() { }

  public pressEnter(): void {
    Mechanics.Keyboard.pressEnter();
  }
}
