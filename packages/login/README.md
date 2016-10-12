# Login

Password-update runs independently.

##Login-Form
...


## Password-Update

### Input parameters

| Name                   | Mandatory | Description
|------------------------|-----------|-------------
| `principalPk`          | x         | The primary key of the principal (as string)
| `showOldPasswordField` |           | By default, there is no input field for the old password. Set this property to `true` to render the input field. |
| `oldPassword`          |           | Unless the user which submits the dialog is login manager, you must either provide the old password of the user with this property or enable the old-password input (see `showOldPasswordField`) so that the user is able to enter his current password

### Events

| Name                   | Description
|------------------------|------------
| `initialized`          | This event is fired once the dialog is fully initialized (validation rules have been loaded and rendered)
| `success`              | This event is fired after password has been updated successfully
