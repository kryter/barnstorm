import { CheckboxInstrument } from './CheckboxInstrument';
import CheckboxMechanicMock from '../../mechanics/checkbox/CheckboxMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';

jest.mock('../../mechanics/checkbox/CheckboxMechanicMock');

const CHECKBOX_INSTRUMENT_ID = 'CHECKBOX_INSTRUMENT';
const CHECKED_CHECKBOX_INSTRUMENT_ID = 'CHECKED_CHECKBOX_INSTRUMENT';

describe('CheckboxInstrument', () => {
  const selector = '.the-checkbox-selector';

  let instrumentSet: InstrumentSet;
  let mockCheckboxMechanic;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      checkbox: new CheckboxMechanicMock(),
    };

    mockCheckboxMechanic = (<jest.Mock<CheckboxMechanicMock>>(
      CheckboxMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setup({
      id: CHECKBOX_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.CHECKBOX,
      selector,
      initialState: {
        isChecked: false,
      },
    });

    instrumentSet.setup({
      id: CHECKED_CHECKBOX_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.CHECKBOX,
      selector,
      initialState: {
        isChecked: true,
      },
    });
  });

  test('can be initialized in a checked state', () => {
    // Set expected result of mock to be in sync with non-default initial state.
    mockCheckboxMechanic.toggle();

    // When we verify the instrument, the mechanic should be called
    // to verify the checkbox is checked.
    instrumentSet
      .use<CheckboxInstrument>(CHECKED_CHECKBOX_INSTRUMENT_ID)
      .verifyState();
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
  });

  test('can set state', () => {
    const checkboxInstrument = instrumentSet.use<CheckboxInstrument>(
      CHECKBOX_INSTRUMENT_ID
    );

    // First make sure the checkbox state starts as false.
    checkboxInstrument.verifyState();
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);

    // Then set the state and verify it again to make sure the state has been updated.
    checkboxInstrument.updateState({
      isChecked: true,
    });
    checkboxInstrument.verifyState();

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(2);
  });

  test('can be checked and unchecked', () => {
    // Check section
    instrumentSet.use<CheckboxInstrument>(CHECKBOX_INSTRUMENT_ID).check();

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
    instrumentSet.use<CheckboxInstrument>(CHECKBOX_INSTRUMENT_ID).uncheck();

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
    instrumentSet.use<CheckboxInstrument>(CHECKBOX_INSTRUMENT_ID).toggle();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(selector);
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(0);
  });

  test('can verify checked', () => {
    instrumentSet
      .use<CheckboxInstrument>(CHECKBOX_INSTRUMENT_ID)
      .verifyIsChecked();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(0);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });

  test('can verify unchecked', () => {
    instrumentSet
      .use<CheckboxInstrument>(CHECKBOX_INSTRUMENT_ID)
      .verifyIsNotChecked();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(0);

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);
  });
});
