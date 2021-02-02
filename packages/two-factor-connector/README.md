# Two Factor Connector
App to active two-factor authentication and display totp qr-code.

## Development

With a mocked environment the code '666 6666' will trigger an error.

## Embedding

React-registry name: `two-factor-connector`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `onSuccess`            |           | Callback if 2fa setup was successful.
| `username`             |           | Username to use, will be loaded from current principal if not available.
| `password`             |           | Password to use, only necessary if no active session is available, for example in login app when two-factor activation is forced.
| `secret`               |           | Secret to use for activation. If not set, a new secret is loaded from the server.
| `forced`               |           | Whether two factor authentication was forced on user, meaning they couldn't login. Will be used to display alternate info message and run activation without session.

