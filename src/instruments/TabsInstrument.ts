import { ElementInstrument, ElementInstrumentOptions } from './ElementInstrument';
import { Mechanics } from '../flying/Mechanics';

export interface TabsInstrumentOptions extends ElementInstrumentOptions {
  /**
   * CSS selector to get an individual tab.
   * This selector is relative to the tabsSelector.
   */
  relativeTabSelector: string;

  /**
   * CSS selector to get an individual selected tab.
   * This selector is relative to the tabsSelector.
   */
  relativeSelectedTabSelector: string;
}

export class TabsInstrument extends ElementInstrument<TabsInstrumentOptions> {
  constructor(options: TabsInstrumentOptions) {
    super(options);
  }

  public clickTab(tabId: string): void {
    // TODO rationalize tab id and selector.
    Mechanics.Button.click(this.options.selector);
  }
  public verifyTabSelectionState(tabId: string, expectedIsSelected: boolean): void {
    // TODO rationalize tab id and selector.
  }
}
