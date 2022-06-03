import { UrlInstrument, URL_INSTRUMENT_ID } from './UrlInstrument';
import UrlMechanicMock from '../../mechanics/url/UrlMechanicMock';
import MechanicGroup from '../../MechanicGroup';
import { InstrumentSet } from '../../InstrumentSet';

jest.mock('../../mechanics/url/UrlMechanicMock');

describe('UrlInstrument', () => {
  let instrumentSet: InstrumentSet;
  const url = 'https://example.cypress.io/todo';
  let mockUrlMechanic: UrlMechanicMock;
  let mockIndex = 0;

  beforeEach(() => {
    const mechanicGroup: MechanicGroup = {
      url: new UrlMechanicMock(),
    };

    mockUrlMechanic = (<jest.Mock<UrlMechanicMock>>UrlMechanicMock).mock
      .instances[mockIndex];
    mockIndex += 1;

    instrumentSet = new InstrumentSet(mechanicGroup);
  });

  test('can visit and verify the url', () => {
    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).verifyUrl('');

    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledWith('');
    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledTimes(1);

    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).visit(url);

    expect(mockUrlMechanic.visit).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.visit).toHaveBeenCalledTimes(1);

    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).verifyUrl(url);

    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledTimes(2);
  });

  test('can visit and verify the state', () => {
    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).verifyState();

    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledWith('');
    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledTimes(1);

    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).visit(url);

    expect(mockUrlMechanic.visit).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.visit).toHaveBeenCalledTimes(1);

    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).verifyState();

    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledWith(url);
    expect(mockUrlMechanic.verifyUrl).toHaveBeenCalledTimes(2);
  });

  test('can get a promise for the current url', () => {
    instrumentSet.use<UrlInstrument>(URL_INSTRUMENT_ID).getUrl();

    expect(mockUrlMechanic.getUrl).toHaveBeenCalled();
    expect(mockUrlMechanic.getUrl).toHaveBeenCalledTimes(1);
  });
});
