# Error Logging


## Usage
### Import
```javascript
import {errorLogging} from  'tocco-app-extensions'
```

### Setup
Add error logging to store:
```javascript
errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
```

The first parameter is the redux store. The store is needed to adding its reducers and add saga middleware.
The second parameter (accept) determines whether the app is handling the notifier action itself or just emits the
actions to the parent app. The latter also needs the `emmitAction` util added to the store.

Third parameters are the handlers that should be used:

Console: Logs the error to the console
Remote: Sends the error to the nice2 error logger endpoint (nice2/log)
Notifier: Displays error in UI. Notifier needs to be added to the store if handler is active.

### Log Error
```javascript
store.dispatch(errorLogging.logError('client.errorTitle', 'client.errorDescription', new Error('Some Error')))
```













