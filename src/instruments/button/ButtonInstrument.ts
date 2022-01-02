import {
  ElementInstrumentOptions,
  ElementInstrument,
} from '../element/ElementInstrument';
import MechanicGroup from '../../MechanicGroup';

export class ButtonInstrument extends ElementInstrument<
  void,
  ElementInstrumentOptions
> {
  constructor(mechanicGroup: MechanicGroup, options: ElementInstrumentOptions) {
    super(mechanicGroup, options);
  }

  public getId(): string {
    return this.options.id;
  }

  public setState(): void {
    // TODO what is a button's state?
  }

  public verifyState(): void {
    // TODO what can we verify about a button?
  }

  public click(): void {
    this.mechanicGroup.button.click(this.options.selector);
  }
}
