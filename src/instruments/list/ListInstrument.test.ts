import { ListInstrument } from './ListInstrument';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../InstrumentOptions';
import { CheckboxInstrument } from '../checkbox/CheckboxInstrument';
import CheckboxMechanicMock from '../../mechanics/checkbox/CheckboxMechanicMock';
import KeyboardMechanicMock from '../../mechanics/keyboard/KeyboardMechanicMock';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import UrlMechanicMock from '../../mechanics/url/UrlMechanicMock';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/checkbox/CheckboxMechanicMock');
jest.mock('../../mechanics/list/ListMechanicMock');

const LIST_INSTRUMENT_ID = 'LIST_INSTRUMENT';
const CHECKBOX_INSTRUMENT_ID = 'CHECKBOX_INSTRUMENT';
const TEXT_INSTRUMENT_ID = 'TEXT_INSTRUMENT';

describe('ListInstrument', () => {
  const selector = '.the-list-selector';
  const relativeItemSelector = '.a-list-item-selector';

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
      initialState: [],
      columns: [
        {
          id: CHECKBOX_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.CHECKBOX,
          selector: '.the-checkbox-selector',
        },
        {
          id: TEXT_INSTRUMENT_ID,
          instrumentType: INSTRUMENT_TYPES.SIMPLE_ELEMENT,
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

  test('can get a selector for an item in a list', () => {
    const listItemCheckboxInstrument =
      instrumentSet.useColumnInstrument<CheckboxInstrument>({
        listInstrument: instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID),
        rowIndex: 2,
        columnId: CHECKBOX_INSTRUMENT_ID,
      });

    listItemCheckboxInstrument.toggle();

    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-checkbox-selector'
    );
    expect(mockCheckboxMechanic.toggle).toHaveBeenCalledTimes(1);
  });

  test('can verify list content', () => {
    const expectedContent = [
      {
        [CHECKBOX_INSTRUMENT_ID]: false,
        [TEXT_INSTRUMENT_ID]: 'one',
      },
      {
        [CHECKBOX_INSTRUMENT_ID]: true,
        [TEXT_INSTRUMENT_ID]: 'two',
      },
      {
        [CHECKBOX_INSTRUMENT_ID]: false,
        [TEXT_INSTRUMENT_ID]: 'three',
      },
    ];
    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .setState(expectedContent);
    instrumentSet.verifyState();

    // The verification should check the text column state for each row.
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-text-selector',
      expectedContent[0][TEXT_INSTRUMENT_ID]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2) .the-text-selector',
      expectedContent[1][TEXT_INSTRUMENT_ID]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-text-selector',
      expectedContent[2][TEXT_INSTRUMENT_ID]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(3);

    // The verification should check the checkbox column state for each row.
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1) .the-checkbox-selector',
      expectedContent[0][CHECKBOX_INSTRUMENT_ID]
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2) .the-checkbox-selector',
      expectedContent[1][CHECKBOX_INSTRUMENT_ID]
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3) .the-checkbox-selector',
      expectedContent[2][CHECKBOX_INSTRUMENT_ID]
    );
    expect(mockCheckboxMechanic.verifyCheckedState).toHaveBeenCalledTimes(3);

    // The verification should check the the row count.
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      expectedContent.length
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
});
