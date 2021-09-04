export interface TabsMechanicOptions {
  /**
   * CSS selector to get the tabs control as a whole.
   */
  tabsSelector: string;

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

export abstract class TabsMechanic {
  constructor(protected options: TabsMechanicOptions) {
  }

  public abstract clickTab(tabId: string): void;
  public abstract verifyTabSelectionState(tabId: string, expectedIsSelected: boolean): void;
}
