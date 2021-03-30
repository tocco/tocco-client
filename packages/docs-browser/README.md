# Docs Browser

Docs browser with tree structure (tree of domains, folders and resources)

## Embedding

React-registry name: `docs-browser`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `history`              |           | The history to use (if not provided, a hash history is created)
| `navigationStrategy`   |           | Object consisting of various link factories. For more information see tocco-util/navigationStrategy documentation.
| `domainTypes`          |           | Array of domain types to show
| `rootNodes`            |           | Array of root nodes to use instead of the domains (array of objects with `entityName` and `key`)
| `listLimit`            |           | Amount of records per page in list
| `listFormName`         |           | Set a form name for the list
| `documentDetailFormName`|          | Name of the document detail form to use (default: "DmsResource")
| `searchFormType`       |           | Possible values: none (no search form shown), simple (only one fulltext search field), basic (usual search form with advanced expansion), admin (full search with search filter)
| `selectionStyle`       |           | none", "multi" or "single". If not defined and form model selectable is true, "multi" is used. Otherwise no selection is possible.
| `memoryHistory`        |           | If set to true in-memory history. This is useful in testing and non-DOM environments.
| `getCustomLocation`    |           | Pass a function to define a custom navigation for a row click event
| `initialLocation`      |           | If set, the docs browser will initially navigate to this location.
| `disableViewPersistor` |           | Per default the docs view is persisted with the view persistor. This property allows to disable using the view persistor


### Events

| Name                | Payload                       | Description
|---------------------|-------------------------------|-------------
| `onListParentChange`| null (= root) or  {model: 'User', key: '1'} | This event is fired when the parent of the list is changed
