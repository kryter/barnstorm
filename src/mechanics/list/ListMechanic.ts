import { Selector } from '../../instruments/uiElement/Selector';

export interface ListMechanic {
  verifyListLength(selector: Selector, expectedLength: number): void;
}
