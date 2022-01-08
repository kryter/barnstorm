import { UrlMechanic } from './UrlMechanic';

export default class UrlMechanicMock implements UrlMechanic {
  visit(url: string): void {}

  verifyUrl(expectedUrl: string): void {}
}
