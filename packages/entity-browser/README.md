# Entity Browser
List/detail view of any entity with configurable search-form.

## Embedding

React-registry name: `entity-browser`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `entityName`           |x          | Entityname of records
| `showSearchForm`       |x          | If false, the search form won't be displayed.
| `disableSimpleSearch`  |           | If true, all search fields will always be displayed no matter what `simpleSearchFields` looks like.
| `formBase`             |           | formBase_list and formBase_search will be the used forms.
| `limit`                |           | Maximum records per page
| `preselectedSearchFields`|         | Array of the search fields with preselected values.
| `searchFilters`        |           | Array of search-filter ids.
| `simpleSearchFields`   |           | Comma separated String of searchfields which should be displayed by default.
| `initialKey`           |           | If set, the entity browser will start on the detail page of the entity with the specified key instead of showing a list.
| `nullBusinessUnit`     |           | If true, all REST-request have the null business unit header (X-Business-Unit: __n-u-l-l__)
| `showCreateButton`     |           | (Temporary) Flag to show/hide a create button in list view
| `memoryHistory`        |           | If set to true in-memory history is used instead of hash history. This is useful in testing and non-DOM environments.

### Events

none so far
