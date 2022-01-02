import MechanicGroup from '../../MechanicGroup';
import {
  ElementInstrumentOptions,
  ElementInstrument,
} from '../element/ElementInstrument';

export class SimpleElementInstrument extends ElementInstrument<string> {
  constructor(
    protected mechanicGroup: MechanicGroup,
    protected options: ElementInstrumentOptions<string>
  ) {
    super(mechanicGroup, options);
    this.currentState = options.initialState || '';
  }

  public verifyState(): void {
    this.verifyTextContent(this.currentState);
  }
}
