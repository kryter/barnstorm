# Instrument State Guide

## Setting state for a UI Element

It is ideal to specify as much expected state as possible for each instrument to ensure the test is verifying the full state.  The full set of state properties that can be set for any UI element instrument are specified by `UIElementState`:

```typescript
export interface UIElementState {
  hasClasses: string[];
  doesNotHaveClasses?: string[];
  textContent?: string;
  inFocus?: boolean;
  isEnabled?: boolean;
  isVisible?: boolean;
  isPresent?: boolean;
  css?: Record<string, string | boolean>;
  boundingBox?: ExpectedBoundingBox;
  attributes?: Record<string, string>;
  ignoreState?: boolean;
}

export interface ExpectedBoundingBox {
  x?: number;
  y?: number;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  width?: number;
  height?: number;
}
```

### Setting Checkbox Instrument state

In addition, checkbox state includes an additional property `isChecked`:

```typescript
export interface CheckboxState extends UIElementState {
  isChecked?: boolean;
}
```

### Setting List Instrument state

In addition, list state includes an additional property `rows`:

```typescript
export interface ListState extends UIElementState {
  rows?: Record<string, Record<string, unknown>>[];
}
```

### Setting URL Instrument state

URL instrument state contains only one property `currentUrl`:

```typescript
export interface URLState extends Record<string, unknown> {
  currentUrl: string | RegExp;
}
```
