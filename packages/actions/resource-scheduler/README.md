# Resource Scheduler
App containing a search panel to add calendars to a resource/scheduler calendar.

##Embedding

React-registry name: `resource-scheduler`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `locale`               |           | ISO Language Code

### Events

| Name                | Payload                                                     | Description
|---------------------|-------------------------------------------------------------|-------------
| `onEventClick`      | `id`: id of source entity, `model`: name of the entity      | Fired when an event in the calendar gets clicked
