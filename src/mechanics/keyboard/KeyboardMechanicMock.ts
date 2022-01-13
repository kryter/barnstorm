import { KeyboardMechanic } from './KeyboardMechanic';

export default class KeyboardMechanicMock implements KeyboardMechanic {
  pressEnter(): void {}

  pressEscape(): void {}

  pressSpacebar(): void {}

  pressDelete(): void {}

  pressBackspace(): void {}

  pressUpArrow(): void {}

  pressDownArrow(): void {}

  pressRightArrow(): void {}

  pressLeftArrow(): void {}

  typeKeys(keys: string): void {}
}
