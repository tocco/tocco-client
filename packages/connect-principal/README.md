# Connect Principal

Action that connect a sso login to a principal

## Embedding

React-registry name: `connect-principal`

### Inputs

| Name | Mandatory | Description                                                                        | Type | Default-Value |
| ---- | --------- |------------------------------------------------------------------------------------| ---- | ------------- |
| `selection` | * | Selection of `Principal`s (only type `ID` supported and requires exactely one key) | Object | |

### Events

| Name        | Description |
|-------------|-------------|
| `onSuccess` | Is fired if connection was successful |
| `onError`   | Is fired if connection was cancelled |
