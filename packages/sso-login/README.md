# Sso Login
Displays a list of sso-provider (Openid_providers) login buttons. 
A button click opens a popup with configured url and provides a callback function on window scope to complete login.

## Embedding
Installation: `npm install tocco-sso-login`

React-registry name: `sso-login`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `ssoLoginEndpoint`     | x         | Relative path to sso login endpoint e.g. '/sso'
| `locale`               |           | ISO Language Code
| `autoLogin`            |           | The unique_id of a provider. If this parameter is set, the component automatically initialises the authentication for the given provider.


### Methods

| Name                   | Params         | Description
|------------------------|----------------|-------------
| `setLocale`            | locale (string)| Change locale on the fly


### Events

| Name                   | Payload           | Description
|------------------------|-------------------|-------------
| `loginCompleted`       | `result` (object) | This app provides a global function `ssoPopUpCallback` on the window.opener scope that accepts a result object as parameter. As soon as this callback is invoked, the popup closes and the loginCompleted event is fired with the result object. 
