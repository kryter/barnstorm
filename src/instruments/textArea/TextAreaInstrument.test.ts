import { TextAreaInstrument } from './TextAreaInstrument';
import TextAreaMechanicMock from '../../mechanics/textArea/TextAreaMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/textArea/TextAreaMechanicMock');

const TEXT_AREA_INSTRUMENT_ID = 'TEXT_AREA_INSTRUMENT';

describe('TextAreaInstrument', () => {
  const selector = '.the-textArea-selector';
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

    instrumentSet.setupTextArea({
      id: TEXT_AREA_INSTRUMENT_ID,
      selector,
      initialState: '',
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
      .verifyText(expectedText);

    expect(mockTextAreaMechanic.verifyText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextAreaMechanic.verifyText).toHaveBeenCalledTimes(1);
  });
});
