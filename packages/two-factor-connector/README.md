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
| `username`             |           | Username to use, will be loaded from principal if not available
| `password`             |           | Password to use, only necessary if forced
| `secret`               |           | Secret to use for activation
| `forced`               |           | Whether two factor authentication was forced on user, meaning they couldn't login

