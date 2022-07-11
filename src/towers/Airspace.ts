import { InstrumentSet } from '../InstrumentSet';
import { ItemDetails, Tower } from './Tower';

export interface Airspace<TItemDetails extends ItemDetails = null> {
  id: string;
  towers: Tower<TItemDetails>[];
  onEnter?: (instruments: InstrumentSet) => void;
  onLeave?: (instruments: InstrumentSet) => void;
}
