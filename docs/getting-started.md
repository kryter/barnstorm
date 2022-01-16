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

The idea behind a Barnstorm plugin is to provide `mechanics` that know how to interact with UI elements using a specific test framework.  These mechanics are isolated from other test code making it easier to switch test frameworks.

## Barnstorm Configuration

A Barnstorm plugin provides a set of test framework specific mechanics via a `useMechanics()` method.  Use the resulting `mechanics group` to create an `instrument set` that can be used by any test.

We can create `useInstruments.ts` in a location conveniently available to the test files.  For convenience, we can put this file in a new `barnstorm` folder in the `cypress` directory.

```typescript
import { InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { useMechanics } from '@kryter/barnstorm-cypress/lib/useMechanics';

const mechanicGroup = useMechanics();

export function useInstruments(): InstrumentSet {
  return new InstrumentSet(mechanicGroup);
}
```

We can now use an `instrument set` that is configured with `mechanics` that match the test framework being used for the app.

We can also file with our expected urls, `useUrls.ts`, in the same location for tracking our app's expected URLs:

```typescript
export function useUrls(): Record<string, string> {
  const baseUrl = 'http://localhost:3000';

  return {
    baseUrl,
    home: `${baseUrl}/home`
    // Add more urls here...
  };
}
```

Now with the project setup completed, we can start [writing tests!](./writing-tests.md)
