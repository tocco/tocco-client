# Simple Form
Form with sync validation that returns all values. Used for client form-questions.

## Embedding

React-registry name: `simple-form`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `submitText`           |           | Text on submit button
| `cancelText`           |           | Text on cancel button
| `form`                 | x         | Full form definition 
| `model`                | x         | Model of the fields that are present in the form


### Events

| Name            | Payload                             | Description
|-----------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubmit`      | `values` (Validated Form Values)    | Is fired when form is submitted and snycvalidation is valid
| `onCancel`      | `values` (Unvalidated Form Values)  | Is fired when "cancel" button is clicked
