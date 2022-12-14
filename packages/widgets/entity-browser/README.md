# Entity Browser
List/detail view of any entity with configurable search-form.

## Embedding

React-registry name: `entity-browser`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `entityName`           |x          | Entityname of records
| `searchFormType`       |           | Possible values: none (no search form shown), fulltext (only one fulltext search field), simple (simple search only), simple_advanced (usual (simple) search form with advanced expansion), advanced (extended advanced search form only) (default is 'simple_advanced')
| `formBase`             |           | formBase_list and formBase_search will be the used forms.
| `limit`                |           | Maximum records per page
| `preselectedSearchFields`|         | Array of the search fields with preselected values.
| `searchFilters`        |           | Array of search-filter ids.
| `simpleSearchFields`   |           | Comma separated String of searchfields which should be displayed by default.
| `initialKey`           |           | If set, the entity browser will start on the detail page of the entity with the specified key instead of showing a list.
| `businessUnit`         |           | The unique id of a business unit. If present, all REST request will use this in their business unit header (X-Business-Unit). Set input parameter to `__n-u-l-l__` if the null business unit should be used
| `memoryHistory`        |           | If set to true in-memory history is used instead of hash history. This is useful in testing and non-DOM environments.
| `backendUrl`           |           | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `scrollBehaviour`      |           | "none": Does not handle scroll internally and will take as much space as needed. The container / page needs to handle the scroll. "inline": Does handle scroll internally and takes the space given by the container. Containers needs to have a predefined height (Default: `none`)
| `modifyFormDefinition` |           | Function to modify form definition
| `disableDetailView`    |           | If true, navigation to the detail view is disabled
| `reportIds`            |           | Array of report ids to display in forms

### Events

| Name            | Payload attributes | Description
|-----------------|--------------------|-------------
| `onStateChange` | `states` (array of active states) | fired whenever a state change happened (e.g. ['list'] => ['detail'])
