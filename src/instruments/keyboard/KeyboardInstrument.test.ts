import {
  KeyboardInstrument,
  KEYBOARD_INSTRUMENT_ID,
} from './KeyboardInstrument';
import KeyboardMechanicMock from '../../mechanics/keyboard/KeyboardMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/keyboard/KeyboardMechanicMock');

describe('KeyboardInstrument', () => {
  let instrumentSet: InstrumentSet;
  let mockKeyboardMechanic: KeyboardMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      keyboard: new KeyboardMechanicMock(),
    };

    mockKeyboardMechanic = (<jest.Mock<KeyboardMechanicMock>>(
      KeyboardMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);
  });

  test('can press the enter key', () => {
    instrumentSet.use<KeyboardInstrument>(KEYBOARD_INSTRUMENT_ID).pressEnter();

    expect(mockKeyboardMechanic.pressEnter).toHaveBeenCalledTimes(1);
  });

  test('can type keys', () => {
    const contentToType = 'hello world';
    instrumentSet
      .use<KeyboardInstrument>(KEYBOARD_INSTRUMENT_ID)
      .typeKeys(contentToType);

    expect(mockKeyboardMechanic.typeKeys).toHaveBeenCalledWith(contentToType);
    expect(mockKeyboardMechanic.typeKeys).toHaveBeenCalledTimes(1);
  });
});
