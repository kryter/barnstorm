import { TextBoxInstrument } from './TextBoxInstrument';
import TextBoxMechanicMock from '../../mechanics/textBox/TextBoxMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/textBox/TextBoxMechanicMock');

describe('TextBoxInstrument', () => {
  const selector = '.the-textBox-selector';
  const expectedText = 'hello world';

  let textBoxInstrument: TextBoxInstrument;
  let mockTextBoxMechanic: TextBoxMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      textBox: new TextBoxMechanicMock(),
    };

    mockTextBoxMechanic = (<jest.Mock<TextBoxMechanicMock>>TextBoxMechanicMock)
      .mock.instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    textBoxInstrument = instrumentSet.useTextBox({
      selector,
    });
  });

  test('can enter text', () => {
    textBoxInstrument.enterText(expectedText);

    expect(mockTextBoxMechanic.enterText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextBoxMechanic.enterText).toHaveBeenCalledTimes(1);
  });

  test('can verify text', () => {
    textBoxInstrument.verifyText(expectedText);

    expect(mockTextBoxMechanic.verifyText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextBoxMechanic.verifyText).toHaveBeenCalledTimes(1);
  });
});
