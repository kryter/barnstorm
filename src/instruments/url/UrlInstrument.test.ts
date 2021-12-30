import { UrlInstrument } from './UrlInstrument';
import UrlMechanicMock from '../../mechanics/url/UrlMechanicMock';
import MechanicsSet from '../../MechanicsSet';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/url/UrlMechanicMock');

describe('UrlInstrument', () => {
  const url = 'https://example.cypress.io/todo';
  let urlInstrument: UrlInstrument;
  let mockUrlMechanic: UrlMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicsSet: MechanicsSet = {
      url: new UrlMechanicMock(),
    };

    mockUrlMechanic = (<jest.Mock<UrlMechanicMock>>UrlMechanicMock).mock
      .instances[mockIndex];
    mockIndex += 1;

    const instrumentSet: InstrumentSet = new InstrumentSet(mechanicsSet);

    urlInstrument = instrumentSet.useUrl({
      url,
    });
  });

  test('can visit the url', () => {
    urlInstrument.visit();

    expect(mockUrlMechanic.visit).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.visit).toHaveBeenCalledTimes(1);
  });

  test('can verify the url', () => {
    urlInstrument.verifyUrl();

    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledTimes(1);
  });
});
