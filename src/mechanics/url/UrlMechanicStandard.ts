import {UrlMechanic} from './UrlMechanic';

export default class UrlMechanicStandard implements UrlMechanic {
  private currentUrl: string;

  visit(url: string): void {
    this.currentUrl = url;
  }

  verifyUrl(expectedUrl: string): void {
    if (this.currentUrl !== expectedUrl) {
      throw new Error(`The url was observed to be ${this.currentUrl}
                       but the test expected it to ${expectedUrl}.`);
    }
  }
}
