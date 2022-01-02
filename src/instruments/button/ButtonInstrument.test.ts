import { ButtonInstrument } from './ButtonInstrument';
import ButtonMechanicMock from '../../mechanics/button/ButtonMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/button/ButtonMechanicMock');

const BUTTON_INSTRUMENT_ID = 'BUTTON_INSTRUMENT';

describe('ButtonInstrument', () => {
  const selector = '.the-button-selector';

  let instrumentSet: InstrumentSet;
  let mockButtonMechanic: ButtonMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      button: new ButtonMechanicMock(),
    };

    mockButtonMechanic = (<jest.Mock<ButtonMechanicMock>>ButtonMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setupButton({
      id: BUTTON_INSTRUMENT_ID,
      selector,
    });
  });

  test('can be clicked', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).click();

    expect(mockButtonMechanic.click).toHaveBeenCalledWith(selector);
    expect(mockButtonMechanic.click).toHaveBeenCalledTimes(1);
  });
});
