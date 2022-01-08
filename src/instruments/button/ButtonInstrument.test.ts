import { ButtonInstrument } from './ButtonInstrument';
import ButtonMechanicMock from '../../mechanics/button/ButtonMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import ElementMechanicMock from '../../mechanics/element/ElementMechanicMock';

jest.mock('../../mechanics/button/ButtonMechanicMock');
jest.mock('../../mechanics/element/ElementMechanicMock');

const BUTTON_INSTRUMENT_ID = 'BUTTON_INSTRUMENT';

describe('ButtonInstrument', () => {
  const textContent = 'Say Hello';
  const laterTextContent = 'Say Bye';
  const selector = '.the-button-selector';

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

    instrumentSet.setup({
      id: BUTTON_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.BUTTON,
      initialState: {
        textContent,
      },
      selector,
    });
  });

  test('can be clicked', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).click();

    expect(mockButtonMechanic.click).toHaveBeenCalledWith(selector);
    expect(mockButtonMechanic.click).toHaveBeenCalledTimes(1);
  });

  test('can have text content', () => {
    instrumentSet.use<ButtonInstrument>(BUTTON_INSTRUMENT_ID).verifyState();

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
});
