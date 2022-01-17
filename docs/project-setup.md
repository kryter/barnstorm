# Project Setup

## Prerequisites

To use `Barnstorm`, you'll need to have your end to end test infrastructure set up to run tests.  For this guide, we've set up our project with [Cypress](https://www.cypress.io/) as our test framework.

## Install Barnstorm

Install Barnstorm using `npm`:

```bash
npm install --save-dev barnstorm
```

## Install Barnstorm Test Framework Plugin

You'll also need a Barnstorm plugin for your specific test framework.  For this guide we will be using the `Cypress` test framework, so we'll use the `@kryter/barnstorm-cypress` plugin for Cypress:

```bash
npm install --save-dev @kryter/barnstorm-cypress
```

If the plugin you need doesn't exist yet, you can create one by replicating the structure in `@kryter/barnstorm-cypress` and replacing the method implementations with implementations for your specific test framework.

The idea behind a Barnstorm plugin is to provide `mechanics` that know how to interact with UI elements using a specific test framework.  These mechanics are isolated from other test code making it easier to switch test frameworks.

## Barnstorm Configuration

A Barnstorm plugin provides a set of test framework specific mechanics via a `useMechanics()` method.  Use the resulting `mechanics group` to create an `instrument set` that can be used by any test.

We can create a `useInstruments.ts` file in a location available to the test files.  For convenience, we can put this file (and others we will create) in a new `barnstorm` folder in the `cypress` directory.

```typescript
import { useInstrumentSet, InstrumentSet } from '@kryter/barnstorm/lib/InstrumentSet';
import { useMechanics } from '@kryter/barnstorm-cypress/lib/useMechanics';

const mechanicGroup = useMechanics();

export function useInstruments(): InstrumentSet {
  return useInstrumentSet(mechanicGroup);
}
```

We can now use an `instrument set` that is configured with `mechanics` that match our test framework.

We can also create file with our expected urls, `useUrls.ts`, in the same location for tracking our app's expected URLs:

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

Now with the project setup completed, we can begin our [test setup](./test-setup.md).
