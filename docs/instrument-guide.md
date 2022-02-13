# Instrument Guide

## Default instruments

A new instrument set comes with default instruments that include a `keyboard instrument` and a `url instrument`.  These instruments can be used without any additional configuration or setup.

### Keyboard Instrument

The `keyboard instrument` is used to type as the user would from the keyboard and the text is directed into the currently focussed element.  To use the keyboard instrument, use the convenience method on the instrument set:

```typescript
instruments.keyboard().typeText('abc');
instruments.keyboard().pressEnter();
```

### Url Instrument

The `url instrument` enables the test to visit specific URLs and verify the current URL.  To use the url instrument, use the convenience method on the instrument set:

```typescript
instruments.url().visit(useUrls().entryUrl);
```

When the `visit()` method is called, the url instrument will automatically update its expected URL state to the new URL.  However, if the URL will change based on some other action (or the expected URL is different from the one that was passed to `visit()`), then you'll need to update the URL instrument manually to expect the correct state:

```typescript
instruments.url().updateState({
  currentUrl: nextUrl
});
```

## DOM Based Instruments

The `UI element instrument` is the base level instrument for interacting with any DOM element in the UI.  Other DOM based instruments, such as `button instrument`, `checkbox instrument`, `text area instrument`, `text box instrument`, or `list instrument` are based on the `ui element instrument` and will contain all the base level functionality appropriate for all UI elements, for example, `isPresent`, `isVisible`, `textContent`, `hasClasses`, `css`, etc.

In general, when specifying any instrument, specify as much initial state as possible so that your test will verify as much as possible and alert you to as many changes in state as possible.

`UI element instruments` require some additional configuration and must be explicitly added to the instrument set (it is recommended to do this configuration during `tower` setup).

### Hidden (But Still Interactive) Elements

If you've hidden your UI element but it is still interactive, such as a hiding a checkbox and painting some other shape to the screen so the user is aware there is a checkbox, you'll need to let the test know that although the UI element is invisible, it is still interactive and its state should still be verified.  In this case, you'll need to add the `verifyStateWhenInvisible` option when configuring the `UI element instrument`.  This flag works for any UI element, but is most commonly used with a checkbox.

```typescript
const aCheckbox = {
  id: 'aCheckbox',
  instrumentType: INSTRUMENT_TYPES.CHECKBOX,
  selector: {
    css: 'input[type="checkbox"].toggle',
    content: 'List item 3',
    iFrame: '
  },
  verifyStateWhenInvisible: true,
  initialState: {
    isChecked: false
  }
};
```

To see an example of a hidden interactive checkbox, see the [Barnstorm Samples](https://github.com/kryter/barnstorm-samples) that contains Barnstorm tests that target the [Cypress Todo App](https://example.cypress.io/todo).

For most purposes, specifying the CSS selector is enough for the test to find the element:

```typescript
  selector: {
    css: '.simplest-possible-css-path-to-element'
  }
```

In other cases, we need additional options:

### Select By Content

If you have a list of items (typically something like documents, projects, or other high level "containers" in the app) where you can't guarantee the content of the list except that the list should contain the one item that the test just created.  In the test you probably want to select this item to do something more with it (like open the project, document, or container).  This scenario often comes up in cases where multiple concurrent tests will need to be run against the same test user and the tests need to run independently and therefore cannot verify the full content of the list.  To make this case simple, we can look for the single item in the list that has the name we assign it in the test:

```typescript
  selector: {
    css: '.document-list-item',
    content: 'My new document - 0910a283-f8d0-45c3-884b-cdcd211d6dda'
  }
```

For these cases, it is recommended to name the item with a unique name, even if another instance of this test is running concurrently on the same machine.  This also can be helpful when developing locally so that multiple test runs of the same test don't interfere with each other.

### Select Within IFrame

You may find that you want to run tests on components that exist within an IFrame.  For example, if you write end to end tests for components that live in a [Storybook](https://storybook.js.org/), those components will exist within an IFrame, and the test will need to drill into the IFrame to interact with the component.  To solve this, add a selector for the iFrame as part of the selector object:

```typescript
  selector: {
    css: '.my-component',
    iFrame: 'iframe#storybook-preview-iframe'
  }
```

This will trigger the test to enter the iFrame before looking for the CSS specified in the selector.

### UI Element Instrument

The base `UI element instrument` is typically used for elements that have a display state but are not interactive (such as a label or heading element).

```typescript
const someUiElement = {
    id: 'someUiElement',
    instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
    selector: {
      css: '.simplest-possible-css-path-to-element'
    },
    initialState: {
      hasClasses: ['label'];
      doesNotHaveClasses: ['selected'];
      textContent: 'hello world'
      inFocus: true,
      css: {
        color: 'rgb(0, 0, 255)`
        // Add any other css properties to check here
      }
    }
  }
};
```

### Button Instrument

A `button instrument` has a `.click()` method to click on the DOM element.  Note that the `button instrument` can be used with any HTML element that user would click on, i.e. it does *not* need to be associated specifically with a `<button>` element.

```typescript
const aButton = {
  id: 'aButton',
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: {
    css: '.simplest-possible-css-path-to-element'
  },
  initialState: {
    textContent: 'count is: 0'
  }
};
```

Once you've added the button instrument to your instrument set, you can interact with the button:

```typescript
theTower.aButton().click();
```

### Checkbox Instrument

A `checkbox instrument` has methods to check and uncheck the checkbox.

```typescript
const aCheckbox = {
  id: 'aCheckbox',
  instrumentType: INSTRUMENT_TYPES.CHECKBOX,
  selector: {
    css: 'input[type="checkbox"].toggle'
  },
  initialState: {
    isChecked: false
  }
};
```

Once you've added the checkbox instrument to your instrument set, you can interact with the checkbox:

```typescript
theTower.aCheckbox().check();
theTower.aCheckbox().uncheck();
```

Like the `url instrument`, the `checkbox instrument` will automatically update its expected state when `.check()` or `.uncheck()` is called.  This expected state update can be overridden with a call to `.updateState()`.

### List Instrument

A `list instrument` has methods to handle its list content, including columns, so it can be used to verify tables as well as lists.

When specifying the list, you'll need to specify all the possible columns for each row so that the `list instrument` can create instruments for each cell in each row, based on the presence of expected row state in the list.

You'll also need to pass a relative item selector that will select any row child from the list parent (this is so that the `list instrument` can do the DOM walking for you to get to the children).

The selector passed to the column configs is the path from the list item row to the column (this selector can be empty for any column that can use the row element as the column element).

```typescript
// Export the column keys for a list for reference in expected data
// updates during tests.
export const TODO_ITEM_TEXT = 'TODO_ITEM_TEXT';
export const TODO_ITEM_CHECKBOX = 'TODO_ITEM_CHECKBOX';

const todoList = {
  id: 'todoList',
  instrumentType: INSTRUMENT_TYPES.LIST,
  selector: {
    css: '.todo-list'
  },
  relativeItemSelector: 'li',
  columns: [
    {
      id: TODO_ITEM_TEXT,
      instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
      selector: {
        css: ''
      },
    },
    {
      id: TODO_ITEM_CHECKBOX,
      instrumentType: INSTRUMENT_TYPES.CHECKBOX,
      selector: {
        css: '.item-checkbox'
      }
    }
  ],
  initialState: {
    rows: [
      {
        [TODO_ITEM_TEXT]: {
          textContent: 'Pay electric bill'
        },
        [TODO_ITEM_CHECKBOX]: {
          isChecked: false
        }
      },
      {
        [TODO_ITEM_TEXT]: {
          textContent: 'Walk the dog',
        },
        [TODO_ITEM_CHECKBOX]: {
          isChecked: false
        }
      }
    ]
  }
};
```

Once you've added the list instrument to your instrument set, you can interact with the automatically created instruments for each cell in each row in the expected row state in the list:

```typescript
const cellId = todoTower.todoList().getCellId(rowIndex, TODO_ITEM_CHECKBOX);
instrumentSet.use<CheckboxInstrument>(cellId).check();
```

Updating the expected state for a list is a little verbose (intentional for clarity and to support multiple columns), so it takes a little getting used to.  Here is an example expected results for a list with one row containing two column items:

```typescript
todoTower.todoList().updateState({
  rows: [
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Walk the dog'
      },
      [TODO_ITEM_CHECKBOX]: {
        isChecked: false
      }
    }
  ]
});
```

Here is an example expected results for a list with two rows.  Notice that the first row only contains one column item but the second row has two column items.  This is useful when not all rows will have all column items (or when you are only looking to check a subset of items):

```typescript
todoTower.todoList().updateState({
  rows: [
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Walk the dog'
      }
    },
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Feed the cat'
      },
      [TODO_ITEM_CHECKBOX]: {
        isChecked: false
      }
    }
  ]
});
```

### TextArea Instrument

A `text area instrument` has methods to interact with textarea text.

```typescript
const aTextArea = {
  id: 'aTextArea',
  instrumentType: INSTRUMENT_TYPES.TEXT_AREA,
  selector: {
    css: '.simplest-possible-css-path-to-element'
  },
  initialState: {
    textContent: '',
  }
};
```

Once you've added the text area instrument to your instrument set, you can interact with the text area:

```typescript
theTower.aTextArea().enterText('123');
theTower.aTextArea().enterText('abc');
```

When using a text area, you'll need to manually update the expected state after entering text:

```typescript
theTower.aTextArea().updateState({
    textContent: '123abc',
  });
```

### TextBox Instrument

A `text box instrument` has methods to interact with textbox text.

```typescript
const aTextBox = {
  id: 'aTextBox',
  instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
  selector: {
    css: '.simplest-possible-css-path-to-element'
  },
  initialState: {
    textContent: '',
  }
};
```

Once you've added the text box instrument to your instrument set, you can interact with the text box:

```typescript
theTower.aTextBox().enterText('123');
theTower.aTextBox().enterText('abc');
```

When using a text box, you'll need to manually update the expected state after entering text:

```typescript
theTower.aTextBox().updateState({
  textContent: '123abc',
});
```

Happy flying!
