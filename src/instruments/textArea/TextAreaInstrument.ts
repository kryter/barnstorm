import MechanicGroup from '../../MechanicGroup';
import {
  UIElementInstrument,
  UIElementInstrumentConfig,
} from '../uiElement/UIElementInstrument';

export class TextAreaInstrument extends UIElementInstrument {
  constructor(mechanicGroup: MechanicGroup, config: UIElementInstrumentConfig) {
    super(mechanicGroup, config);
  }

  public enterText(textToType: string): void {
    this.mechanicGroup.textArea.enterText(this.config.selector, textToType);
  }

  public verifyTextContent(expectedText: string): void {
    this.mechanicGroup.textArea.verifyTextContent(
      this.config.selector,
      expectedText
    );
  }

  protected toVerifyIsVisible(): boolean {
    return false;
  }
}
