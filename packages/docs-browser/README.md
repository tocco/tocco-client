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
| `businessUnit`         |           | The business unit to display data from
| `listLimit`            |           | Amount of records per page in list
| `getlistFormName`      |           | If set form name is determined by this function which has (parent, keys) as input parameters
| `documentDetailFormName`|          | Name of the document detail form to use (default: "DmsResource")
| `domainDetailFormName` |           | Name of the domain detail form to use (default: "DmsDomain")
| `folderDetailFormName` |           | Name of the folder detail form to use (default: "DmsFolder")
| `searchFormType`       |           | Possible values: none (no search form shown), simple (only one fulltext search field), basic (usual search form with advanced expansion), admin (full search with search filter)
| `selectionStyle`       |           | none", "multi" or "single". If not defined and form model selectable is true, "multi" is used. Otherwise no selection is possible.
| `memoryHistory`        |           | If set to true in-memory history. This is useful in testing and non-DOM environments.
| `getCustomLocation`    |           | Pass a function to define a custom navigation for a row click event
| `initialLocation`      |           | If set, the docs browser will initially navigate to this location.
| `disableViewPersistor` |           | Per default the docs view is persisted with the view persistor. This property allows to disable using the view persistor
| `embedded`             |           | If true, the styling is more subtle (E.g. no background color for in the breadcrumbs). Default is false.
| `showActions`          |           | Attribute will be passed along to entity-list.
| `sortable`             |           | Attribute will be passed along to entity-list.
| `noLeftPadding`        |           | If false, a left padding will be applied to the Breadcrumbs. Per default false.
| `searchFormCollapsed`  |           | If true, the admin search form is collapsed and thus not visible by default                                                                                                                               | Boolean
| `backendUrl`           |           | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `scrollBehaviour`      |           | "none": Does not handle scroll internally and will take as much space as needed. The container / page needs to handle the scroll. "inline": Does handle scroll internally and takes the space given by the container. Containers needs to have a predefined height (Default: `inline`)

### Events

| Name                | Payload                       | Description
|---------------------|-------------------------------|-------------
| `onListParentChange`| null (= root) or  {model: 'User', key: '1'} | This event is fired when the parent of the list is changed
| `onSearchFormCollapsedChange` | `collapsed` boolean. Whether it was opened or closed  | Is fired when the user click in the arrow in the admin search form to collapse the search form.
| `onSelectChange`    | An array containing the ids of the new selection | This event is fired when the selection changes
