# Writing Tests

## Towers

To begin writing end to end tests using Barnstorm, start by creating `towers` each area or group of UI elements in the app.  You'll configure an `instrument` to work with each UI element in the area.

`Barnstorm` uses `towers` that contain a mapping of CSS selectors needed to access each UI element contained in a component.  The idea is that each area of the app should have a corresponding `tower` that exposes all the component's visual and interactive functionality to the tests.

A tower contains one `instrument` per UI element to be tested in the app area.

When specifying an `instrument`, you need to pass some basic information:

* a unique id that anyone can use to reference the instrument later
* the type of instrument (use the appropriate instrument type for the associated UI element type)
* a CSS selector and any other information needed to find the UI element (and any of its sub-elements, if it has sub elements)
* the initial expected state of the UI element

For example, to create a button instrument for a button UI element, we can specify this configuration:

```typescript
const counterButton = {
  id: 'counterButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.counter-button',
  initialState: {
    textContent: 'count is: 0'
  }
};
```

For more details about what instruments and UI elements are supported, see [Using Instruments](./using-instruments.md).  If the instrument you need is not available, or you have a custom UI element, you can easily write your own custom instruments.

Once we specify instrument configurations for all the UI elements, we can use them to create instruments in our `instrument set`:

```typescript
export const BUTTON_BACKGROUND_COLOR = 'rgb(0, 0, 0)';
export const BUTTON_TEXT_COLOR = 'rgb(255, 255, 255)';

const theButton = {
  id: 'theButton',
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

const anotherButton = {
  id: 'anotherButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '[data-id="another-button"]',
  initialState: {
    textContent: 'Click me too',
    css: {
      color: BUTTON_TEXT_COLOR,
      'background-color': BUTTON_BACKGROUND_COLOR
    },
  }
};

const configs: InstrumentConfig[] = [
  theButton,
  anotherButton
];

export function setupXYZTower(instruments: InstrumentSet) {
  instruments.createInstruments(configs);

  return {
    theButton: () => instrumentSet.use<ButtonInstrument>(theButton.id),
    anotherButton: () => instrumentSet.use<ButtonInstrument>(anotherButton.id),
    instrumentIds: () => configs.map((config) => config.id)
  };
}

export type XYZTower = ReturnType<typeof setupXYZTower>;
```

The tower file will expose a function, `setupXYZTower`, that will configure the instrument set with the instruments when called.  This function returns convenience methods for each instrument, for example `xyzTower.theButton()` to make these instruments easy to use in `flight legs`, `flight plans` and tests.  We also include a type for the return type so we can use `let xyzTower: XYZTower` in our tests to make the types more readable.

Once the `instruments` are set up in a `tower`, you are ready to interact with the UI elements and update their expected state, which is automatically verified by Barnstorm at the end of each `flight leg` (i.e. "test step") within a `flight plan`.

## Flight Plans

Once you have a `tower` file where you've configured `instruments`, you're ready to use those instruments to write a `flight plan` file.  In the flight plan file, you'll specify the actions that you want to perform in the tests.

These `flight plan` files provide reusable blocks of testing that can be used in any test.  This is particularly handy when you are building a feature that builds on a previous feature and you need to do test setup of the previous feature in order to test the new feature.

In Barnstorm, you don't have to think about whether a block needs to be reusable or not, you just write it in the flight plan.  Later, if you find that you want to reuse it, there is little to no refactoring required because the structure is already in place.

```typescript
export interface ClickToIncrementTheCountOptions {
  counterTower: CounterTower;
  expectedCount: number;
}

export function clickToIncrementTheCount({counterTower, expectedCount}: ClickToIncrementTheCountOptions): FlightPlan {
  return {
    notes: ['Tests the fix for BUG-101'],
    legs: [
      {
        doTestAction: (instruments: AppInstruments) => {
          counterTower.countButton().click();
        },
        updateExpectations: (instruments: AppInstruments) => {
          counterTower.countButton().updateState({
            textContent: `count is: ${expectedCount}`
          });
        }
      }
    ]
  };
}
```

First, you'll notice that the flight plan options are specified as an object rather than multiple parameters to the `flight plan` creator function.  This is intentional for readability in the tests where we don't want magic numbers and other mystery data being passed to the flight plan.

This flight plan is very short, and only contains one flight plan leg, but flight plans can contain as many legs (steps) as needed.  There is also an optional `notes` field on the flight plan and on the flight legs to track what bugs or features are tested by each flight plan or flight leg.

Each `flight leg` has two functions: `doTestAction()` and `updateExpectations()`.  The idea is that for every user action we do in the test, there is some state in the app that changes, and we want to immediately verify those changes as soon as the user action has completed.  The content of `doTestAction()` should represent something the user would do, like click or type.  The content of `updateExpectations()` should represent updates to the expected state of the app instruments.  Barnstorm will run `doTestAction()` followed by `updateExpectations()` and then will make a call to the `instruments.verifyState()` to verify the state of all instruments.  This sequence of `act`, `update expectations`, and `verify` becomes a single test step.

Once the `flight plans` are set up, you are ready to write a test (finally!).

## Tests

To setup a test using Barnstorm, you'll need:

* an `instrument set` (from the project setup)
* a `fly` method to fly the flight plans, which you can get by calling Barnstorm's `useAirplane()` function
* any `towers` that are needed by the `flight plans`

```typescript
import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { FlyFunction, useAirplane } from '@kryter/barnstorm/lib/useAirplane';

describe('Counter', () => {
  let instruments: InstrumentSet;
  let fly: Fly;
  let counterTower: counterTower;

  it('Setup instruments, airplane, towers', () => {
    instruments = useInstruments();
    fly = useAirplane(instruments);
    counterTower = setupCounterTower(instruments);
  });
});
```

Once your `instrument set` instance, your `fly` method, and your `towers` are ready, use the `Url Instrument` on the `instrument set` to navigate to your app:

```typescript
  it('Setup instruments, airplane, towers, and visit the entry url', () => {
    instruments = buildAppInstruments();
    fly = useAirplane(instruments);
    counterTower = setupCounterTower(instruments);

    instruments.url().visit(useUrls().entryUrl);
  });
```

Once you've navigated to the app, you can verify your initial state, and then `fly` your `flight plans` to explore the app:

```typescript
describe('Counter', () => {
  let instruments: InstrumentSet;
  let fly: Fly;
  let counterTower: counterTower;

  it('Setup instruments, airplane, towers, and visit the entry url', () => {
    instruments = buildAppInstruments();
    fly = useAirplane(instruments);
    counterTower = setupCounterTower(instruments);

    instruments.url().visit(useUrls().entryUrl);
  });

  it('Verify initial state', () => {
    instruments.verifyState();
  });

  it('Click the counter button to increment the count displayed on the button', () => {
    fly(clickToIncrementTheCount({
      counterTower,
      expectedCount: 1
    }));
  });
});
```

Discover more [instrument types](./using-instruments.md).

Happy flying!
