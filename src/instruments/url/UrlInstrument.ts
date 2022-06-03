import MechanicGroup from '../../MechanicGroup';
import { InstrumentBase } from '../instrument/InstrumentBase';
import { INSTRUMENT_TYPES } from '../../INSTRUMENT_TYPES';

export const URL_INSTRUMENT_ID = 'URL_INSTRUMENT';

export interface URLState extends Record<string, unknown> {
  currentUrl: string | RegExp;
}

export class UrlInstrument extends InstrumentBase<URLState> {
  constructor(mechanicGroup: MechanicGroup) {
    super(mechanicGroup, {
      id: URL_INSTRUMENT_ID,
      instrumentType: INSTRUMENT_TYPES.URL,
      initialState: {
        currentUrl: '',
      },
    });
  }

  protected isStateKeySupported(stateKey: string): boolean {
    return stateKey === 'currentUrl';
  }

  public verifyState(): void {
    this.verifyUrl(this.currentState.currentUrl);
  }

  public visit(nextUrl: string): void {
    this.mechanicGroup.url.visit(nextUrl);
    this.updateState({
      currentUrl: nextUrl,
    });
  }

  public verifyUrl(url: string | RegExp): void {
    this.mechanicGroup.url.verifyUrl(url);
  }

  public getUrl(): Promise<string> {
    return this.mechanicGroup.url.getUrl();
  }
}
