import MechanicsSet from '../../MechanicsSet';

export interface UrlInstrumentOptions {
  /**
   * Url to visit and verify.
   */
  url: string;
}

export class UrlInstrument {
  constructor(
    protected mechanicsSet: MechanicsSet,
    protected options: UrlInstrumentOptions
  ) {}

  public visit(): void {
    this.mechanicsSet.url.visit(this.options.url);
  }

  public verifyUrl(): void {
    this.mechanicsSet.url.verifyUrl(this.options.url);
  }
}
