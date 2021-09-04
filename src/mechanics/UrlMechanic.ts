export abstract class UrlMechanic {
  public abstract visit(url: string): void;
  public abstract verifyUrl(expectedUrl: string): void;
}
