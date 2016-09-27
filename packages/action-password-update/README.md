# Password-Update

## Input parameters 

| Name                   | Mandatory | Description
|------------------------|-----------|-------------
| `principalPk`          | x         | The primary key of the principal (as string)
| `showOldPasswordField` |           | By default, there is no input field for the old password. Set this property to `true` to render the input field. |
| `oldPassword`          |           | Unless the user which submits the dialog is login manager, you must either provide the old password of the user with this property or enable the old-password input (see `showOldPasswordField`) so that the user is able to enter his current password  
| `username`             |           | If the user which submits the dialog is not authenticated yet, you must provide the username of the user so that he can be authenticated in combination with the old password (which is provided by the `oldPassword` property or entered by the user (see `showOldPasswordField`))

## Events

| Name                   | Description
|------------------------|------------
| `success`              | This event is fired after password has been updated successfully
