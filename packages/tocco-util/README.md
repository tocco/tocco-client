# Tocco-Util
This package contains helpers, utils and other useful stuff that might be used in numerous packages.

#### actionEmitter
With actionEmitter it is possible to dispatch actions in the store of a parent app.
For example logging-actions or errors that can't be handled by a package itself.

#### ExternalEvents
Stores events/callbacks that can be called by key
#### Int
Retrieves text resources though tocco REST service regarding the principals locale
#### StoreFactory
Creates a store taking inputstate, reducers and sagas as input. Also provides a function to hot replace reducers
