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
const LIST_INSTRUMENT_WITH_INITIAL_STATE_ID =
  'LIST_INSTRUMENT_WITH_INITIAL_STATE';
const LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID =
  'LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID';
const CHECKBOX_INSTRUMENT_ID = 'CHECKBOX_INSTRUMENT';
const TEXT_INSTRUMENT_ID = 'TEXT_INSTRUMENT';

describe('ListInstrument', () => {
  const selector = '.the-list-selector';
  const iFrameSelector = 'iframe#the-iframe';
  const relativeItemSelector = '.a-list-item-selector';

  const checkboxItemSelectors = [
    '.the-list-selector .a-list-item-selector:nth-child(1) .the-checkbox-selector',
    '.the-list-selector .a-list-item-selector:nth-child(2) .the-checkbox-selector',
    '.the-list-selector .a-list-item-selector:nth-child(3) .the-checkbox-selector',
  ];
  const textItemSelectors = [
    '.the-list-selector .a-list-item-selector:nth-child(1) .the-text-selector',
    '.the-list-selector .a-list-item-selector:nth-child(2) .the-text-selector',
    '.the-list-selector .a-list-item-selector:nth-child(3) .the-text-selector',
  ];

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

    instrumentSet.createInstrument({
      id: LIST_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.LIST,
      selector,
      iFrameSelector,
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
      checkboxItemSelectors[2],
      iFrameSelector
    );
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);
  });

  test('can verify initial content', () => {
    const initialState = {
      rows: listContent,
    };
    instrumentSet.createInstrument({
      id: LIST_INSTRUMENT_WITH_INITIAL_STATE_ID,
      instrumentType: INSTRUMENT_TYPES.LIST,
      selector,
      iFrameSelector,
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

    expect(
      instrumentSet
        .use<ListInstrument>(LIST_INSTRUMENT_WITH_INITIAL_STATE_ID)
        .getStateString()
    ).toBe(JSON.stringify(initialState, null, 2));
  });

  test('can verify list content', () => {
    const updatedState = {
      rows: listContent,
      isPresent: true,
      isVisible: true,
      css: {},
    };
    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .updateState(updatedState);
    instrumentSet.verifyState();
    expect(
      instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()
    ).toBe(JSON.stringify(updatedState, null, 2));

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[0],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[1],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[2],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[0],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[2],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(7);

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[0],
      listContent[0][TEXT_INSTRUMENT_ID].textContent,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[1],
      listContent[1][TEXT_INSTRUMENT_ID].textContent,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[2],
      listContent[2][TEXT_INSTRUMENT_ID].textContent,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(3);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      checkboxItemSelectors[0],
      listContent[0][CHECKBOX_INSTRUMENT_ID].isChecked,
      iFrameSelector
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      listContent[1][CHECKBOX_INSTRUMENT_ID].isChecked,
      iFrameSelector
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      checkboxItemSelectors[2],
      listContent[2][CHECKBOX_INSTRUMENT_ID].isChecked,
      iFrameSelector
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(3);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      listContent.length,
      iFrameSelector
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
      expectedLength,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);
  });

  test('can add a row with partial content', () => {
    const initialState = {
      rows: [],
      isPresent: true,
      isVisible: true,
    };

    const newRowText = 'four';
    const newRow = {
      [TEXT_INSTRUMENT_ID]: {
        textContent: newRowText,
      },
    };

    const firstRowState = {
      rows: [newRow],
      isPresent: true,
      isVisible: true,
      css: {},
    };

    expect(
      instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()
    ).toBe(JSON.stringify(initialState, null, 2));

    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).addRow(newRow);

    expect(
      instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()
    ).toBe(JSON.stringify(firstRowState, null, 2));

    instrumentSet.verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[0],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(2);

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[0],
      newRowText,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(0);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      1,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);

    const newRow2 = {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: true,
      },
    };

    const secondRowState = {
      rows: [newRow, newRow2],
      isPresent: true,
      isVisible: true,
      css: {},
    };

    instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).addRow(newRow2);

    expect(
      instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID).getStateString()
    ).toBe(JSON.stringify(secondRowState, null, 2));

    instrumentSet.verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[0],
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(5);

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[0],
      newRowText,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(2);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      true,
      iFrameSelector
    );

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      2,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(2);
  });

  test('can add a column with invisible content', () => {
    const initialState = {
      rows: [],
      isPresent: true,
      isVisible: true,
    };

    instrumentSet.createInstrument({
      id: LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID,
      instrumentType: INSTRUMENT_TYPES.LIST,
      selector,
      iFrameSelector,
      relativeItemSelector,
      initialState,
      columns: [
        {
          id: CHECKBOX_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.CHECKBOX,
          selector: '.the-checkbox-selector',
          verifyStateWhenInvisible: true,
        },
        {
          id: TEXT_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
          selector: '.the-text-selector',
        },
      ],
    });

    const newRowText = 'four';
    const newRow = {
      [TEXT_INSTRUMENT_ID]: {
        textContent: newRowText,
      },
    };

    const firstRowState = {
      rows: [newRow],
      isPresent: true,
      isVisible: true,
      css: {},
    };

    expect(
      instrumentSet
        .use<ListInstrument>(LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID)
        .getStateString()
    ).toBe(JSON.stringify(initialState, null, 2));

    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID)
      .addRow(newRow);

    expect(
      instrumentSet
        .use<ListInstrument>(LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID)
        .getStateString()
    ).toBe(JSON.stringify(firstRowState, null, 2));

    instrumentSet.verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[0],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(3);

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[0],
      newRowText,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(0);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      1,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      0,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(2);

    const newRow2 = {
      [CHECKBOX_INSTRUMENT_ID]: {
        isChecked: true,
        isVisible: false,
      },
    };

    const secondRowState = {
      rows: [newRow, newRow2],
      isPresent: true,
      isVisible: true,
      css: {},
    };

    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID)
      .addRow(newRow2);

    expect(
      instrumentSet
        .use<ListInstrument>(LIST_INSTRUMENT_WITH_INVISIBLE_CONTENT_ID)
        .getStateString()
    ).toBe(JSON.stringify(secondRowState, null, 2));

    instrumentSet.verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(
      textItemSelectors[0],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      iFrameSelector
    );

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(6);
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      textItemSelectors[0],
      newRowText,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(2);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      checkboxItemSelectors[1],
      true,
      iFrameSelector
    );

    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(1);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      2,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      1,
      iFrameSelector
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(4);
  });
});
