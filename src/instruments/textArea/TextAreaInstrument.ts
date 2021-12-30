import MechanicsSet from '../../MechanicsSet';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from '../element/ElementInstrument';

export class TextAreaInstrument extends ElementInstrument {
  constructor(mechanicsSet: MechanicsSet, options: ElementInstrumentOptions) {
    super(mechanicsSet, options);
  }

  public enterText(textToType: string): void {
    this.mechanicsSet.textArea.enterText(this.options.selector, textToType);
  }

  public verifyText(expectedText: string): void {
    this.mechanicsSet.textArea.verifyText(this.options.selector, expectedText);
  }
}
