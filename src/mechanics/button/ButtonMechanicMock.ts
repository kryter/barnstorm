import { Selector } from '../../instruments/uiElement/Selector';
import { ButtonMechanic } from './ButtonMechanic';

export default class ButtonMechanicMock implements ButtonMechanic {
  click(selector: Selector): void {}
}
