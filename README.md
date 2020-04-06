# TypeScript Emails Input
An input component for adding multiple e-mails, displaying which are valid or not.

## Cloning
```console
git clone https://github.com/marlosin/ts-emails-input.git
```

## Running

### In development mode:

```console
# install dependencies
npm install

# run dev npm script
npm run dev
```

### Locally
The simplest way to run it all is:
```console
# if you're running for the first time, you'll need to build first
npm run build

# run local server
npm start
```

If the default port (`5000`) isn't being used, just go to http://localhost:5000 and enjoy, otherwise the console will display you the correct url.

## Lint
The task `npm run lint` runs ESLint script.

## Adding more inputs
By default, the form contains only one emails input. If you want to display more than one, you can open the browser's console and call `addEmailsInput()` or pass the number of inputs you want to add, e.g. `addEmailsInput(10)`

Alternatively, you can just change the code and run again. Either you pass an additional argument to `EmailForm` constructor inside [main.ts](./blob/master/src/main.ts):

```typescript
const emailForm = new EmailForm(document.body, 2 /* The number of inputs */)
```

or you modify the constructor itself inside [email-form.ts](./blob/master/src/components/email-form/email-form.ts)

```typescript
// ...
constructor (
  private readonly container: HTMLElement,
  private readonly inputs = 1, // modify value here
// ...
```

## Replacing all e-mails
If you want to replace the e-mails inside your input, open browser's console:

```js
// pass any e-mail address, it will replace only the first input's e-mails
addEmailsInput(['some@email.com', 'someinvalidemail'])

// to replace any other input, you can pass its index in the second argument (starting in 0)
// if the index is invalid, you'll not see changes in the app
addEmailsInput(['some@email.com', 'someinvalidemail'], 1) // will replace the second input
```
