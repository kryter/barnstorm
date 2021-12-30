import { ButtonInstrument } from './ButtonInstrument';
import ButtonMechanicMock from '../../mechanics/button/ButtonMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/button/ButtonMechanicMock');

describe('ButtonInstrument', () => {
  const selector = '.the-button-selector';
  let buttonInstrument: ButtonInstrument;
  let mockButtonMechanic: ButtonMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      button: new ButtonMechanicMock(),
    };

    mockButtonMechanic = (<jest.Mock<ButtonMechanicMock>>ButtonMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    buttonInstrument = instrumentSet.useButton({
      selector,
    });
  });

  test('can be clicked', () => {
    buttonInstrument.click();

    expect(mockButtonMechanic.click).toHaveBeenCalledWith(selector);
    expect(mockButtonMechanic.click).toHaveBeenCalledTimes(1);
  });
});
