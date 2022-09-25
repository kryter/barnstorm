# Barnstorm ![Barnstorm Icon](./favicon.png "Let's go storm some barns!")

Barnstorm provides organization and generic methods for end to end tests that make tests faster to write and more robust to changes from the application or the test tools.

 1. [Barnstorm Metaphor](/docs/barnstorm-metaphor.md)
 2. [Project Setup](/docs/project-setup.md)
 3. [Test Setup](/docs/test-setup.md)
 4. [Instrument Guide](/docs/instrument-guide.md)
 5. [Instrument State Guide](/docs/instrument-state-guide.md)

## Overview

Barnstorm provides `instruments` to make it easier to interact with UI components and track their expected state.  Instruments know how to interact with specific UI components (textboxes, buttons, tables, etc.) and how to verify their state.  Barnstorm automatically verifies instrument state at the end of each test step so tests no longer need to perform explicit verifications, rather they only update the expected state when it changes.  Barnstorm will verify the state of every instrument after any test step when a part of that instrument state changes.

Barnstorm provides a `flight plan` mechanism to make it easier to organize and reuse test actions.  With Barnstorm, test code becomes less imperative and more declarative so that the developer can focus more on the intent of the test and less on the implementation details of the test framework.  With Barnstorm, the test developer will rarely (if ever) need to write imperative DOM walking code to manipulate a UI element or verify its state because the location of the UI element and its state is described declaratively.

Barnstorm puts all test framework specific logic into `mechanics` which are plugged into Barnstorm, helping prevent library and vendor lock in.  This makes switching to a new test framework simple because only the mechanics need to be changed.  With Barnstorm, it is practical to transition to a different test framework even if there are hundreds of tests in the project and it is not practical to refactor every test.

## Examples

To see and run some tests that use Barnstorm, see these sample projects:

[Barnstorm Samples](https://github.com/kryter/barnstorm-samples) contains Barnstorm tests that target the [Cypress Todo App](https://example.cypress.io/todo).  This example shows how to use a number of different instruments, including a list instrument that can easily access a "hidden" checkbox or the text associated with any item in the todo list.

[Barnstorm Nonsense App](https://github.com/kryter/barnstorm-nonsense-app) contains a "nonsense app" and includes tests written in Barnstorm to test the "nonsense app" so you can see what the test code looks like when it is alongside the product code.  This example demonstrates testing a login page, a modal dialog, a form, and a table.
