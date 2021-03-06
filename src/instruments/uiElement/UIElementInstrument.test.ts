import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import { UIElementInstrument } from './UIElementInstrument';
import { Selector } from './Selector';

jest.mock('../../mechanics/element/ElementMechanicMock');
jest.mock('../../mechanics/element/ElementMechanicMock');

const UI_ELEMENT_INSTRUMENT = 'UI_ELEMENT_INSTRUMENT';

describe('UIElementInstrument', () => {
  const cssSelector = '.the-element-selector';
  const iFrameSelector = 'iframe#the-iframe';
  const classToCheck = 'selected';
  const selector: Selector = {
    css: cssSelector,
    iFrame: iFrameSelector,
  };

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
      initialState: {},
    });
  });

  test('can verify is visible', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsVisible();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify is not visible', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsNotVisible();

    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledWith(
      selector
    );
    expect(mockElementMechanic.verifyIsNotVisible).toHaveBeenCalledTimes(1);
  });

  test('can verify is present', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsPresent();

    expect(mockElementMechanic.verifyIsPresent).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsPresent).toHaveBeenCalledTimes(1);
  });

  test('can verify is not present', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsNotPresent();

    expect(mockElementMechanic.verifyIsNotPresent).toHaveBeenCalledWith(
      selector
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
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });

  test('can verify has a class', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyHasClass(classToCheck);

    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyHasClass).toHaveBeenCalledTimes(1);
  });

  test('can verify does not have a class', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyDoesNotHaveClass(classToCheck);

    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledWith(
      selector,
      classToCheck
    );
    expect(mockElementMechanic.verifyDoesNotHaveClass).toHaveBeenCalledTimes(1);
  });

  test('can verify is in focus', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsInFocus();

    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledWith(selector);
    expect(mockElementMechanic.verifyIsInFocus).toHaveBeenCalledTimes(1);
  });

  test('can verify is enabled', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsEnabled(true);

    expect(mockElementMechanic.verifyIsEnabled).toHaveBeenCalledWith(
      selector,
      true
    );
    expect(mockElementMechanic.verifyIsEnabled).toHaveBeenCalledTimes(1);
  });

  test('can verify is not enabled', () => {
    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyIsEnabled(false);

    expect(mockElementMechanic.verifyIsEnabled).toHaveBeenCalledWith(
      selector,
      false
    );
    expect(mockElementMechanic.verifyIsEnabled).toHaveBeenCalledTimes(1);
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
      propertyValue
    );
    expect(mockElementMechanic.verifyCssProperty).toHaveBeenCalledTimes(1);
  });

  test('can verify the bounding box', () => {
    const expectedBoundingBox = {
      x: 4,
      y: 5,
      height: 10,
    };

    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyBoundingBox(expectedBoundingBox);

    expect(mockElementMechanic.verifyBoundingBox).toHaveBeenCalledWith(
      selector,
      expectedBoundingBox
    );
    expect(mockElementMechanic.verifyBoundingBox).toHaveBeenCalledTimes(1);
  });

  test('can verify any attribute key and value', () => {
    const attributeKey = 'href';
    const attributeValue = 'someLink';

    instrumentSet
      .use<UIElementInstrument>(UI_ELEMENT_INSTRUMENT)
      .verifyAttribute(attributeKey, attributeValue);

    expect(mockElementMechanic.verifyAttribute).toHaveBeenCalledWith(
      selector,
      attributeKey,
      attributeValue
    );
    expect(mockElementMechanic.verifyAttribute).toHaveBeenCalledTimes(1);
  });
});
