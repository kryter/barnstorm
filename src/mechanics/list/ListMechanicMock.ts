import { ListMechanic } from './ListMechanic';

export default class ListMechanicMock implements ListMechanic {
  verifyListLength(selector: string, expectedLength: number): void {}
}
