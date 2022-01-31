import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import { UIElementInstrument } from './UIElementInstrument';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/element/ElementMechanicMock');

const UI_ELEMENT_INSTRUMENT = 'UI_ELEMENT_INSTRUMENT';

describe('UIElementInstrument', () => {
  const selector = '.the-element-selector';
  const iFrameSelector = 'iframe#the-iframe';
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

    instrumentSet.createInstrument({
      id: UI_ELEMENT_INSTRUMENT,
      instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
      selector,
      iFrameSelector,
      initialState: {},
    });
  });

  test('can verify is not visible', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsNotVisible();

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify is not present', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsNotPresent();

    expect(mockElementMechanic.verifyIsNotPresent).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsNotPresent).toHaveBeenCalledTimes(1);
  });

  test('can verify text content', () => {
    const textContent = 'hello world';
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyTextContent(textContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });

  test('can verify has a class', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyHasClass(classToCheck);

    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledWith(
      selector,
      classToCheck,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledTimes(1);
  });

  test('can verify does not have a class', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyDoesNotHaveClass(classToCheck);

    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledWith(
      selector,
      classToCheck,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledTimes(1);
  });

  test('can verify is in focus', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsInFocus();

    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledWith(
      selector,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledTimes(1);
  });

  test('can verify any CSS property key and value', () => {
    const propertyKey = 'background-color';
    const propertyValue = 'rgb(0, 0, 0)';

    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyCssProperty(propertyKey, propertyValue);

    expect(mockElementMechanic.verifyCssProperty).toHaveBeenCalledWith(
      selector,
      propertyKey,
      propertyValue,
      iFrameSelector
    );
    expect(mockElementMechanic.verifyCssProperty).toHaveBeenCalledTimes(1);
  });
});
