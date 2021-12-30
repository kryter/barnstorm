# Getting Started

## Prerequisites

To use `Barnstorm`, you'll need to have your end to end test infrastructure set up to run tests.

## Install Barnstorm

Install Barnstorm using `npm`:

```bash
npm install --save-dev barnstorm
```

## Install Barnstorm Test Framework Plugin

You'll also need a Barnstorm plugin for your specific test framework.  For this guide we will be using the `Cypress` end to end test framework, so we'll use the `@kryter/barnstorm-cypress` plugin:

```bash
npm install --save-dev @kryter/barnstorm-cypress
```

If the plugin you need doesn't exist, it is easy to create one by replicating the structure in `@kryter/barnstorm-cypress` and replacing the class method implementations with implementations for your specific test framework.

The idea behind a Barnstorm plugin is to provide `mechanics` that know how to interact with UI elements using a specific test framework.

A Barnstorm plugin provides a set of test framework specific mechanics via a `buildMechanicsSet()` method.  Use the resulting `mechanics set` to create an `instrument set`:

```typescript
import { InstrumentSet } from "@kryter/barnstorm/lib/InstrumentSet";
import { buildMechanicsSet } from "@kryter/barnstorm-cypress/lib/buildMechanicsSet";

export const instrumentSet: InstrumentSet = new InstrumentSet(buildMechanicsSet());
```

For convenience, I put this bit of code in a file called `AppInstrumentSet.ts` in my `src` directory to make it easy to use from all my `page` files that live next to their corresponding components.

## Create Page Files for UI Elements

`Barnstorm` uses `page` files that contain a mapping of CSS selectors needed to access each UI element contained in a component.  The idea is that each component should have a corresponding `page` file that exposes all the component's visual and interactive functionality to the tests.

A typical industry standard `page` file looks something like this:

```typescript
class TodoPage {
  public entryUrl(): string {
    return 'https://example.cypress.io/todo';
  }

  public todoListItemCheckbox(): string {
    return '.todo-list input[type="checkbox"].toggle';
  }

  public todoTextBox(): string {
    return '[data-test=new-todo]';
  }

  public activeFilterButton(): string {
    return '[href="#/active"]';
  }
}

export const todoPage = new TodoPage();
```

`Page` files are great because they turn CSS selectors from "magic strings" into reusable named strings that are neatly organized.

In `Barnstorm`, we will add `flight instruments` to our `page` files to make it easier to interact with the UI controls when we write our tests.  This means that instead of returning CSS selectors directly, the `page` files will return `flight instruments`.  Soon we will see how `pilots` use these `flight instruments` to fly the route specified by a `test`.

For example:

```typescript
import {
  ButtonInstrument,
  CheckboxInstrument,
  ElementInstrument,
  KeyboardInstrument,
  ListInstrument,
  TextBoxInstrument,
  UrlInstrument
 } from "@kryter/barnstorm/lib/instruments";
import { instrumentSet } from '../AppInstrumentSet';

class TodoPage {
  public entryUrl(): UrlInstrument {
    return instrumentSet.useUrl({
      url: 'https://example.cypress.io/todo'
    });
  }

  public todoList(): ListInstrument {
    return instrumentSet.useList({
      selector: '.todo-list',
      relativeItemSelector: 'li'
    });
  }

  public todoListItemCheckbox(itemNumber: number): CheckboxInstrument {
    return instrumentSet.useCheckbox({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: 'input[type="checkbox"].toggle'
    });
  }

  public todoTextBox(): TextBoxInstrument {
    return instrumentSet.useTextBox({
      selector: '[data-test=new-todo]'
    });
  }

  public activeFilterButton(): ButtonInstrument {
    return instrumentSet.useButton({
      selector: '[href="#/active"]'
    });
  }
}

export const todoPage = new TodoPage();
```

You may notice that a Barnstorm `page` file is more verbose because it contains more information about the UI elements it describes.

`Flight instruments` make `page` files more readable because the instrument type defines the type of UI element represented by the instrument, and we can include other metadata relevant to the UI element.

We can represent the structure of nested items more intentionally.  In the case of the example TODO app, each TODO list item has a checkbox and we want to be able to target the checkbox for a specific list item when we manipulate or verify the checkbox.  The Barnstorm `page` file with `flight instruments` is able to represent this nested relationship easily.

## Organizing Page Files

`Barnstorm` is not opinionated about where to store page files, so if you have an existing structure that you like, go ahead and use that.  Here are some file organization recommendations based on my experience:

I use a component-based folder structure where my unit tests are in the same folder as the code they are testing, so I also put my `page` files in the same folder as the component that the page file represents.  This makes it easy to see if there is missing component level test coverage and it keeps the test CSS selectors near the HTML code they correspond with.

If I'm building a component library, putting my `page` files in the same folder at the component also makes it easy to publish the `page` file for test writers using the component and they will not have to rewrite the `page` file (or write the inline equivalent).

## Using Flight Instruments in Tests

With a Barnstorm style page file, the tests tend to read more intentionally, will have less tricky CSS selection logic, and will do more verifications.  Some comparisons are below.

Bare test visiting a URL:

```typescript
cy.visit('https://example.cypress.io/todo')
```

Barnstorm test using a `url instrument`:

```typescript
todoPage.entryUrl().visit();
```

For this simple case, a Barnstorm `page` file doesn't provide an advantage over a standard `page` file, but we still use a flight instrument so the tests read consistently.

---

Bare test adding an item to a list:

```typescript
const newItem = 'Feed the cat'
cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

cy.get('.todo-list li')
  .should('have.length', 3)
  .last()
  .should('have.text', newItem)
```

Barnstorm test using a `url instrument`:

```typescript
const newItem = 'Feed the cat';

todoPage.todoTextBox().enterText(newItem);
todoPage.keyboard().pressEnter();

const expectedContent = [
  'Pay electric bill',
  'Walk the dog',
  newItem
];

todoPage.todoList().verifyListContent(expectedContent);
```

In this case, using the `flight instruments` let's us avoid code that walks the DOM tree directly and also allows us to trivially verify the entire list instead of just one item.  This gives a more rigorous and robust verification.

---

Bare test adding an item to a list:

```typescript
cy.contains('Pay electric bill')
  .parent()
  .find('input[type=checkbox]')
  .check()

cy.contains('Pay electric bill')
  .parents('li')
  .should('have.class', 'completed')
```

Barnstorm test using a `url instrument`:

```typescript
todoPage.todoListItemCheckbox(1).check();
todoPage.todoListItem(1).verifyHasClass('completed');
```

In this case, using the `flight instruments` let's us avoid more code that walks the DOM tree directly, both for manipulating the checkbox and verifying the result.
