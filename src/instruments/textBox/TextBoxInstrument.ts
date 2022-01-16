import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentConfig,
} from '../uiElement/UIElementInstrument';

export class TextBoxInstrument extends UIElementInstrument {
  constructor(mechanicGroup: MechanicGroup, config: UIElementInstrumentConfig) {
    super(mechanicGroup, config);
  }

  public enterText(textToType: string): void {
    this.mechanicGroup.textBox.enterText(this.config.selector, textToType);
  }

  public verifyTextContent(expectedText: string): void {
    this.mechanicGroup.textBox.verifyTextContent(
      this.config.selector,
      expectedText
    );
  }
}
