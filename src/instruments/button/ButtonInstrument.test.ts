import { ButtonInstrument } from './ButtonInstrument';
import ButtonMechanicMock from '../../mechanics/button/ButtonMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';
import { Selector } from '../uiElement/Selector';

jest.mock('../../mechanics/button/ButtonMechanicMock');
jest.mock('../../mechanics/element/ElementMechanicMock');

const BUTTON_INSTRUMENT_ID = 'BUTTON_INSTRUMENT';

describe('ButtonInstrument', () => {
  const textContent = 'Say Hello';
  const laterTextContent = 'Say Bye';
  const cssSelector = '.the-button-selector';
  const iFrameSelector = 'iframe#the-iframe';
  const selector: Selector = {
    css: cssSelector,
    iFrame: iFrameSelector,
  };

  let instrumentSet: InstrumentSet;
  let mockButtonMechanic: ButtonMechanicMock;
  let mockElementMechanic: ElementMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      button: new ButtonMechanicMock(),
      element: new ElementMechanicMock(),
    };

    mockButtonMechanic = (<jest.Mock<ButtonMechanicMock>>ButtonMechanicMock)
      .mock.instances[mockIndex];
    mockElementMechanic = (<jest.Mock<ElementMechanicMock>>ElementMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.createInstrument({
      id: BUTTON_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.BUTTON,
      selector,
      initialState: {
        textContent,
      },
    });
  });

  test('can be clicked', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).click();

    expect(mockButtonMechanic.click).toHaveBeenCalledWith(selector);
    expect(mockButtonMechanic.click).toHaveBeenCalledTimes(1);
  });

  test('can have text content', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).verifyState();

    // If the test is already testing the content, then it doesn't need to test whether
    // the button element is visible.
    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(0);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);

    instrumentSet
      .use<ButtonInstrument>(BUTTON_INSTRUMENT_ID)
      .verifyTextContent(textContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      textContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(2);
  });

  test('can change text content', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).updateState({
      textContent: laterTextContent,
    });

    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(0);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      laterTextContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(1);

    instrumentSet
      .use<ButtonInstrument>(BUTTON_INSTRUMENT_ID)
      .verifyTextContent(laterTextContent);

    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      laterTextContent
    );
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(2);
  });

  test('can ignore all state verifications if the ignore flag is set', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).updateState({
      ignoreState: true,
    });

    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).verifyState();

    expect(mockElementMechanic.verifyIsVisible).toHaveBeenCalledTimes(0);
    expect(mockElementMechanic.verifyTextContent).toHaveBeenCalledTimes(0);
  });
});
