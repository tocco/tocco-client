# Merge
This action allows a user to merge any entities.

##Embedding

React-registry name: `merge`

### Inputs

| Name                            | Mandatory   | Description            | Type     | Default-Value              |
|-------------------------------- | :---------: | -----------------------| -------- | ---------------------------|
| `selection`                     | *           | Selection of entities
| `onSuccess`                     |             | Callback if merge was successful
| `isOldClient`                   |             | Can be set to true to work with `openEntityList`. Temporary workaround.


### Events

| Name                   | Description
|------------------------|------------
| `openEntityList`       | Should be set if `isOldClient` is true. Passes an object with entity name and keys {model: 'User, keys:["1"]}
