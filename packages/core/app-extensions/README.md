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
actionEmitter.addToStore(store, events.emitAction);
```

the second (optional) parameter is an action which is dispatched to interact with the parent app.

## actions

Can render action buttons and runs action executions.

Import:

```javascript
import { actions } from "tocco-app-extensions";
```

Initialization:

```javascript
actions.addToStore(store, { formApp, listApp, customActions });
```

config, the second parameter, is an object that can have the following properties:

- formApp: Simple form App, is needed to render simple Action settings.
- listApp: Entity-List App, is needed to render remote fields in action settings.
- customActions: An object with App specific custom actions. The key is the id of the custom action as defined
  in the form.
- context: Map of parameters which will be passed to the called action.
- navigationStrategy: Object consisting of various link factories. For more information see
  tocco-util/navigationStrategy documentation.
- appComponent: Component to render custom apps (E.g. rendering delete app for deleting a search filter)

Render an action:

```javascript
<actions.Action definition={actionDefinition} selection={selection} />
```

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
externalEvents.addToStore(store, events);
```

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
formData.addToStore(store, { listApp, navigationStrategy });
```

config, the second parameter, is an object an can have the following properties:

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

## rest

TOCCO REST Api abstraction. Helps compose url, set headers, order params with proper error handling.

## selection

Helpers and proptypes for list selection.

# templateValues

Can be used to display a select box of templates, that overwrite values in a form or through custom handlers on
selecting one of them.
