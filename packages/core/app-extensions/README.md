# App-Extensions

App extensions and helpers that can be used in any app. App extensions can connect to the store, dispatch actions and
run sagas. They also use tocco-ui for the visual parts.

## actionEmitter

With actionEmitter it is possible to dispatch actions in the store of a parent app.
For example logging-actions or errors that can't be handled by a package itself.

Import:

```javascript
import { actionEmitter } from "tocco-app-extensions";
```

Initialization:

```javascript
actionEmitter.addToStore(store, state => state.input.emitAction);
```

the second (optional) parameter is a selector function which returns an action which is dispatched to interact with the parent app.

## actions

Can render action buttons and runs action executions.

Import:

```javascript
import { actions } from "tocco-app-extensions";
```

Initialization:

```javascript
actions.addToStore(store, state => ({ formApp, listApp, customActions }));
```

config, the second parameter, is a selector function which returns an object that can have the following properties:

- formApp: Simple form App, is needed to render simple Action settings.
- listApp: Entity-List App, is needed to render remote fields in action settings.
- customActions: An object with App specific custom actions. The key is the id of the custom action as defined
  in the form.
- context: Map of parameters which will be passed to the called action.
- navigationStrategy: Object consisting of various link factories. For more information see
  tocco-util/navigationStrategy documentation.
- appComponent: Component to render custom apps (E.g. rendering delete app for deleting a search filter)
- customPreparationHandlers: An array of saga functions which will get invoked before an action is executed

Render an action:

```javascript
<actions.Action definition={actionDefinition} selection={selection} />
```

### Custom Preparation Handler

The handler receives an object as parameter:

| Name | Type | Description |
|---|---|---|
| preparationResponse | object | response from call to `defintion.endpoint` or empty object |
| params| object | Collected `params` from previous handlers |
| definition| object | Action definition object |
| selection| object | Selection object |
| config| object | Action saga config object from app |


A handler needs to return an object with the following keys:
| Name | Mandatory | Type | Description |
|---|---|---|---|
| abort | x | bool | If false action will not be executed and any following handlers will not get invoked |
| abortMessage |  | string | If abortMessage is returned an error toaster with given message will be shown |
| params |  | object | Additional params that the action will receive |

## appFactory

Helper methods to create a react/redux/saga app.

## cache

If the app is initialized it is once checked if the revision id on server has changed and the cache should be cleared.

Import:

```javascript
import { cache } from "tocco-app-extensions";
```

Initialization:

```javascript
cache.addToStore(store);
```

## display

Helper functions for handling display expression logic.

## errorLogging

An abstraction to handle errors with multiple handlers such as remote logging.

When using the `ErrorBoundary` the `errorLogging` should be added to the store.

See the corresponding [story](src/errorLogging/errorLogging.stories.mdx) for more details.

## externalEvents

Can be added to the store to call external events/callback from anywhere with an action.

```javascript
import { externalEvents } from "tocco-app-extensions";
```

Initialization:

```javascript
externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input));
```

See the corresponding [README](src/externalEvents/README.md) for more details.

## field

Helper to create a data field. Depending on the mapping a type as editable or readonly value.

## form

Utils for redux forms (`redux-form`).

## formData

Helps connect fields with logic and data such as relation entities from remote and select fields.

Import:

```javascript
import { formData } from "tocco-app-extensions";
```

Initialization:

```javascript
formData.addToStore(store, state => ({ listApp, navigationStrategy }));
```

config, the second parameter, is a selector function which returns an object an can have the following properties:

- listApp: Entity-List App component. Is used to connect the remote field with a list search.
- detailApp: Entity-detail App component. Is used for the remote create.
- navigationStrategy: See tocco-util > navigationStrategy for more information
- data: Option to set related entities
- chooseDocument: Used to pass the choose document component

## formField

Helper to create tocco-ui FormField component with a label and a field.

## keyDown

Exports a <keyDown.KeyDownWatcher> component that can wrap an application. The component registers a key down event
and a global key down event on document.

A list of shortcuts can be registered containing a list of actions that will be triggered if the key is pressed and
the modifiers match.

Import:

```javascript
import { keyDown } from "tocco-app-extensions";
```

Initialization:

```javascript
keyDown.addToStore(store, {
  ctrl: true,
  alt: true,
  code: "KeyM",
  actions: [
    toggleShortcutMenu("modules"),
  ],
  global: true,
});
```

## login

Helps to handle the login (e.g. check if user is logged in, user is allowed to see admin)

Import:

```javascript
import { login } from "tocco-app-extensions";
```

Initialization:

```javascript
login.addToStore(store);
```

## notification

Allows to dispatch actions to show a toaster or confirm dialog. Just needs to be added to the store and then one of
the exported actions can be dispatched anywhere. When added to store, it can be configured if those actions are
handled or if they get emitted.

See the corresponding [story](src/notification/notification.stories.mdx) and [readme](src/notification/README.md) for
more details.

## remote events

Remote event action are primarily dispatched by actions after execution.
This util provides the action creator and action definition.

## reports

Helper module to load reports.

## rest

REST Api abstraction and helpers

- helps compose url, set headers, order params with proper error handling
- caching logic for entity form models and display expressions
- error handling
- data transformation


## selection

Helpers and proptypes for list selection.

## templateValues

Can be used to display a select box of templates, that overwrite values in a form or through custom handlers on
selecting one of them.
