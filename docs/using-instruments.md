# Using Instruments

## Keyboard Instrument

The `keyboard instrument` enables the test to type as the user would from the keyboard and the text is directed into the currently focussed element.  There is only one keyboard instrument and it is configured by default on every `instrument set`.  To use the keyboard instrument:

```typescript
instruments.keyboard().typeText('abc');
instruments.keyboard().pressEnter();
```

## Url Instrument

The `url instrument` enables the test to visit specific URLs and verify the current URL.  There is only one url instrument and it is configured by default on every `instrument set`.  To use the url instrument:

```typescript
instruments.url().visit(ENTRY_URL);
```

When the `visit()` method is called, the url instrument will automatically update its expected URL state.  However, if the URL will change based on some other action, then you'll need to update the URL instrument to expect the new state:

```typescript
instruments.url().updateState({
  currentUrl: nextUrl
});
```

## UI Element Instrument

```typescript
const UI_ELEMENT = 'UI_ELEMENT';

const uiElement = {
    id: UI_ELEMENT,
    instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
    selector,
    initialState: {},
  }
};
```


## Button Instrument

// TODO
```typescript
const COUNT_BUTTON = 'COUNT_BUTTON';

const counterButton = {
  id: COUNT_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```

## Checkbox Instrument

// TODO
```typescript
const COUNT_BUTTON = 'COUNT_BUTTON';

const counterButton = {
  id: COUNT_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```


## List Instrument

// TODO
```typescript
const COUNT_BUTTON = 'COUNT_BUTTON';

const counterButton = {
  id: COUNT_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```


## TextArea Instrument

// TODO
```typescript
const COUNT_BUTTON = 'COUNT_BUTTON';

const counterButton = {
  id: COUNT_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```


## TextBox Instrument

// TODO
```typescript
const COUNT_BUTTON = 'COUNT_BUTTON';

const counterButton = {
  id: COUNT_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```
