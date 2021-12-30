import MechanicsSet from './MechanicsSet';
import { ButtonInstrument } from './instruments/button/ButtonInstrument';
import { CheckboxInstrument } from './instruments/checkbox/CheckboxInstrument';
import {
  ElementInstrument,
  ElementInstrumentOptions,
} from './instruments/element/ElementInstrument';
import { KeyboardInstrument } from './instruments/keyboard/KeyboardInstrument';
import { TextAreaInstrument } from './instruments/textArea/TextAreaInstrument';
import { TextBoxInstrument } from './instruments/textBox/TextBoxInstrument';
import {
  UrlInstrument,
  UrlInstrumentOptions,
} from './instruments/url/UrlInstrument';
import {
  ListInstrument,
  ListMechanicOptions,
} from './instruments/list/ListInstrument';

export class InstrumentSet {
  constructor(protected mechanicsSet: MechanicsSet) {}

  /**
   * Build and configure a button instrument with the current mechanics set.
   */
  public useButton(
    instrumentOptions: ElementInstrumentOptions
  ): ButtonInstrument {
    return new ButtonInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a checkbox instrument with the current mechanics set.
   */
  public useCheckbox(
    instrumentOptions: ElementInstrumentOptions
  ): CheckboxInstrument {
    return new CheckboxInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a element instrument with the current mechanics set.
   */
  public useElement(
    instrumentOptions: ElementInstrumentOptions
  ): ElementInstrument {
    return new ElementInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a keyboard instrument with the current mechanics set.
   */
  public useKeyboard(): KeyboardInstrument {
    return new KeyboardInstrument(this.mechanicsSet);
  }

  /**
   * Build and configure  a list instrument with the current mechanics set.
   */
  public useList(instrumentOptions: ListMechanicOptions): ListInstrument {
    return new ListInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a text area instrument with the current mechanics set.
   */
  public useTextArea(
    instrumentOptions: ElementInstrumentOptions
  ): TextAreaInstrument {
    return new TextAreaInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a text box instrument with the current mechanics set.
   */
  public useTextBox(
    instrumentOptions: ElementInstrumentOptions
  ): TextBoxInstrument {
    return new TextBoxInstrument(this.mechanicsSet, instrumentOptions);
  }

  /**
   * Build and configure  a url instrument with the current mechanics set.
   */
  public useUrl(instrumentOptions: UrlInstrumentOptions): UrlInstrument {
    return new UrlInstrument(this.mechanicsSet, instrumentOptions);
  }
}
