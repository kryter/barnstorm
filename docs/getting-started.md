# Getting Started

## Prerequisites

To use `Barnstorm`, you'll need to have your end to end test infrastructure set up to run tests.

## Install Barnstorm

Install Barnstorm using `npm`:

```bash
npm install --save-dev barnstorm
```

## Install Barnstorm Test Framework Plugin

You'll also need a Barnstorm plugin for your specific test framework.  For this guide we will be using the `Cypress` end to end test framework, so we'll use the `@kryter/barnstorm-cypress` plugin for Cypress:

```bash
npm install --save-dev @kryter/barnstorm-cypress
```

If the plugin you need doesn't exist yet, you can create one by replicating the structure in `@kryter/barnstorm-cypress` and replacing the method implementations with implementations for your specific test framework.

The idea behind a Barnstorm plugin is to provide `mechanics` that know how to interact with UI elements using a specific test framework.  These mechanics can be isolated from other test code making it easier to switch test frameworks.

## Barnstorm Configuration

A Barnstorm plugin provides a set of test framework specific mechanics via a `createMechanicGroup()` method.  Use the resulting `mechanics group` to create an `instrument set` that can be used by any test.

We can create `AppInstruments.ts` in a location conveniently available to the test files:

```typescript
import { InstrumentSet } from "@kryter/barnstorm/lib/InstrumentSet";
import { createMechanicGroup } from "@kryter/barnstorm-cypress/lib/createMechanicGroup";

const mechanicGroup = createMechanicGroup();

export function buildInstrumentSet(): InstrumentSet {
  return new InstrumentSet(mechanicGroup);
}

export type AppInstruments = ReturnType<typeof buildAppInstruments>;
```

Every test using Barnstorm will need to access Barnstorm `instruments` from the `app instrument set`.  The `app instrument set` is configured with `mechanics` that match the test framework being used.

We can also create a constants file, `AppUrls.ts`, in the same location for tracking our app's expected URLs:

```typescript
export const BASE_URL = 'http://localhost:3000';
export const ENTRY_URL = `${BASE_URL}/`;
```

Now with the project setup completed, we can start [writing tests](./writing-tests.md).
