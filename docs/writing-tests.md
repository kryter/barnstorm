# Writing Tests

## Towers

To begin writing end to end tests using Barnstorm, start by creating `towers` each area or group of UI elements in the app.  You'll configure an `instrument` to work with each UI element in the area.

`Barnstorm` uses `towers` that contain a mapping of CSS selectors needed to access each UI element contained in a component.  The idea is that each component should have a corresponding `tower` that exposes all the component's visual and interactive functionality to the tests.

When specifying an `instrument`, you need to pass some basic information:

* a unique id that anyone can use to reference the instrument later
* the type of instrument (use the appropriate instrument type for the associated UI element type)
* a CSS selector and any other information needed to find the UI element and any of its sub-elements
* the initial expected state of the UI element

For example to create a button instrument for a button UI element, we can specify this configuration:

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

For more details about what instruments and UI elements are supported, see [Using Instruments](./using-instruments.md).  If the instrument you need is not available, or you have a custom UI element, you can easily write your own custom instruments.

Once we specify instruments configurations for all the UI elements, we can use them to create instruments in our `instrument set`:

```typescript
export const BUTTON_BACKGROUND_COLOR = 'rgb(0, 0, 0)';
export const BUTTON_TEXT_COLOR = 'rgb(255, 255, 255)';

const theButton = {
  id: 'THE_BUTTON',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[data-id="the-button"]',
  initialState: {
    textContent: 'Click me',
    css: {
      color: BUTTON_TEXT_COLOR,
      'background-color': BUTTON_BACKGROUND_COLOR
    },
  }
};

const configs: InstrumentOptions[] = [
  theButton
];

export function activateXYZTower(instruments: InstrumentSet) {
  instruments.createInstruments(configs);

  return {
    theButton: () => instrumentSet.use<ButtonInstrument>(theButton.id),
    instrumentIds: () => configs.map((config) => config.id)
  };
}

export type XYZTower = ReturnType<typeof activateXYZTower>;
```

The theTower file will expose a function, `setupCountertheTower`, that will configure the instrument set with the instruments when called.  This function returns convenience methods for each instrument, for example `countertheTower.countButton()` to make these instruments easy to use in `flight plans` and tests.  We also include a type for the return type so we can use `let countertheTower: CountertheTower` in our tests to make the types especially readable.

Once the `instruments` are set up, you are ready to interact with the UI elements and update their expected state, which is automatically verified by Barnstorm at the end of each `flight plan leg` (i.e. "test step") within a `flight plan`.

## Flight Plans

Once you have a `theTower` file where you've configured `instruments`, you're ready to use those instruments to write a `flight plan` file.  In the flight plan file, you'll specify common actions that you want to perform in the tests.

These `flight plan` files provide reusable blocks of testing that can be used in any test.  This is particularly handy when you are building a feature that builds on a previous feature and you need to do test setup of the previous feature in order to test the new feature.

```typescript
export interface ClickToIncrementTheCountOptions {
  countertheTower: CountertheTower;
  expectedCount: number;
}

export function clickToIncrementTheCount({countertheTower, expectedCount}: ClickToIncrementTheCountOptions): FlightPlan {
  return {
    notes: ['Tests the fix for BUG-101'],
    legs: [
      {
        doTestAction: (instruments: AppInstruments) => {
          countertheTower.countButton().click();
        },
        updateExpectations: (instruments: AppInstruments) => {
          countertheTower.countButton().updateState({
            textContent: `count is: ${expectedCount}`
          });
        }
      }
    ]
  };
}
```

First, you'll notice that the flight plan options are specified as an object rather than multiple parameter to the `flight plan` creator function.  This is intentional for readability in the tests where we don't want magic mystery numbers and other data being passed to the flight plan.

This flight plan is very short, and only contains one flight plan leg, but flight plans can contain as many legs (steps) as needed.  There is also an optional `notes` field on the flight plan and on the flight legs to track what bugs or features are tested by each flight plan or flight leg.

Each `flight plan leg` has two functions: `doTestAction()` and `updateExpectations()`.  The idea is that for every user action we do in the test, there is some state in the app that changes, and we want to immediately verify those changes as soon as the user action has completed.  The content of `doTestAction()` should represent something the user would do, like click or type.  The content of `updateExpectations()` should represent updates to the expected state of the app instruments.  Barnstorm will run `doTestAction()` followed by `updateExpectations()` and then will make a call to the `instrument set` `verifyState()` to verify the state of all instruments.  This sequence of `act`, `update expectations`, and `verify` becomes a single test step.

Once the `flight plans` are set up, you are ready to write a test (finally!).

## Tests

To setup a test using Barnstorm, you'll need to first create an instance of the `app instrument set` from the project setup, then set up the `theTower` file(s) that are needed in the test, either for accessing `instruments` directly or for passing to `flight plans`.

```typescript
describe('Counter Test', () => {
  let instruments: AppInstruments;
  let countertheTower: CountertheTower;

  it('Setup instruments and theTowers', () => {
    instruments = buildAppInstruments();
    countertheTower = setupCountertheTower(instruments);
  });
});
```

Once your `instrument set` instance and `theTower` instance(s) are ready, use the `Url Instrument` on the `instrument set` to navigate to your app:

```typescript
  it('Setup instruments and theTowers, and visit the entry url', () => {
    instruments = buildAppInstruments();
    countertheTower = setupCountertheTower(instruments);

    instruments.url().visit(ENTRY_URL);
  });
```

Once you've navigated to the app, `fly` your `flight plans` to explore the app:

```typescript
describe('Counter', () => {
  let instruments: AppInstruments;
  let countertheTower: CountertheTower;

  it('Setup instruments and theTowers, and visit the entry url', () => {
    instruments = buildAppInstruments();
    countertheTower = setupCountertheTower(instruments);

    instruments.url().visit(ENTRY_URL);
  });

  it('Click the counter button to increment the count displayed on the button', () => {
    fly(instruments, clickToIncrementTheCount({
      countertheTower,
      expectedCount: 1
    }));
  });
});
```

Happy flying!
