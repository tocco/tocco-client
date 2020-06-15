# Entity List
List view with configurable search form.

## Embedding

React-registry name: `entity-list`

### Inputs

| Name                            | Mandatory   | Description                                                                                                                                                                                               | Type     | Default-Value              |
|-------------------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------- | ---------------------------|
| `entityName`                    | *           | Name of the entity that should be listed                                                                                                                                                                  | String   |                            |
| `formName`                      | *           | `formName`/list and `formName`/search will be the used forms. Will only be used for the search form and not for the list, if `listFormDefinition` is set.                                                 | String   |                            |
| `listFormDefinition`            |             | List from definition. This input will omit a list-form fetch request.                                                                                                                                     | String   |                            |
| `limit`                         |             | Amount of records per page                                                                                                                                                                                | Number   | 10                         |
| `searchFormPosition`            |             | Determines wheter the search form is show on top or left of the list. Possible values are "top" and "left                                                                                                 | String   | 'top'                      |
| `searchFormType`                |             | Possible values: none (no search form shown), simple (only one fulltext search field), basic (usual search form with advanced expansion), admin (full search with search filter)                          | String   | 'basic'                    |
| `showActions`                   |             | By default, all action of the form definitions are displayed. Change to false to hide them.                                                                                                               | Bool     | false                      |
| `searchFilters`                 |             | Will be applied to fetch request parameter _filter                                                                                                                                                        | Array    |                            |
| `preselectedSearchFields`       |             | List of predefined search-values                                                                                                                                                                          | Array    |                            |
| `disableSimpleSearch`           |             | If true, the full search form is always visible                                                                                                                                                           | Bool     | false                      |
| `simpleSearchFields`            |             | List of fields, that should be shown with activated simple search. If empty, fulltext search field will be displayed in simple search. Comma-separated string.                                            | String   | txtFulltext                |
| `selectionStyle`                |             | none", "multi" or "single". If not defined and form model selectable is true, "multi" is used. Otherwise no selection is possible.                                                                        | String   |                            |
| `disableSelectionController`    |             | If true, the selection controller components are not visible (selection controller components include the button to display all selected records and the component to switch to the "select-all" mode).   | Bool     | false                      |
| `selection`                     |             | Array of keys. The whole selection can be preset with this property.                                                                                                                                      | Array    |                            |
| `selectOnRowClick`              |             | If true, a click on the row (outside the checkbox) toggles the selection of that particular row.                                                                                                          | Bool     |                            |
| `store`                         |             | The store to use for the app. If not set, a new store is created and emitted via the `onStoreCreate` event.                                                                                               | Bool     |                            |
| `parent`                        |             | Object with key and reverseRelationName of a parent entity. If set, the result gets filtered to only show related entities.                                                                               | Object   |                            |
| `linkFactory`                   |             | Object consisting of various link factories. For more information see formData documentation.                                                                                                             | Object   |                            |
| `showLink`                      |             | If true a link is shown in each row to open the record. A detail Link factory needs to be provided.                                                                                                       | Bool     | false                      |
| `actionAppComponent`            |             | Component to render custom actions. Needs the appId and selection object property.                                                                                                                        | React Component |                     |


### Events

| Name                | Payload                       | Description
|---------------------|-------------------------------|-------------
| `onRowClick`        | `id` (The id of the record)   | This event is fired when a list row is clicked
| `onNavigateToCreate`| `relationName` (Optional. If defined, a related create button was clicked. From a subgrid for example.) | This event is fired when the "new" button is clicked
| `onNavigateToAction`| `definition` (action definition), `selection`(selection object) | Is called when an action is called with the fullscreen flag.
| `onSelectChange`    | An array containing the ids of the new selection | This event is fired when the selection changes
| `onStoreCreate`     | The created store | This event is fired when the store for the app is created. Note that the event will neved be fired if a store is passed to the app via the `store` input property.
