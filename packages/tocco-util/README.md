# Tocco-Util
This package contains helpers, utils and other useful stuff that might be used in numerous packages.

#### actionEmitter
With actionEmitter it is possible to dispatch actions in the store of a parent app.
For example logging-actions or errors that can't be handled by a package itself.

#### externalEvents
Can be added to the store to call external events/callback from anywhere with an action.

#### Int
Retrieves text resources though tocco REST service regarding the principals locale

### notifier
Allows to dispatch actions to show a info box or confirm dialog. Just needs to be added to the store and then one of
the exported actions can be dispatched anywhere. When added to store, it can be configured if those actions are
handled or if they get emitted.

#### StoreFactory
Creates a store taking inputstate, reducers and sagas as input. Also provides a function to hot replace reducers
