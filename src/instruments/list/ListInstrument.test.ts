import { ListInstrument } from './ListInstrument';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import { CheckboxInstrument } from '../checkbox/CheckboxInstrument';
import CheckboxMechanicMock from '../../mechanics/checkbox/CheckboxMechanicMock';
import KeyboardMechanicMock from '../../mechanics/keyboard/KeyboardMechanicMock';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import UrlMechanicMock from '../../mechanics/url/UrlMechanicMock';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/checkbox/CheckboxMechanicMock');
jest.mock('../../mechanics/list/ListMechanicMock');

const LIST_INSTRUMENT_ID = 'LIST_INSTRUMENT';
const LIST_INSTRUMENT_WITH_INITIAL_STATE_ID = 'LIST_INSTRUMENT_WITH_INITIAL_STATE';
const CHECKBOX_INSTRUMENT_ID = 'CHECKBOX_INSTRUMENT';
const TEXT_INSTRUMENT_ID = 'TEXT_INSTRUMENT';

describe('ListInstrument', () => {
  const selector = '.the-list-selector';
  const relativeItemSelector = '.a-list-item-selector';
  const listContent = [
    {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: false,
      },
      [TEXT_INSTRUMENT_ID]: {
        textContent: 'one',
      },
    },
    {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: true,
      },
      [TEXT_INSTRUMENT_ID]: {
        textContent: 'two',
      },
    },
    {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: false,
      },
      [TEXT_INSTRUMENT_ID]: {
        textContent: 'three',
      },
    },
  ];

  let instrumentSet: InstrumentSet;
  let mockCheckboxMechanic: CheckboxMechanicMock;
  let mockListMechanic: ListMechanicMock;
  let mockElementMechanic: ElementMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      checkbox: new CheckboxMechanicMock(),
      list: new ListMechanicMock(),
      url: new UrlMechanicMock(),
      keyboard: new KeyboardMechanicMock(),
      element: new ElementMechanicMock(),
    };

    mockListMechanic = (<jest.Mock<ListMechanicMock>>ListMechanicMock).mock
      .instances[mockIndex];
    mockCheckboxMechanic = (<jest.Mock<CheckboxMechanicMock>>(
      CheckboxMechanicMock
    )).mock.instances[mockIndex];
    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setup({
      id: LIST_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.LIST,
      selector,
      relativeItemSelector,
      initialState: {
        rows: [],
      },
      columns: [
        {
          id: CHECKBOX_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.CHECKBOX,
          selector: '.the-checkbox-selector',
        },
        {
          id: TEXT_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
          selector: '.the-text-selector',
        },
      ],
    });
  });

  test('can get an item selector by index', () => {
    const listItemSelector = instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .listItemSelectorByIndex(2);

    expect(listItemSelector).toBe(
      '.the-list-selector .a-list-item-selector:nth-child(3)'
    );
  });

  test('can get an item selector by number', () => {
    const listItemSelector = instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .listItemSelectorByNumber(3);

    expect(listItemSelector).toBe(
      '.the-list-selector .a-list-item-selector:nth-child(3)'
    );
  });

  test('can get an instrument to represent a column value of a row in a list', () => {
    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).updateState({
      rows: listContent,
    });

    const cellInstrumentId = instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .getCellId(2, CHECKBOX_INSTRUMENT_ID);

    instrumentSet.use<CheckboxInstrument>(cellInstrumentId).toggle();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-checkbox-selector'
    );
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);
  });

  test('can verify initial content', () => {
    const initialState = {
      rows: listContent
    };
    instrumentSet.setup({
      id: LIST_INSTRUMENT_WITH_INITIAL_STATE_ID,
      instrumentType: INSTRUMENT_TYPES.LIST,
      selector,
      relativeItemSelector,
      initialState,
      columns: [
        {
          id: CHECKBOX_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.CHECKBOX,
          selector: '.the-checkbox-selector',
        },
        {
          id: TEXT_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
          selector: '.the-text-selector',
        },
      ],
    });

    expect(instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_WITH_INITIAL_STATE_ID).getStateString()).toBe(JSON.stringify(initialState, null, 2));
  });

  test('can verify list content', () => {
    const updatedState = {
      rows: listContent,
    };
    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).updateState(updatedState);
    instrumentSet.verifyState();
    expect(instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()).toBe(JSON.stringify(updatedState, null, 2));

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-text-selector',
      listContent[0][TEXT_INSTRUMENT_ID].textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2) .the-text-selector',
      listContent[1][TEXT_INSTRUMENT_ID].textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-text-selector',
      listContent[2][TEXT_INSTRUMENT_ID].textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(3);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-checkbox-selector',
      listContent[0][CHECKBOX_INSTRUMENT_ID].isChecked
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2) .the-checkbox-selector',
      listContent[1][CHECKBOX_INSTRUMENT_ID].isChecked
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-checkbox-selector',
      listContent[2][CHECKBOX_INSTRUMENT_ID].isChecked
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(3);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      listContent.length
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);
  });

  test('can verify list content length', () => {
    const expectedLength = 5;
    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .verifyContentLength(expectedLength);

    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      expectedLength
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);
  });

  test('can add a row with partial content', () => {
    const initialState = {
      rows: []
    };

    const newRowText = 'four';
    const newRow = {
      [TEXT_INSTRUMENT_ID]: {
        textContent: newRowText,
      },
    };

    const firstRowState = {
      rows: [ newRow ]
    };

    expect(instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()).toBe(JSON.stringify(initialState, null, 2));

    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).addRow(newRow);

    expect(instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()).toBe(JSON.stringify(firstRowState, null, 2));

    instrumentSet.verifyState();

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-text-selector',
      newRowText
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(0);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      1
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);

    const newRow2 = {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: true,
      },
    };

    const secondRowState = {
      rows: [ newRow, newRow2 ]
    };

    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).addRow(newRow2);

    expect(instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()).toBe(JSON.stringify(secondRowState, null, 2));

    instrumentSet.verifyState();

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-text-selector',
      newRowText
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(2);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2) .the-checkbox-selector',
      true
    );

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      2
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(2);
  });
});
