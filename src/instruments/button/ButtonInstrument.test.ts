import { Mechanics } from '../../Mechanics';
import { ButtonInstrument } from './ButtonInstrument';
import ButtonMechanicStandard from '../../mechanics/button/ButtonMechanicStandard';

jest.mock('../../mechanics/button/ButtonMechanicStandard');

describe('ButtonInstrument', () => {
  const selector = '.the-button-selector';
  let buttonInstrument: ButtonInstrument;
  let mockButtonMechanic: ButtonMechanicStandard;

  beforeEach(() => {
    Mechanics.Button = new ButtonMechanicStandard();
    expect(ButtonMechanicStandard).toHaveBeenCalledTimes(1);

    mockButtonMechanic = ButtonMechanicStandard.mock.instances[0];

    buttonInstrument = new ButtonInstrument({
      selector
    });
  });

  test('can be clicked', () => {
    buttonInstrument.click();

    expect(mockButtonMechanic.click).toHaveBeenCalledWith(selector);
    expect(mockButtonMechanic.click).toHaveBeenCalledTimes(1);
  });

});
