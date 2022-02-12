import { Selector } from '../../instruments/uiElement/Selector';
import { ListMechanic } from './ListMechanic';

export default class ListMechanicMock implements ListMechanic {
  verifyListLength(selector: Selector, expectedLength: number): void {}
}
