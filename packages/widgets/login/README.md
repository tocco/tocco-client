# Login
App to authenticate with nice2 services and request or update passwords.

## Development

### Users
The following users can be entered to simulate different scenarios

| Login          	  | Effect                                 	|
|----------------	  |----------------------------------------	|
| `succ`           	| Successful login                       	|
| `fail`           	| Authentication failure                 	|
| `two`            	| TwoWay Login simulation                	|
| `reset`          	| Password update enforced               	|
| `before_blocked` 	| Last attempt before login gets blocked 	|
| `blocked`        	| Login is blocked                       	|
| `error`          	| Server error (status 500)              	|


## Embedding

React-registry name: `login`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `showTitle`            |           | Display a title above the dialog.
| `locale`               |           | ISO Language Code
| `passwordRequest`      |           | Boolean to open login app in reset mode. 
| `username`             |           | Open login app with pre-filled username.
| `backendUrl`           |           | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `redirectUrl`          |           | A URL that the user gets redirected to after they're logged in. If empty, the `loginSuccess` event will probably need to be used.

### Methods

| Name                   | Params         | Description
|------------------------|----------------|-------------
| `setLocale`            | locale (string)| Change locale on the fly



### Events

| Name                   | Description
|------------------------|------------
| `loginSuccess`         | This event is fired after successful login attempt
| `resize`               | This event is fired whenever the app size has changed



# Password-Update
Password-update can be embedded independently and works without login dialog.

## Development
To run password-update dialog separately, uncomment line 91 in main.js

### Passwords
The following passwords can be entered to simulate different scenarios

| Password       	                | Effect                                 	|
|---------------------------------|----------------------------------------	|
| old password equals `wrong`     | Invalid credentials error              	|
| old password equals `error`     | 500 error on change               	    |
| new password containing `tocco` | Validation error should not contain word|
| new password containing `error`	| 500 error on serverside validation    	|


## Embedding

React-registry name: `password-update`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `username`             |           | The primary key of the principal (as string) or the username. If not set the logged in user is used
| `showOldPasswordField` |           | By default, there is no input field for the old password. Set this property to `true` to render the input field. |
| `oldPassword`          |           | Unless the user which submits the dialog is login manager, you must either provide the old password of the user with this property or enable the old-password input (see `showOldPasswordField`) so that the user is able to enter his current password
| `showTitle`            |           | Display a title above the dialog.
| `backendUrl`           |           | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.

### Events

| Name                   | Description
|------------------------|------------
| `success`              | This event is fired after password has been updated successfully
| `resize`               | This event is fired whenever the app size has changed

