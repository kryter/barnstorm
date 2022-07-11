import { UIElementInstrumentConfig } from '../instruments/uiElement/UIElementInstrument';
import { InstrumentSet } from '../InstrumentSet';
import { ItemDetails, Tower } from './Tower';

export function buildTower<TItemDetails extends ItemDetails = null>(
  instruments: InstrumentSet,
  initialInstrumentConfigs: UIElementInstrumentConfig[],
  buildInstrumentConfigsForItem?: (
    itemDetails: TItemDetails
  ) => UIElementInstrumentConfig[]
): Tower<TItemDetails> {
  return new Tower(
    instruments,
    initialInstrumentConfigs,
    buildInstrumentConfigsForItem
  );
}
