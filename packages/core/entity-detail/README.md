# Entity Detail

## Embedding

React-registry name: `entity-detail`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `entityName`           | x         | Entity name of the record
| `entityId`             |           | The key/ID of the entity (`undefined` for `create` mode otherwise required)
| `formName`             | x         | Detail-form that should be loaded (without scope)
| `mode`                 | x         | Determines if the detail is in `create` or `update` mode
| `defaultValues`        |           | Array of object with attributes id, value. Only for Create mode. e.g. [{id: 'lastname', value: 'Simpson}, {id:'relGender', value: '1'}]
| `actionAppComponent`   |           | Component to render custom actions. Needs the appId and selection object property.
| `navigationStrategy`   |           | Object consisting of various link factories. For more information see tocco-util/navigationStrategy documentation.
| `modifyFormDefinition` |           | Function to modify form definition
| `customActions`        |           | Map of custom action handlers. Note that this prop should only be used if you have an action without a component (i.e. an action that only puts a redux action to trigger a saga). If rendering of a component is involved (like it is in most cases), you should use `actionAppComponent`.
| `customRenderedActions` |          | Map of custom action components. Note that this prop should only be used if you have an action without a component and without any pre-check conditions.
| `reportIds`            |           | Array of report ids to display in forms

### Events

| Name                        | Payload                                                                                                            | Description
|-----------------------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubGridRowClick`         | `id` (id of the clicked record), `gridName` (name of the sub grid), `relationName` (name of the sub grid relation) | Is fired when a row of a sub grid is clicked
| `onEntityCreated`           | `id` (of the newly created record)                                                                                 | Is fired when a a record got created
| `onEntityUpdated`           |                                                                                                                    | Is fired when a a record got sucessfully updated
| `onEntityDeleted`           |                                                                                                                    | Is fired when the loaded record got deleted
| `onRefresh`                 |                                                                                                                    | Is fired when the loaded record got deleted
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
