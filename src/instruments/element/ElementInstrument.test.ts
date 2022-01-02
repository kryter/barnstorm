import { ElementInstrument } from './ElementInstrument';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';
import { ListInstrument } from '../list/ListInstrument';

jest.mock('../../mechanics/element/ElementMechanicMock');

const ELEMENT_INSTRUMENT_ID = 'ELEMENT_INSTRUMENT';
const LIST_INSTRUMENT_ID = 'LIST_INSTRUMENT';
const LIST_ITEM_ELEMENT_INSTRUMENT_ID = 'LIST_ITEM_ELEMENT_INSTRUMENT';

describe('ElementInstrument', () => {
  const selector = '.the-element-selector';
  const classToCheck = 'selected';

  let instrumentSet: InstrumentSet;
  let mockElementMechanic: ElementMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      element: new ElementMechanicMock(),
      list: new ListMechanicMock(),
    };

    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setupElement({
      id: ELEMENT_INSTRUMENT_ID,
      selector,
      initialState: undefined,
    });
  });

  test('can get simple selector', () => {
    const actualSelector = instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .getSelector();

    expect(actualSelector).toBe(selector);
  });

  test('can get a selector for an item in a list', () => {
    instrumentSet.setupList({
      id: LIST_INSTRUMENT_ID,
      selector: '.the-list',
      relativeItemSelector: '.a-list-item',
      initialState: [],
    });

    instrumentSet.setupElement({
      id: LIST_ITEM_ELEMENT_INSTRUMENT_ID,
      initialState: undefined,
      selector,
      listInstrument: instrumentSet.use<ListInstrument>(LIST_INSTRUMENT_ID),
      itemNumber: 3,
    });
    const listItemSelector = instrumentSet
      .use<ElementInstrument>(LIST_ITEM_ELEMENT_INSTRUMENT_ID)
      .getSelector();

    expect(listItemSelector).toBe(
      '.the-list .a-list-item:nth-child(3) .the-element-selector'
    );
  });

  test('can verify is not visible', () => {
    instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyIsNotVisible();

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      selector
    );
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify text content', () => {
    const textContent = 'hello world';
    instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyTextContent(textContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });

  test('can verify has a class', () => {
    instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyHasClass(classToCheck);

    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledTimes(1);
  });

  test('can verify does not have a class', () => {
    instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyDoesNotHaveClass(classToCheck);

    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledTimes(1);
  });

  test('can verify is in focus', () => {
    instrumentSet
      .use<ElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyIsInFocus();

    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledTimes(1);
  });
});
