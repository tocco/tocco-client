# App-Extensions
App extensions and helpers that can be used in any app. App extensions can connect to the store, dispatch actions and 
run sagas. They also use tocco-ui for the visual part. 

#### actionEmitter
With actionEmitter it is possible to dispatch actions in the store of a parent app.
For example logging-actions or errors that can't be handled by a package itself.

#### actions
Can render action buttons and runs action executions.


Import:

```javascript
 import {actions} from 'tocco-app-extensions'
```

Initialization: 

```javascript
 actions.addToStore(store, {formApp, listApp, customAction})
```

config, the second parameter, is an object an can have the following properties:
* formApp: Simple form App, is needed to render simple Action settings.
* listApp: Entity-List App, is needed to render remote fields in action settings.
* customAction: An object with App specific custom actions. The key is the id of the custom action as defined
  in the form.
  
#### appFactory
Helper methods to create a react/redux/saga app.

#### errorLogging
An abstraction to handle errors with multiple handlers such as remote logging.

#### externalEvents
Can be added to the store to call external events/callback from anywhere with an action.

#### form
Utils for redux forms (`redux-form`).

#### formData
Helps connect fields with logic and data such as relation entities from remote and select fields.

Import:

```javascript
 import {formData} from 'tocco-app-extensions'
```

Initialization: 

```javascript
 formData.addToStore(store, {listApp, linkFactory})
```

config, the second parameter, is an object an can have the following properties:
* listApp: Entity-List App component. Is used to connect the remote field with a list search.
* linkFactory: An object consisting of different types of link factories. Form components such as remote field can use 
  these factories to create a link around the values for navigation purposes.
   e.g. {detail: (entity, relation, key, children) => <a ../>}
  

#### formField
Helper to create tocco-ui FormField component.

#### notifier
Allows to dispatch actions to show a info box or confirm dialog. Just needs to be added to the store and then one of
the exported actions can be dispatched anywhere. When added to store, it can be configured if those actions are
handled or if they get emitted.

#### rest
TOCCO REST Api abstraction. Helps compose url, set headers, order params with proper error handling.

