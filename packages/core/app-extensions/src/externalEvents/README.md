# External Events

## Usage

### Import
```javascript
import {externalEvents} from 'tocco-app-extensions'
```

### Setup
The `externalEvent` sagas have to be added to the store:
```javascript
const EXTERNAL_EVENTS = ['onStateChange']
...
externalEvents.addToStore(store, state => ({events: appFactory.getEvents(EXTERNAL_EVENTS, state.input)}))
```
or 
```javascript
const EXTERNAL_EVENTS = ['onSuccess', 'onStateChange']
const EVENT_MAP = {
  onSuccess: payload => ({
    name: 'onStateChange',
    payload: {states: ['success']}
  })
}
...
externalEvents.addToStore(store, state => ({
  events: appFactory.getEvents(EXTERNAL_EVENTS),
  eventMap: EVENT_MAP
}))
```

The external event extension needs to have a `configSelector` which gets the actual `state` and has to return the config object.

#### Config Object
| Name | Mandatory | Description |
|------|:---------:|-------------|
| `events` | x | Object which holds all external events. These events will eventually be invoked.
| `eventMap` | | Object which holds mapped event configs

### Mapped Events

There are three mapped events configuration possible:
- as string with same payload
- as object with other payload
- as function with inherited payload

#### Examples

Fire `onCancel` whenever `onError` external event has been fired with the same `payload`:
```javascript
const EVENT_MAP = {
  onError: 'onCancel'
}
```

Fire `onStateChange` whenever `onSuccess` external event has been fired with a different static payload.
```javascript
const EVENT_MAP = {
  onSuccess: {
    name: 'onStateChange',
    payload: {states: ['success']}
  }
}
```

Fire `onCancel` whenever `onError` external event has been fired with a payload which is dependent on the payload of the `onError` event.
```javascript
const EVENT_MAP = {
  onError: payload => ({
    name: 'onCancel',
    payload: {...payload, message: 'cancelled'}
  })
}
```


### Fire Events

#### External Event
`externalEvents.fireExternalEvent(name, payload)`

- name: Name of the external event
- payload: any payload that will be passed to the invocation

Example
```javascript
externalEvents.fireExternalEvent('onSuccess', {message: 'Action successfully executed'})
```

#### Event: onStateChange
`externalEvents.fireStateChange(states)`

- states: Array of states (string)

Example
```javascript
externalEvents.fireStateChange(['success'])
```
