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
| `documentDetailFormName`|          | Name of the document detail form to use (default: "DmsResource") 

### Events

none so far
