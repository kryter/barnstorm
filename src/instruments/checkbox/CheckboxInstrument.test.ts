import { CheckboxInstrument } from './CheckboxInstrument';
import CheckboxMechanicMock from '../../mechanics/checkbox/CheckboxMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/checkbox/CheckboxMechanicMock');

describe('CheckboxInstrument', () => {
  const selector = '.the-checkbox-selector';
  let checkboxInstrument: CheckboxInstrument;
  let mockCheckboxMechanic;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      checkbox: new CheckboxMechanicMock(),
    };

    mockCheckboxMechanic = (<jest.Mock<CheckboxMechanicMock>>(
      CheckboxMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    checkboxInstrument = instrumentSet.useCheckbox({
      selector,
    });
  });

  test('can be checked and unchecked', () => {
    // Check section
    checkboxInstrument.check();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(2);

    // Uncheck section (requires the check section for setup)
    checkboxInstrument.uncheck();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(2);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(4);
  });

  test('can be toggled', () => {
    checkboxInstrument.toggle();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(0);
  });

  test('can verify checked', () => {
    checkboxInstrument.verifyIsChecked();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(0);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });

  test('can verify unchecked', () => {
    checkboxInstrument.verifyIsNotChecked();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(0);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });
});
