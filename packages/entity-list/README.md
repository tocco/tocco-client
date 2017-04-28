# Entity List

## Embedding

React-registry name: `entity-list`

### Inputs

| Name                      | Mandatory | Description                                                                                                                           | Type   | Default-Value           |
|---------------------------|:---------:|---------------------------------------------------------------------------------------------------------------------------------------|--------|-------------------------|
| `entityName`              |     *     | Name of the entity that should be listed                                                                                              | String |                         |
| `listFormDefinition`      |     *     | Definition of the table-list containing columns                                                                                       | Object |                         |
| `limit`                   |           | Amount of records per page                                                                                                            | Number | 10                      |
| `searchFilters`           |           | Will be applied to fetch request parameter _filter                                                                                    | Array  |                         |
| `showSearchForm`          |           | Whether the search form should be shown or not                                                                                        | Bool   | false                   |
| `searchFormName`          |           | Is used to load the search form definition                                                                                            | String | ${entityName}_search    |
| `preselectedSearchValues` |           | List of predefined search-values                                                                                                      | Array  |                         |
| `disableSimpleSearch`     |           | If true the full search form is always visible                                                                                        | Bool   | false                   |
| `simpleSearchFields`      |           | List of fields, that should be shown with activated simple search. If empty, fulltext search field will be displayed in simple search | Array  | (fulltext-search-field) |


### Events

| Name          | Payload                       | Description
|---------------|-------------------------------|-------------
| `onRowClick`  | `id` (The id of the record)   | This event is fired when a list row is clicked
