import {
  UIElementInstrumentConfig,
  UIElementInstrument,
  UIElementState,
} from '../uiElement/UIElementInstrument';
import MechanicGroup from '../../MechanicGroup';

export class ButtonInstrument extends UIElementInstrument {
  constructor(
    mechanicGroup: MechanicGroup,
    config: UIElementInstrumentConfig<UIElementState>
  ) {
    super(mechanicGroup, config);
  }

  public click(): void {
    this.mechanicGroup.button.click(this.config.selector);
  }
}
