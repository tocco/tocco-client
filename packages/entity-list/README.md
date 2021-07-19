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
| `tql`                           |             | A TQL condition to add to the search query additionally                                                                                                                                                   | String   |                            |
| `keys`                          |             | Keys param to add to the search query additionally (array of key strings)                                                                                                                                                   | String   |                            |
| `disableSimpleSearch`           |             | If true, the full search form is always visible                                                                                                                                                           | Bool     | false                      |
| `simpleSearchFields`            |             | List of fields, that should be shown with activated simple search. If empty, fulltext search field will be displayed in simple search. Comma-separated string.                                            | String   | txtFulltext                |
| `selectionStyle`                |             | none", "multi", "multi_explicit" or "single". If not defined and form model selectable is true, "multi" is used. Otherwise no selection is possible. 'multi_explicit' means no query selection allowed.   | String   |                            |
| `disableSelectionController`    |             | If true, the selection controller components are not visible (selection controller components include the button to display all selected records and the component to switch to the "select-all" mode).   | Bool     | false                      |
| `selection`                     |             | Array of keys. The whole selection can be preset with this property.                                                                                                                                      | Array    |                            |
| `selectOnRowClick`              |             | If true, a click on the row (outside the checkbox) toggles the selection of that particular row.                                                                                                          | Bool     |                            |
| `store`                         |             | The store to use for the app. If not set, a new store is created and emitted via the `onStoreCreate` event.                                                                                               | Bool     |                            |
| `parent`                        |             | Object with key and reverseRelationName of a parent entity. If set, the result gets filtered to only show related entities.                                                                               | Object   |                            |                                                                                                    | Object   |                            |
| `showLink`                      |             | If true a link is shown in each row to open the record. A detail Link factory needs to be provided.                                                                                                       | Bool     | false                      |
| `sortable`                      |             | If set to false the table is not sortable                                                                                                       | Bool     | true                      |
| `actionAppComponent`            |             | Component to render custom actions. Needs the appId and selection object property.                                                                                                                        | React Component |                     |
| `cellRenderers`                 |             | Map of custom cell renderers which might be specified in list form definition (`client-renderer` attribute)                                                                                                                       | React Component |                     |
| `navigationStrategy`            |             | Object consisting of various link factories. For more information see tocco-util/navigationStrategy documentation.
| `customActions`                 |             | Map of custom action handlers. Note that this prop should only be used if you have an action without a component (i.e. an action that only puts a redux action to trigger a saga). If rendering of a component is involved (like it is in most cases), you should use `actionAppComponent`. | Object
| `contextParams`                 |             | Map of parameters that will be added to the context which will be passed on to the called actions.                                                                                                        | Object
| `searchFormCollapsed`           |             | If true, the admin search form is collapsed and thus not visible by default                                                                                                                               | Boolean

### Events

| Name                | Payload                       | Description
|---------------------|-------------------------------|-------------
| `onRowClick`        | `id` (The id of the record)   | This event is fired when a list row is clicked
| `onSelectChange`    | An array containing the ids of the new selection | This event is fired when the selection changes
| `onStoreCreate`     | The created store | This event is fired when the store for the app is created. Note that the event will neved be fired if a store is passed to the app via the `store` input property.
| `onSearchChange`    | The search params | This event is fired when the search is changed
| `onSearchFormCollapsedChange` | `collapsed` boolean. Whether it was opened or closed  | Is fired when the user click in the arrow in the admin search form to collapse the search form.
