# Getting Started

## Prerequisites

To use `Barnstorm`, you'll need to have your end to end test infrastructure set up to run tests.

## Install Barnstorm

Install Barnstorm using `yarn`:

```bash
yarn add --dev barnstorm
```

or `npm`:

```bash
npm install --save-dev barnstorm
```

Note: Barnstorm documentation uses `yarn` commands, but `npm` will also work. You can compare `yarn` and `npm` commands in the `yarn` [docs](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

## Install Barnstorm Test Framework Plugin

You'll also need a `Barnstorm` plugin for your framework.  For this guide I will be using the `Cypress` end to end test framework, so I'll need the `@kryter/barnstorm-cypress` plugin:

```bash
yarn add --dev @kryter/barnstorm-cypress
```

If the plugin you need doesn't exist, it is easy to create one by replicating the structure in `@kryter/barnstorm-cypress` and replacing the `Cypress` method implementations with implementations for your test framework.

## Create page files for UI components

`Barnstorm` uses the test automation industry standard concept of `page` files that contain a mapping of CSS selectors needed to access each control or UI view contained in the component represented by the `page`.

A standard `page` file might look like this:

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

  public clearCompletedButton(): string {
    return '.todo-button.clear-completed';
  }
}

export const todoPage = new TodoPage();
```

`Page` files are great because they turn CSS selectors from "magic strings" into reusable named strings.

In `Barnstorm`, we will add `flight instruments` to our `page` files to make it easier to interact with the UI controls when we write our tests.  This means that instead of returning CSS selectors, the `page` files will return `flight instruments`.

For example:

```typescript
import {
  ButtonInstrument,
  CheckboxInstrument,
  ElementInstrument,
  ListInstrument,
  TextBoxInstrument,
  UrlInstrument
 } from "@kryter/barnstorm/lib/instruments";

class TodoPage {
  public entryUrl(): UrlInstrument {
    return new UrlInstrument({
      url: 'https://example.cypress.io/todo'
    });
  }

  public todoListItemCheckbox(itemNumber: number): CheckboxInstrument {
    return new CheckboxInstrument({
      listInstrument: this.todoList(),
      itemNumber: itemNumber,
      selector: 'input[type="checkbox"].toggle'
    });
  }

  public todoTextBox(): TextBoxInstrument {
    return new TextBoxInstrument({
      selector: '[data-test=new-todo]'
    });
  }

  public activeFilterButton(): ButtonInstrument {
    return new ButtonInstrument({
      selector: '[href="#/active"]'
    });
  }

  public clearCompletedButton(): ButtonInstrument {
    return new ButtonInstrument({
      selector: '.todo-button.clear-completed'
    });
  }
}

export const todoPage = new TodoPage();
```

`Flight instruments` make `page` files more readable because they declare the type of UI element that they represent based on the instrument type.

##### Sidebar: Where to store `page` files?

`Barnstorm` is not opinionated about where to store page files, so if you have an existing structure that you like, go ahead and use that.

These are the best practices I recommend:

I use a component-based folder structure where my unit tests are in the same folder as the code they are testing, so I also put my `page` files in the same folder as the component that the page file represents.  This makes it easy to see if there is missing component level test coverage and it keeps the test CSS selectors near the HTML code they correspond with.

If I'm building a component library, putting my `page` files in the same folder at the component also makes it easy to publish the `page` file for test writers using the component and they will not have to rewrite the `page` file (or write the inline equivalent).


