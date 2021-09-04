export interface UrlMechanic {
  goTo(url: string): void;
  verifyUrl(expectedUrl: string): void;
}
