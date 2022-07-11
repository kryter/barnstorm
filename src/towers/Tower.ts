import { UIElementInstrumentConfig } from '../instruments/uiElement/UIElementInstrument';
import { InstrumentSet } from '../InstrumentSet';

export interface ItemDetails {
  id: string;
}

export class Tower<TItemDetails extends ItemDetails = null> {
  private configs: UIElementInstrumentConfig[];

  private idToItemConfigs: Record<string, UIElementInstrumentConfig[]> = {};

  constructor(
    private instruments: InstrumentSet,
    initialInstrumentConfigs: UIElementInstrumentConfig[],
    private buildInstrumentConfigsForItem?: (
      itemDetails: TItemDetails
    ) => UIElementInstrumentConfig[]
  ) {
    this.configs = [...initialInstrumentConfigs];
    instruments.createInstruments(this.configs);
  }

  public setInstruments(itemDetailsList: TItemDetails[]) {
    if (!this.buildInstrumentConfigsForItem) {
      throw new Error(
        `Unable to set instruments for item because the buildInstrumentConfigsForItem function was not defined when this tower was created.`
      );
    }

    itemDetailsList.forEach((itemDetails) => {
      // Make sure we replace any existing instruments for the item.
      // This is useful for cases where the item still exists, but its instrument set has changed.
      this.removeInstruments(itemDetails.id);

      const newConfigs = this.buildInstrumentConfigsForItem(itemDetails);
      this.idToItemConfigs[itemDetails.id] = newConfigs;

      this.instruments.createInstruments(newConfigs);
    });
  }

  public removeInstruments(itemId: string) {
    const itemConfigs = this.idToItemConfigs[itemId];
    if (itemConfigs) {
      this.instruments.destroyInstruments(
        itemConfigs.map((config) => config.id)
      );
      delete this.idToItemConfigs[itemId];
    }
  }

  public instrumentIds(): string[] {
    // Get ids for static instruments
    const ids: string[] = this.configs.map((config) => config.id);

    // Get ids for dynamic item instruments
    Object.keys(this.idToItemConfigs).forEach((itemId) => {
      this.idToItemConfigs[itemId].forEach((config) => {
        ids.push(config.id);
      });
    });

    return ids;
  }

  public disconnect(): void {
    this.instruments.disconnect(this.instrumentIds());
  }

  public reconnect(): void {
    this.instruments.reconnect(this.instrumentIds());
  }
}
