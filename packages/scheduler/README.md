# Scheduler
Scheduler view of a calendar. Based on fullcalendar.io/scheduler/

##Embedding

React-registry name: `scheduler`

### Input parameters

| Name                   | Mandatory | Description
|------------------------|:---------:|-------------
| `locale`               |           | ISO Language Code
| `calendars`            |           | List of calendars to show in scheduler view.

### Events

| Name                | Payload                                                     | Description
|---------------------|-------------------------------------------------------------|-------------
| `onDateRangeChange` | `dateRange` containing new startDate and endDate            | This event is fired when the visible date range changes. e.g. switch from day to week view.
| `onCalendarRemove`  | `id`: id of source entity, `calendarType`: type of calendar | Gets fired when a user manually removed a calendar from the view by pressing "x" button
