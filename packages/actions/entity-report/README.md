# Entity Report

Action where first the report is selected and afterwards the normal report action is opened

## Embedding

React-registry name: `entity-report`

### Inputs

| Name               | Mandatory | Description                                                                                    |
|--------------------|-----------|------------------------------------------------------------------------------------------------|
| `selection`        | *         | Selection of entities                                                                          |
| `actionProperties` | *         | contains the property `pathToReports` which is required by the action to resolve the reports |

### Events

| Name        | Description                                    |
|-------------|------------------------------------------------|
| `onSuccess` | Is fired if a report was successfully selected |
| `onError`   | Is fired if there is no report to select       |
