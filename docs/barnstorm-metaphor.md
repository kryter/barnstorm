# Barnstorm Metaphor

Barnstorm is based on an aviation metaphor: Imagine yourself, the test developer, as the pilot of an airplane that is flying around a landscape, which is the application.  You'll coordinate with your mechanics before your flight so they can equip your airplane for your mission.  Towers in each area guide you as you fly to points of interest (i.e. any UI element that you can see an/or interact with).  Your instruments provide the means to get you to the point of interest, interact with a point of interest, and take measurements for verification.  Your flight plan tells you where to fly and what to do when you get there.  If you can make it to the end without an emergency landing, it means the test is passing and the app is working!

## Towers

Each tower represents an area of the app, providing access to the UI elements in that app area.  Towers can help you find UI elements to manipulate and verify.  Towers act like a directory of the UI elements in the application.

With towers, CSS selectors are no longer "magic strings", and instead are neatly organized into data that clearly describes the UI elements in the app.

## Mechanics

Mechanics are test framework specific implementations of actions that directly interact with the web UI.  Mechanics provide the low level manipulations and verifications that make the building blocks for higher level instrument concepts.  Mechanics are framework specific and can be swapped out if the test framework needs to change.

## Instruments

Instruments are test framework agnostic tools for testing specific UI element types.  Instruments are designed to manipulate and verify the state of a UI element using only mechanics.  Instruments track the initial expected state of the UI element and any changes to that state.  During a flight, the airplane automatically verifies the state of the instruments at the end of each flight leg.

## Flight Legs and Flight Plans

A flight leg explicitly combines a user action and the expected state updates for that action into a reusable block.  Explicitly separating the "user actions" from the "update state and verifications" sections of the test makes the test more intentional because it easy to see if any actions are being done that are not being verified.  Barnstorm automatically verifies state, so the test developer only needs to define the user action to perform and the expected state updates.

A flight plan combines one or more flight legs.  Tests can reuse a flight leg or flight plan without any refactoring required.

## Tests

Tests are where the building blocks of instruments, towers, flight legs, and flight plans come together to describe a flight through the app landscape.  Use the airplane to fly the flight plan and see if you can make it to the end of the route.

Are you ready to climb into the cockpit?  Head over to [Project Setup](/docs/project-setup.md).
