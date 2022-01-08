import {
  UIElementInstrumentOptions,
  UIElementInstrument,
  UIElementState,
} from '../uiElement/UIElementInstrument';
import MechanicGroup from '../../MechanicGroup';

export class ButtonInstrument extends UIElementInstrument {
  constructor(
    mechanicGroup: MechanicGroup,
    options: UIElementInstrumentOptions<UIElementState>
  ) {
    super(mechanicGroup, options);
  }

  public click(): void {
    this.mechanicGroup.button.click(this.options.selector);
  }
}
