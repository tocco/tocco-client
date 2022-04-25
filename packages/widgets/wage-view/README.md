# Wage View

Wage view widget

## Embedding

React-registry name: `wage-view`

### Input parameters

| Name | Mandatory | Description |
|------|:---------:|-------------|
| `allowCreate` | x | Show create button if user has the permission
| `reports` | x | List of report ids which should be added to the form
| `appContext` | x | APP context for further meta information.
| `searchFilters` | | Array of search-filter ids.
| `backendUrl` | | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `businessUnit`| | The unique id of a business unit. If present, all REST request will use this in their business unit header (X-Business-Unit).
