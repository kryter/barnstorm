import {
  ElementInstrumentOptions,
  ElementInstrument,
} from '../element/ElementInstrument';
import MechanicsSet from '../../MechanicsSet';

export class ButtonInstrument extends ElementInstrument {
  constructor(mechanicsSet: MechanicsSet, options: ElementInstrumentOptions) {
    super(mechanicsSet, options);
  }

  public click(): void {
    this.mechanicsSet.button.click(this.options.selector);
  }
}
