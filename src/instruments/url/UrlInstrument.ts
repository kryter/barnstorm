import MechanicGroup from '../../MechanicGroup';
import { Instrument } from '../../Instrument';

export const URL_INSTRUMENT_ID = 'URL_INSTRUMENT';

export class UrlInstrument implements Instrument<string> {
  private currentState: string;

  constructor(protected mechanicGroup: MechanicGroup) {}

  public getId(): string {
    return URL_INSTRUMENT_ID;
  }

  public setState(nextState: string): void {
    this.currentState = nextState;
  }

  public verifyState(): void {
    this.verifyUrl();
  }

  public visit(nextUrl: string): void {
    this.currentState = nextUrl;
    this.mechanicGroup.url.visit(nextUrl);
  }

  public verifyUrl(): void {
    this.mechanicGroup.url.verifyUrl(this.currentState);
  }
}
