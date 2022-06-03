import { UrlMechanic } from './UrlMechanic';

export default class UrlMechanicMock implements UrlMechanic {
  visit(url: string): void {}

  verifyUrl(expectedUrl: string | RegExp): void {}

  getUrl(): Promise<string> {
    return Promise.resolve('someMockUrl');
  }
}
