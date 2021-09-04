export interface ButtonMechanic {
  click(): void;
  verifyEnabledState(isEnabled: boolean): void;
}
