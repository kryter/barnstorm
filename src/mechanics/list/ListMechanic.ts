export interface ListMechanic {
  verifyListLength(
    selector: string,
    expectedLength: number,
    iFrameSelector?: string
  ): void;
}
