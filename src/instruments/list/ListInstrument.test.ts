import { ListInstrument } from './ListInstrument';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/list/ListMechanicMock');

const LIST_INSTRUMENT_ID = 'LIST_INSTRUMENT';

describe('ListInstrument', () => {
  const selector = '.the-list-selector';
  const relativeItemSelector = '.a-list-item-selector';

  let instrumentSet: InstrumentSet;
  let mockElementMechanic: ElementMechanicMock;
  let mockListMechanic: ListMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      element: new ElementMechanicMock(),
      list: new ListMechanicMock(),
    };

    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];

    mockListMechanic = (<jest.Mock<ListMechanicMock>>ListMechanicMock).mock
      .instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setupList({
      id: LIST_INSTRUMENT_ID,
      selector,
      relativeItemSelector,
      initialState: [],
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

  test('can verify list content', () => {
    const expectedContent = ['one', 'two', 'three'];
    instrumentSet
      .use<ListInstrument>(LIST_INSTRUMENT_ID)
      .verifyListContent(expectedContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(1)',
      expectedContent[0]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(2)',
      expectedContent[1]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector:nth-child(3)',
      expectedContent[2]
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(3);
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
