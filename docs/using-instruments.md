# Using Instruments

## Keyboard Instrument

The `keyboard instrument` is used to type as the user would from the keyboard and the text is directed into the currently focussed element.  There is only one keyboard instrument and it is configured by default on every `instrument set`.  To use the keyboard instrument, use the convenience method on the instrument set:

```typescript
instruments.keyboard().typeText('abc');
instruments.keyboard().pressEnter();
```

## Url Instrument

The `url instrument` enables the test to visit specific URLs and verify the current URL.  There is only one url instrument and it is configured by default on every `instrument set`.  To use the url instrument, use the convenience method on the instrument set:

```typescript
instruments.url().visit(ENTRY_URL);
```

When the `visit()` method is called, the url instrument will automatically update its expected URL state to the new URL.  However, if the URL will change based on some other action (or the expected URL is different from the one that was passed to `visit()`), then you'll need to update the URL instrument manually to expect the new state:

```typescript
instruments.url().updateState({
  currentUrl: nextUrl
});
```

## UI Element Instrument

The `ui element instrument` is the base level instrument for interacting with any DOM element in the UI.  Other DOM based instruments, such as `button instrument`, `checkbox instrument`, `text area instrument`, `text box instrument`, or `list instrument` are based on the `ui element instrument` and will contain all the base level functionality appropriate for all UI elements, for example, `isPresent`, `isVisible`, `textContent`, `hasClasses`, etc.

The base `ui element instrument` is typically used for elements that have a display state but are not interactive (such as a label or heading element).

```typescript
const UI_ELEMENT = 'UI_ELEMENT';

const uiElement = {
    id: UI_ELEMENT,
    instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
    selector: '.simplest-possible-css-path-to-element',
    initialState: {
      hasClasses: ['label'];
      doesNotHaveClasses: ['selected'];
      textContent: 'hello world'
      inFocus: true
    }
  }
};
```

In general, when specifying any instrument, specify as much initial state as possible so that your test will verify as much as possible and alert you to as many changes in state as possible.

## Button Instrument

A `button instrument` has all the features of a `ui element instrument` plus it has a `.click()` method to click on the DOM element (which can be any HTML element with a click handler -- it does not need to be a `<button>` element to be used with a `button instrument`).

```typescript
const A_BUTTON = 'A_BUTTON';

const aButton = {
  id: A_BUTTON,
  instrumentType: INSTRUMENT_TYPES.BUTTON,
  selector: '.simplest-possible-css-path-to-element',
  initialState: {
    textContent: 'count is: 0'
  }
};
```

Once you've added the button instrument to your instrument set, you can interact with the button:

```typescript
theTower.aButton().click();
```

## Checkbox Instrument

A `checkbox instrument` has all the features of a `ui element instrument` plus it has a methods to check and uncheck the checkbox.

```typescript
const ITEM_CHECKBOX = 'ITEM_CHECKBOX';

const itemCheckbox = {
  id: ITEM_CHECKBOX,
  instrumentType: INSTRUMENT_TYPES.CHECKBOX,
  selector: 'input[type="checkbox"].toggle',
  initialState: {
    isChecked: false
  }
};
```

If you've hidden your checkbox (and painted some other shape to the screen so the user is aware is a checkbox), you'll need to let the test know that the checkbox is invisible, but still interactive by adding the `verifyStateWhenInvisible` option when configuring the checkbox.  This flag works for any UI element.

```typescript
const ITEM_CHECKBOX = 'ITEM_CHECKBOX';

const itemCheckbox = {
  id: ITEM_CHECKBOX,
  instrumentType: INSTRUMENT_TYPES.CHECKBOX,
  selector: 'input[type="checkbox"].toggle',
  verifyStateWhenInvisible: true,
  initialState: {
    isChecked: false
  }
};
```

Once you've added the checkbox instrument to your instrument set, you can interact with the checkbox:

```typescript
theTower.itemCheckbox().check();
theTower.itemCheckbox().uncheck();
```

Like the `url instrument` the checkbox instrument will automatically update its expected state when `.check()` or `.uncheck()` is called.  This can be overridden with a call to `.updateState()`.

## List Instrument

A `list instrument` has all the features of a `ui element instrument` plus it has a methods to handle its list content.

When specifying the list, you'll need to specify all the possible columns for each row so that the `list instrument` can create instruments for each cell in each row, based on the presence of expected row state in the list.

You'll also need to pass a relative item selector that will select any row child from the list parent (this is so that the list instrument can do the DOM walking for you to get to the children).

The selector passed to the column configs is the path from the list item row to the column (this selector can be empty for any column that can use the row element as the column element).

```typescript
// Export the column keys for a list for reference in expected data
// updates during tests.
const TODO_LIST = 'TODO_LIST';
export const TODO_ITEM_TEXT = 'TODO_ITEM_TEXT';
export const TODO_ITEM_CHECKBOX = 'TODO_ITEM_CHECKBOX';

const todoListConfig = {
  id: TODO_LIST,
  instrumentType: INSTRUMENT_TYPES.LIST,
  selector: '.todo-list',
  relativeItemSelector: 'li',
  columns: [
    {
      id: TODO_ITEM_TEXT,
      instrumentType: INSTRUMENT_TYPES.UI_ELEMENT,
      selector: '',
    },
    {
      id: TODO_ITEM_CHECKBOX,
      instrumentType: INSTRUMENT_TYPES.CHECKBOX,
      selector: 'input[type="checkbox"].toggle'
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
const cellId = todotheTower.todoList().getCellId(rowIndex, TODO_ITEM_CHECKBOX);
instrumentSet.use<CheckboxInstrument>(cellId).check();
```

Updating the expected state for a list is a little verbose (intentional for clarity and to support multiple columns), so it takes a little getting used to.  Here is the expected results for a list with one row containing two column items:

```typescript
todotheTower.todoList().updateState({
  rows: [
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Walk the dog'
      },
      [TODO_ITEM_CHECKBOX]: {
        isChecked: false,
        isVisible: false
      }
    }
  ]
});
```

Here is the expected results for a list with two rows.  Notice that the first row only contains one column item but the second row has two column items.  This is useful when not all rows will have all column items:

```typescript
todotheTower.todoList().updateState({
  rows: [
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Walk the dog'
      }
    },
    {
      [TODO_ITEM_TEXT]: {
        textContent: 'Walk the dog'
      },
      [TODO_ITEM_CHECKBOX]: {
        isChecked: false,
        isVisible: false
      }
    }
  ]
});
```

## TextArea Instrument

A `text area instrument` has all the features of a `ui element instrument` plus it has a methods to interact with its text.

```typescript
const A_TEXT_AREA = 'A_TEXT_AREA';

const aTextArea = {
  id: A_TEXT_AREA,
  instrumentType: INSTRUMENT_TYPES.TEXT_AREA,
  selector: '.simplest-possible-css-path-to-element',
  initialState: {
    inputText: '',
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
    inputText: '123abc',
  });
```

## TextBox Instrument

A `text box instrument` has all the features of a `ui element instrument` plus it has a methods to interact with its text.

```typescript
const A_TEXT_BOX = 'A_TEXT_BOX';

const aTextBox = {
  id: A_TEXT_BOX,
  instrumentType: INSTRUMENT_TYPES.TEXT_BOX,
  selector: '.simplest-possible-css-path-to-element',
  initialState: {
    inputText: '',
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
    inputText: '123abc',
  });
```
