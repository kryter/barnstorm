import { TextBoxInstrument } from './TextBoxInstrument';
import TextBoxMechanicMock from '../../mechanics/textBox/TextBoxMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';

jest.mock('../../mechanics/textBox/TextBoxMechanicMock');

const TEXT_BOX_INSTRUMENT_ID = 'TEXT_BOX_INSTRUMENT';

describe('TextBoxInstrument', () => {
  const selector = '.the-textBox-selector';
  const expectedText = 'hello world';

  let instrumentSet: InstrumentSet;
  let mockTextBoxMechanic: TextBoxMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      textBox: new TextBoxMechanicMock(),
    };

    mockTextBoxMechanic = (<jest.Mock<TextBoxMechanicMock>>TextBoxMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);

    instrumentSet.createInstrument({
      id: TEXT_BOX_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
      selector,
      initialState: {
        textContent: '',
      },
    });
  });

  test('can enter text', () => {
    instrumentSet
      .use<TextBoxInstrument>(TEXT_BOX_INSTRUMENT_ID)
      .enterText(expectedText);

    expect(mockTextBoxMechanic.enterText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextBoxMechanic.enterText).toHaveBeenCalledTimes(1);
  });

  test('can verify text', () => {
    instrumentSet
      .use<TextBoxInstrument>(TEXT_BOX_INSTRUMENT_ID)
      .verifyTextContent(expectedText);

    expect(mockTextBoxMechanic.verifyTextContent).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextBoxMechanic.verifyTextContent).toHaveBeenCalledTimes(1);
  });
});
