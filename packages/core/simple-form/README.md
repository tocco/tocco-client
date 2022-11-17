# Simple Form
Form with sync validation that returns all values. Used for client form-questions.

## Embedding

React-registry name: `simple-form`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `form`                 | x         | Full form definition
| `noButtons`            |           | Whether submit and cancel buttons should be shown and the form is controlled from outside (Default: false)
| `submitText`           |           | Text on submit button
| `cancelText`           |           | Text on cancel button
| `formData`             |           | Provides the option to set relation-entities formData in advance (To show dropdown options that are not entites for example)
| `listApp`              |           | List app (tocco-entity-list) must be provided to support remote fields
| `docsApp`              |           | Docs app (tocco-docs-browser) must be provided to support remote fields
| `validate`             |           | pass false if the form should not validate inputs, defaults to true
| `mappingType`          |           | Will be passed to field factory. Default is "editable". But can be set to use "search" mapping.
| `mode`                 |           | Will be passed to field factory. Per default no mode is set. Can be set to "search" that fields are no longer mandatory.
| `defaultValues`        |           | Object where the keys are representing the paths. e.g. {'lastname': 'Simpson', relGender: {key: '1', display: 'Male'}}. Overwrittes form default values
| `beforeRenderField`    |           | Function that gets call before each field render to determine if field should gets rendered


### Events

| Name            | Payload attributes                                                | Description
|-----------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubmit`      | `values` (Validated form values)                                  | Is fired when form is submitted and snycvalidation is valid
| `onCancel`      | `values` (Unvalidated form values)                                | Is fired when "cancel" button is clicked
| `onChange`      | `values` form values `valid` true if all fields have valid inputs | Fired on any value change
