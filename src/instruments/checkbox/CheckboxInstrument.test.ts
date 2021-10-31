import { Mechanics } from '../../Mechanics';
import { CheckboxInstrument } from './CheckboxInstrument';
import CheckboxMechanicStandard from "../../mechanics/checkbox/CheckboxMechanicStandard";

jest.mock("../../mechanics/checkbox/CheckboxMechanicStandard");

describe('CheckboxInstrument', () => {
  const selector = '.the-checkbox-selector';
  let checkboxInstrument: CheckboxInstrument;
  let mockCheckboxMechanic;

  beforeEach(() => {
    Mechanics.Checkbox = new CheckboxMechanicStandard();
    expect(CheckboxMechanicStandard).toHaveBeenCalledTimes(1);

    mockCheckboxMechanic = CheckboxMechanicStandard.mock.instances[0];

    checkboxInstrument = new CheckboxInstrument({
      selector
    });
  });

  test('can be checked', () => {
    checkboxInstrument.check();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, false);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, true);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(2);
  });

  test('can be unchecked', () => {
    checkboxInstrument.uncheck();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, true);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, false);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(2);
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

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, true);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });

  test('can verify unchecked', () => {
    checkboxInstrument.verifyIsNotChecked();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(0);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(selector, false);
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });
});
