import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../InstrumentOptions';
import { SimpleElementInstrument } from './SimpleElementInstrument';

jest.mock('../../mechanics/element/ElementMechanicMock');

const ELEMENT_INSTRUMENT_ID = 'ELEMENT_INSTRUMENT_ID';

describe('SimpleElementInstrument', () => {
  const selector = '.the-element-selector';
  const classToCheck = 'selected';

  let instrumentSet: InstrumentSet;
  let mockElementMechanic: ElementMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      element: new ElementMechanicMock(),
    };

    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.setup({
      id: ELEMENT_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.SIMPLE_ELEMENT,
      selector,
    });
  });

  test('can verify is not visible', () => {
    instrumentSet
      .use<SimpleElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyIsNotVisible();

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      selector
    );
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify text content', () => {
    const textContent = 'hello world';
    instrumentSet
      .use<SimpleElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyTextContent(textContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });

  test('can verify has a class', () => {
    instrumentSet
      .use<SimpleElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyHasClass(classToCheck);

    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledTimes(1);
  });

  test('can verify does not have a class', () => {
    instrumentSet
      .use<SimpleElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyDoesNotHaveClass(classToCheck);

    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledTimes(1);
  });

  test('can verify is in focus', () => {
    instrumentSet
      .use<SimpleElementInstrument>(ELEMENT_INSTRUMENT_ID)
      .verifyIsInFocus();

    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledTimes(1);
  });
});
