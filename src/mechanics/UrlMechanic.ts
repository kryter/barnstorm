export interface UrlMechanic {
  visit(url: string): void;
  verifyUrl(expectedUrl: string): void;
}
