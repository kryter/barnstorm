import { ListInstrument } from './ListInstrument';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/list/ListMechanicMock');

describe('ListInstrument', () => {
  const selector = '.the-list-selector';
  const relativeItemSelector = '.a-list-item-selector';
  let listInstrument: ListInstrument;
  let mockElementMechanic: ElementMechanicMock;
  let mockListMechanic: ListMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      element: new ElementMechanicMock(),
      list: new ListMechanicMock(),
    };

    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];

    mockListMechanic = (<jest.Mock<ListMechanicMock>>ListMechanicMock).mock
      .instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    listInstrument = instrumentSet.useList({
      selector,
      relativeItemSelector,
    });
  });

  test('can get an item selector by index', () => {
    const listItemSelector = listInstrument.listItemSelectorByIndex(2);

    expect(listItemSelector).toBe(
      '.the-list-selector .a-list-item-selector:nth-child(3)'
    );
  });

  test('can get an item selector by number', () => {
    const listItemSelector = listInstrument.listItemSelectorByNumber(3);

    expect(listItemSelector).toBe(
      '.the-list-selector .a-list-item-selector:nth-child(3)'
    );
  });

  test('can verify list content', () => {
    const expectedContent = ['one', 'two', 'three'];
    listInstrument.verifyListContent(expectedContent);

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
    listInstrument.verifyContentLength(expectedLength);

    expect(mockListMechanic.verifyListLength).toHaveBeenCalledWith(
      '.the-list-selector .a-list-item-selector',
      expectedLength
    );
    expect(mockListMechanic.verifyListLength).toHaveBeenCalledTimes(1);
  });
});
