# Entity Detail

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `entityName`           | x         | Entity name of the record
| `entityId`             | x         | The ID of the entity 
| `formBase`             |           | formBase_detail will be the used as form name.

### Events

| Name                | Payload                                                                                                            | Description
|---------------------|--------------------------------------------------------------------------------------------------------------------|-------------
| `onSubGridRowClick` | `id` (id of the clicked record), `gridName` (name of the sub grid), `relationName` (name of the sub grid relation) | This event is fired when a row of a sub grid is clicked
| `onTouchedChange`   | `touched` (boolean flag which indicates if the form is touched)                                                    | This event is fired when the touched state changes
