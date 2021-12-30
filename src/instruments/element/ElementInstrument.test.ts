import { ElementInstrument } from './ElementInstrument';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';
import ListMechanicMock from '../../mechanics/list/ListMechanicMock';

jest.mock('../../mechanics/element/ElementMechanicMock');

describe('ElementInstrument', () => {
  const selector = '.the-element-selector';
  const classToCheck = 'selected';

  let elementInstrument: ElementInstrument;
  let mockElementMechanic: ElementMechanicMock;
  let mockIndex = 0;
  let instrumentSet: InstrumentSet;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      element: new ElementMechanicMock(),
      list: new ListMechanicMock(),
    };

    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicsSet);

    elementInstrument = instrumentSet.useElement({
      selector,
    });
  });

  test('can get simple selector', () => {
    const actualSelector = elementInstrument.getSelector();

    expect(actualSelector).toBe(selector);
  });

  test('can get a selector for an item in a list', () => {
    const listItemElementInstrument = instrumentSet.useElement({
      selector,
      listInstrument: instrumentSet.useList({
        selector: '.the-list',
        relativeItemSelector: '.a-list-item',
      }),
      itemNumber: 3,
    });
    const listItemSelector = listItemElementInstrument.getSelector();

    expect(listItemSelector).toBe(
      '.the-list .a-list-item:nth-child(3) .the-element-selector'
    );
  });

  test('can verify is not visible', () => {
    elementInstrument.verifyIsNotVisible();

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      selector
    );
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify text content', () => {
    const textContent = 'hello world';
    elementInstrument.verifyTextContent(textContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });

  test('can verify has a class', () => {
    elementInstrument.verifyHasClass(classToCheck);

    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledTimes(1);
  });

  test('can verify does not have a class', () => {
    elementInstrument.verifyDoesNotHaveClass(classToCheck);

    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledTimes(1);
  });

  test('can verify is in focus', () => {
    elementInstrument.verifyIsInFocus();

    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledTimes(1);
  });
});
