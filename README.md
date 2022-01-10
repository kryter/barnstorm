# Barnstorm

Barnstorm provides organization for end to end tests that goes beyond just adding page files. Barnstorm also provides generic methods that make tests faster to write and more robust to changes from the application or the test tools.

[Get Started with Barnstorm](/docs/getting-started.md)
[Write Tests with Barnstorm](/docs/writing-tests.md)

## Why Barnstorm?

Barnstorm provides flight instruments to make it easier to interact with UI components as well as track their expected state.  Barnstorm automatically verifies the full state of the application at the end of each test step.

Barnstorm provides a flight plan mechanism to make it easier to organize common test actions and enable them to be reused across tests.  With Barnstorm, test code becomes less imperative and more declarative so that the developer can focus more on the intent of the test and less on the implementation details of the test framework.

Barnstorm puts all test framework specific common code into mechanics which can be easily plugged into Barnstorm, helping prevent library and vendor lock in.  This makes switching to a new test framework simpler because only the mechanics need to be changed.  With Barnstorm, it is possible to transition to a different test framework even if there are hundreds of tests in the project and it is not practical to refactor every test.

## Barnstorm Metaphor

Barnstorm is based on an aviation metaphor: Imagine yourself, the tester, as the pilot of an airplane that is flying around a landscape which is the application.  Your page files are your maps of points of interest on the landscape (i.e. any UI element that you can see an/or interact with).  Your flight instruments provide the means to get you to the point of interest, interact with a point of interest, and take measurements for verification.  It’s always important to talk to your mechanics before your flight to make sure they’ve fully equipped your airplane for the current mission and make sure you have a flight plan in place so you know your route before you climb in the cockpit.

### Pages

Pages are maps that help your pilots and instruments determine where to find UI elements to manipulate and verify.  Pages act like a phone book of the UI elements in the application.

`Page` files are great because they turn CSS selectors from "magic strings" into reusable named strings that are neatly organized.

In `Barnstorm`, we will add `flight instruments` to our `page` files to make it easier to interact with the UI controls when we write our tests.  This means that instead of returning CSS selectors directly, the `page` files will return `flight instruments`.

### Mechanics

Mechanics are test framework specific implementations of actions that directly interact with the web UI.  Mechanics provide the low level manipulations and verifications that make the building blocks for higher level instrument concepts.  Mechanics are framework specific and can be swapped out if the test framework needs to change.

### Flight Instruments

Flight instruments are test framework agnostic tools for testing specific UI element types.  Instruments are designed to manipulate and verify the state of a UI element.  Instruments track the initial expected state of the UI element and any changes to that state.  During a flight, all instruments automatically verify their state at the end of each leg of the journey.

### Flight Plans

Flight plans combine instrument actions, expected state updates, and verifications into reusable blocks.  Many tests can reference a single flight plan without refactoring.

### Tests

Tests are where the building blocks of flight plans come together to describe a flight through the app landscape.

Let’s go storm some barns!
