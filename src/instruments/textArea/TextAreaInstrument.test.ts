import { TextAreaInstrument } from './TextAreaInstrument';
import TextAreaMechanicMock from '../../mechanics/textArea/TextAreaMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';
import { Selector } from '../uiElement/Selector';

jest.mock('../../mechanics/textArea/TextAreaMechanicMock');

const TEXT_AREA_INSTRUMENT_ID = 'TEXT_AREA_INSTRUMENT';

describe('TextAreaInstrument', () => {
  const cssSelector = '.the-textArea-selector';
  const iFrameSelector = 'iframe#the-iframe';
  const selector: Selector = {
    css: cssSelector,
    iFrame: iFrameSelector,
  };
  const expectedText = 'hello world';

  let instrumentSet: InstrumentSet;
  let mockTextAreaMechanic: TextAreaMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      textArea: new TextAreaMechanicMock(),
    };

    mockTextAreaMechanic = (<jest.Mock<TextAreaMechanicMock>>(
      TextAreaMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.createInstrument({
      id: TEXT_AREA_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.TEXT_AREA,
      selector,
      initialState: {
        textContent: '',
      },
    });
  });

  test('can enter text', () => {
    instrumentSet
      .use<TextAreaInstrument>(TEXT_AREA_INSTRUMENT_ID)
      .enterText(expectedText);

    expect(mockTextAreaMechanic.enterText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextAreaMechanic.enterText).toHaveBeenCalledTimes(1);
  });

  test('can verify text', () => {
    instrumentSet
      .use<TextAreaInstrument>(TEXT_AREA_INSTRUMENT_ID)
      .verifyTextContent(expectedText);

    expect(mockTextAreaMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextAreaMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });
});
