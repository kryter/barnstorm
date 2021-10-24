import { Mechanics } from "../flying/Mechanics";

export interface UrlInstrumentOptions {
  /**
   * Url to visit and verify.
   */
  url: string;
}

export class UrlInstrument {
  constructor(protected options: UrlInstrumentOptions) {}

  public visit(): void {
    Mechanics.Url.visit(this.options.url);
  }

  public verifyUrl(): void {
    Mechanics.Url.verifyUrl(this.options.url);
  }
}
