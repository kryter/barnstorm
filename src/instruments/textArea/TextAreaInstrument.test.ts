import { TextAreaInstrument } from './TextAreaInstrument';
import TextAreaMechanicMock from '../../mechanics/textArea/TextAreaMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/textArea/TextAreaMechanicMock');

describe('TextAreaInstrument', () => {
  const selector = '.the-textArea-selector';
  const expectedText = 'hello world';

  let textAreaInstrument: TextAreaInstrument;
  let mockTextAreaMechanic: TextAreaMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      textArea: new TextAreaMechanicMock(),
    };

    mockTextAreaMechanic = (<jest.Mock<TextAreaMechanicMock>>(
      TextAreaMechanicMock
    )).mock.instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    textAreaInstrument = instrumentSet.useTextArea({
      selector,
    });
  });

  test('can enter text', () => {
    textAreaInstrument.enterText(expectedText);

    expect(mockTextAreaMechanic.enterText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextAreaMechanic.enterText).toHaveBeenCalledTimes(1);
  });

  test('can verify text', () => {
    textAreaInstrument.verifyText(expectedText);

    expect(mockTextAreaMechanic.verifyText).toHaveBeenCalledWith(
      selector,
      expectedText
    );
    expect(mockTextAreaMechanic.verifyText).toHaveBeenCalledTimes(1);
  });
});
