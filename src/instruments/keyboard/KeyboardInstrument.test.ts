import { KeyboardInstrument } from './KeyboardInstrument';
import KeyboardMechanicMock from '../../mechanics/keyboard/KeyboardMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/keyboard/KeyboardMechanicMock');

describe('KeyboardInstrument', () => {
  let keyboardInstrument: KeyboardInstrument;
  let mockKeyboardMechanic: KeyboardMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      keyboard: new KeyboardMechanicMock(),
    };

    mockKeyboardMechanic = (<jest.Mock<KeyboardMechanicMock>>(
      KeyboardMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    keyboardInstrument = instrumentSet.useKeyboard();
  });

  test('can press the enter key', () => {
    keyboardInstrument.pressEnter();

    expect(mockKeyboardMechanic.pressEnter).toHaveBeenCalledTimes(1);
  });
});
