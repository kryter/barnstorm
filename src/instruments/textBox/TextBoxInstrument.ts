import MechanicsSet from '../../MechanicsSet';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class TextBoxInstrument extends ElementInstrument {
  constructor(mechanicsSet: MechanicsSet, options: ElementInstrumentOptions) {
    super(mechanicsSet, options);
  }

  public enterText(textToType: string): void {
    this.mechanicsSet.textBox.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicsSet.textBox.verifyText(this.options.selector, expectedText);
  }
}
