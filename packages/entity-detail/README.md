# Entity Detail

## Embedding

React-registry name: `entity-detail`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `entityName`           | x         | Entity name of the record
| `entityId`             | x         | The key/ID of the entity 
| `formName`             |           | Detail-form that should be loaded
| `mode`                 |           | Determines if the detail is in `create` or `update` mode
| `defaultValues`        |           | Array of object with attributes id, value. Only for Create mode. e.g. [{id: 'lastname', value: 'Simpson}, {id:'relGender', value: '1'}]
| `linkFactory`          |           | Object consisting of various link factories. For more information see formData documentation.

### Events

| Name                        | Payload                                                                                                            | Description
|-----------------------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubGridRowClick`         | `id` (id of the clicked record), `gridName` (name of the sub grid), `relationName` (name of the sub grid relation) | Is fired when a row of a sub grid is clicked
| `onNavigateToCreate`        | `relationName` (Optional. If not defined, create button of the current entity was clicked)                         | Is fired when a "create" button gets clicked
| `onEntityCreated`           | `id` (of the newly created record)                                                                                 | Is fired when a a record got created
| `onTouchedChange`           | `touched` (boolean flag which indicates if the form is touched)                                                    | This event is fired when the touched state changes

## Development
### Mock Validation Tests

| Field     	| Value      	| Validation Error                                       	|
|-----------	|------------	|--------------------------------------------------------	|
| Firstname 	| '' (empty) 	| Sync Validation: Mandatory                             	|
| Callname  	| '' (empty) 	| Sync Validation: Mandatory                             	|
| Firstname 	| length < 3 	| Sync Validation: Min length                            	|
| Firstname 	| 'illegal'  	| Async Validation: Not Allowed (+2 random messages)      |
| Firstname 	| 'illegal0'  | Async Validation: general random error                  |
| Firstname 	| 'illegal1' 	| Async Validation call exception                        	|
| Firstname 	| 'illegal2' 	| Submit Validation: Not allowed  (+ general error)      	|
| Firstname 	| 'illegal3' 	| Submit call exception                                  	|
| Firstname 	| 'yesNo' 	  | Prompts a yes or no client question                    	|
| Firstname 	| 'confirm' 	| Prompts a confirm client question                     	|
