import { Selector } from '../../instruments/uiElement/Selector';

export interface ButtonMechanic {
  click(selector: Selector): void;
}
