import { KeyboardMechanic } from './KeyboardMechanic';

export default class KeyboardMechanicMock implements KeyboardMechanic {
  pressEnter(): void {}

  typeKeys(keys: string): void {}
}
