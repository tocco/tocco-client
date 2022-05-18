# Reservation Lecturer Booking View

Reservation lecturer booking view widget

## Embedding

React-registry name: `reservation-lecturer-booking-view`

### Input parameters

| Name | Mandatory | Description |
|------|:---------:|-------------|
| `reports` | x | List of report ids which should be added to the form
| `searchFormType` | x | Possible values: none (no search form shown), fulltext (only one fulltext search field), simple (simple search only), simple_advanced (usual (simple) search form with advanced expansion), advanced (extended advanced search form only) (default is 'simple_advanced')
| `appContext` | x | APP context for further meta information.
| `searchFilters` | | Array of search-filter ids.
| `backendUrl` | | Set backend url dynamic to point to nice2 installation. If not set it fallbacks to the build time environment __BACKEND_URL__.
| `businessUnit`| | The unique id of a business unit. If present, all REST request will use this in their business unit header (X-Business-Unit). Set input parameter to `__n-u-l-l__` if the null business unit should be used
| `limit` | | Maximum records per page
