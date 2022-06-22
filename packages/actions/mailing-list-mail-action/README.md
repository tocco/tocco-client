# Mailing List Mail Action

Action that shows a subscription link of the current lecturer

## Embedding

React-registry name: `mailing-list-mail-action`

### Inputs

| Name               | Mandatory | Description                                                       | Type   | Default-Value |
| ------------------ | :-------: | ----------------------------------------------------------------- | ------ | ------------- |
| `selection`        |     *     | selected entities                                                 | Object |
| `actionProperties` |     *     | form properties passed to action, widget and event key explicitly | Object |

### Events

| Name        | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `onSuccess` | Is fired if mail was sent                                          |
| `onError`   | Is fired if mail could not be sent, reason is displayed in toaster |

