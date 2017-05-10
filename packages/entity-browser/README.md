#Entity Browser
App to list entities in a grid.

Features:
- Sorting
- Fulltext search
- Paging
- Preload of next page

##Embedding

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


### Methods

none so far


### Events

none so far


##Development
###Mock Validation Tests

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
