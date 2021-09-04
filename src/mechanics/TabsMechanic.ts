export interface TabsMechanic {
  clickTab(): void;
  verifyTabSelectionState(tabId: string, isSelected: boolean): void;
}
