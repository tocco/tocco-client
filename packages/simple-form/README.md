# Simple Form
Form with sync validation that returns all values. Used for client form-questions.

## Embedding

React-registry name: `simple-form`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `form`                 | x         | Full form definition
| `model`                | x         | Model of the fields that are present in the form
| `noButtons`            |           | Whether submit and cancel buttons should be shown and the form is controlled from outside (Default: false)
| `submitText`           |           | Text on submit button
| `cancelText`           |           | Text on cancel button
| `formData`             |           | Provides the option to set relation-entities formData in advance
| `listApp`              |           | List app (tocco-entity-list) must be provided to support
| `listApp`              |           | List app (tocco-entity-list) must be provided to support
| `mappingType`          |           | Will be passed to field factory. Default is "editable". But can be set to use "search" mapping.


### Events

| Name            | Payload attributes                                                | Description
|-----------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubmit`      | `values` (Validated form values)                                  | Is fired when form is submitted and snycvalidation is valid
| `onCancel`      | `values` (Unvalidated form values)                                | Is fired when "cancel" button is clicked
| `onChange`      | `values` form values `valid` true if all fields have valid inputs | Fired on any value change
