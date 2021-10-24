# Barnstorm

Barnstorm provides organization for end to end tests that goes beyond just adding page files. Barnstorm also provides generic methods that make tests faster to write and more robust to changes from the application or the test tools.

## Getting started

Install barnstorm:

`npm install @kryter/barnstorm --save`

Then install the barnstorm specific plugin for your test framework.

Cypress:
`npm install @kryter/barnstorm-cypress`

If a plugin for your framework doesn't exist, you can create one using an existing plugin as the example.

Then update your tests to use flight instruments instead of making bare calls to the framework using inline CSS selectors.
