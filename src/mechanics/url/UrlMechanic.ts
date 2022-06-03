export interface UrlMechanic {
  visit(url: string): void;
  verifyUrl(expectedUrl: string | RegExp): void;
  getUrl(): Promise<string>;
}
