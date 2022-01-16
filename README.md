# Barnstorm ![Barnstorm Icon](./favicon.png "Let's go storm some barns!")

Barnstorm provides organization and generic methods for end to end tests that make tests faster to write and more robust to changes from the application or the test tools.

 1. [Get Started with Barnstorm](/docs/getting-started.md)
 2. [Writing Tests with Barnstorm](/docs/writing-tests.md)
 3. [Using Barnstorm Instruments](/docs/using-instruments.md)

## Why Barnstorm?

Barnstorm provides `instruments` to make it easier to interact with UI components and track their expected state.  Instruments know how to interact with specific UI components (textboxes, buttons, tables, etc.) and how to verify their state.  Barnstorm automatically verifies instrument state at the end of each test step so tests no longer need to perform verifications, rather they only update the expected state when it changes.

Barnstorm provides a `flight plan` mechanism to make it easier to organize and reuse test actions.  With Barnstorm, test code becomes less imperative and more declarative so that the developer can focus more on the intent of the test and less on the implementation details of the test framework.  With Barnstorm, the test developer will rarely (if ever) need to write imperative DOM walking code to manipulate a UI element or verify its state because the location of the UI element and its state is described declaratively.

Barnstorm puts all test framework specific logic into `mechanics` which are plugged into Barnstorm, helping prevent library and vendor lock in.  This makes switching to a new test framework simple because only the mechanics need to be changed.  With Barnstorm, it is possible to transition to a different test framework even if there are hundreds of tests in the project and it is not practical to refactor every test.

## Barnstorm Metaphor

Barnstorm is based on an aviation metaphor: Imagine yourself, the test developer, as the pilot of an airplane that is flying around a landscape which is the application.  Towers in each area of the application guide you as you fly to points of interest on the landscape (i.e. any UI element that you can see an/or interact with).  Your instruments provide the means to get you to the point of interest, interact with a point of interest, and take measurements for verification.  You'll need to coordinate with mechanics before each flight to make sure they’ve fully equipped your airplane for the current mission and make sure you have a flight plan in place so you know your route before you climb in the cockpit.

### Towers

Each tower represents an area of the app, providing access to the UI elements in that app area.  Towers can help you find UI elements to manipulate and verify.  Towers act like a phone book of the UI elements in the application.

With towers, CSS selectors are no longer "magic strings", and instead are neatly organized into data that is used to create `instruments`.

### Mechanics

Mechanics are test framework specific implementations of actions that directly interact with the web UI.  Mechanics provide the low level manipulations and verifications that make the building blocks for higher level instrument concepts.  Mechanics are framework specific and can be swapped out if the test framework needs to change.

### Instruments

Instruments are test framework agnostic tools for testing specific UI element types.  Instruments are designed to manipulate and verify the state of a UI element.  Instruments track the initial expected state of the UI element and any changes to that state.  During a flight, all instruments automatically verify their state at the end of each leg of the journey.

### Flight Legs and Flight Plans

A flight leg explicitly combines a user action and the expected state updates for that action into a reusable block.  Explicitly separating the "user actions" from the "update state and verifications" sections of the test makes the test more intentional because it easy to see if any actions are being done that are not being verified.  Barnstorm automatically verifies state, so the test developer only needs to define the user action and the expected state update needed.

A flight plan combines one or more flight legs.  Many tests can reference a single flight leg or flight plan without any refactoring required.

### Tests

Tests are where the building blocks of instruments, towers, flight legs, and flight plans come together to describe a flight through the app landscape.

Let’s go storm some barns!
