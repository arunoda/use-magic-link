# use-magic-link

Simple auth setup for your React app in few minutes with [Magic Link](https://magic.link).

[Read this guide](https://arunoda.me/blog/simple-auth-setup-for-your-react-app)

## Install the React Hook

```
yarn add use-magic-link
```

## Example

Here's how this React hook works:

```js
// Get this with "yarn add use-magic-link"
import useMagicLink from 'use-magic-link'

export default function Home() {
  // create the hook
  const auth = useMagicLink('<Publishable Key>');

  function loginNow() {
    const email = prompt('Enter your email');
    auth.login(email);
  }

  function getContent() {
    // Show a loading screen until we detect the login-state
    if (auth.loading || auth.loggingIn || auth.loggingOut) {
      return '...'
    }

    // Show this, if logged in
    if (auth.loggedIn) {
      return (
        <div>
          You are logged-in.
          <br/>
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )
    }

    // Show this, if not logged-in
    return (
      <div>
        <button onClick={loginNow}>Login Now</button>
      </div>
    )
  }

  return (
    <div className="container">
      <main>
        <h1>Next.js Bank</h1>
        <div className="content">{getContent()}</div>
      </main>
    </div>
  )
}
```

## API

You will get an auth object after you call the `use-magic-link` React hook. 

> Make sure to call this inside a functional component or inside another React hook.

```
import useMagicLink from 'use-magic-link'

// inside a functional component
const auth = useMagicLink('<Publishable Key>')
```

> You can get the `<Publishable Key>` by logging into the [Magic Link dashboard](https://magic.link/).

Here are the properties of `auth`:

### auth.loading

It will be `true`, until we load additional libraries and check the current login state.

### auth.loggedIn

It will be `true`, if we are loggedIn, otherwise `false`.

### auth.loggingIn

It will be `true`, once we start the login process.

### auth.loggingOut

It will be `true`, once we start the logout process.

### auth.error

Store the error object, if something goes wrong.

### auth.login(email)

You can start the login process by passing a valid email.

### auth.logout()

You can start the logout process.

### auth.fetch

An instance of `fetch`, which automatically includes the Magic Link token. You can use this to call any API which uses `@magic-sdk/admin` NPM module to authenticate the request.

[Read this guide for more information](https://arunoda.me/blog/simple-auth-setup-for-your-react-app)

### auth.magic

The underline Magic Link API client. Read Magic Link [documentation](https://docs.magic.link/) on how to use it.