export interface UrlMechanicOptions {
  /**
   * Url to visit and verify.
   */
  url: string;
}

export abstract class UrlMechanic {
  constructor(protected options: UrlMechanicOptions) {
  }

  public abstract visit(): void;
  public abstract verifyUrl(): void;
}
