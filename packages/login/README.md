# Login

Password-update can be embedded independently.

##Login-Form

Name: login

### Input parameters

| Name                   | Mandatory | Description
|------------------------|-----------|-------------
| `showTitle`            |           | Display a title above the dialog.
| `locale`               |           | ISO Language Code


### Methods

| Name                   | Params    | Description
|------------------------|-----------|-------------
| `setLocale`            | locale (string)          | Change locale on the fly



### Events

| Name                   | Description
|------------------------|------------
| `loginSuccess`         | This event is fired after successful login attempt



## Password-Update - Standanlone

Name: password-update

### Input parameters

| Name                   | Mandatory | Description
|------------------------|-----------|-------------
| `username`             | x         | The primary key of the principal (as string)
| `showOldPasswordField` |           | By default, there is no input field for the old password. Set this property to `true` to render the input field. |
| `oldPassword`          |           | Unless the user which submits the dialog is login manager, you must either provide the old password of the user with this property or enable the old-password input (see `showOldPasswordField`) so that the user is able to enter his current password
| `showTitle`            |           | Display a title above the dialog.

### Events

| Name                   | Description
|------------------------|------------
| `initialized`          | This event is fired once the dialog is fully initialized (validation rules have been loaded and rendered)
| `success`              | This event is fired after password has been updated successfully

