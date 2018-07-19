# Entity List
List view with configurable search form.

## Embedding

React-registry name: `entity-list`

### Inputs

| Name                      | Mandatory | Description                                                                                                                                                    | Type   | Default-Value           |
|---------------------------|:---------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|-------------------------|
| `entityName`              |     *     | Name of the entity that should be listed                                                                                                                       | String |                         |
| `formBase`                |     *     | formBase_list and formBase_search will be the used forms.                                                                                                      | String |                         |
| `limit`                   |           | Amount of records per page                                                                                                                                     | Number | 10                      |
| `searchFilters`           |           | Will be applied to fetch request parameter _filter                                                                                                             | Array  |                         |
| `showSearchForm`          |           | Whether the search form should be shown or not                                                                                                                 | Bool   | false                   |
| `preselectedSearchFields` |           | List of predefined search-values                                                                                                                               | Array  |                         |
| `disableSimpleSearch`     |           | If true the full search form is always visible                                                                                                                 | Bool   | false                   |
| `simpleSearchFields`      |           | List of fields, that should be shown with activated simple search. If empty, fulltext search field will be displayed in simple search. Comma-separated string. | String | txtFulltext             |
| `showCreateButton`        |           | (Temporary) Flag to show/hide a create button
| `onSelectChange`          |           | Callback function which gets called on a row selection. The selection will be passed as argument.
| `selection`               |           | Array of keys. The whole selection can be preset with this property.
| `keepStore`               |           | If true the app preserves the store with given `id`. If the same list gets shown again, the store is recovered.
| `parent`                  |           | Object with key and reverseRelationName of a parent entity. If set, the result gets filtered to only show related entities. 

### Events

| Name                | Payload                       | Description
|---------------------|-------------------------------|-------------
| `onRowClick`        | `id` (The id of the record)   | This event is fired when a list row is clicked
| `navigateToCreate`  | -                             | This event is fired when the "new" button is clicked
