# Mailing List

Mailing list widget, lists events and their users. Uses custom endpoint to load users since they come from different relations.
Additionally, the types of users are built in the custom resource and do not directly match any entity.

## Embedding

React-registry name: `mailing_list`

### Input parameters

| Name | Mandatory | Description |
|------|:---------:|-------------|
| `appContext` | x | APP context for further meta information.
| `searchFilters` | | Array of search-filter ids.
| `backendUrl` | | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `businessUnit` | | The unique id of a business unit. If present, all REST request will use this in their business unit header (X-Business-Unit). Set input parameter to `__n-u-l-l__` if the null business unit should be used
| `limit` | | Maximum records per page