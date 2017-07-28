# Tocco-Util
This package contains helpers, utils and other useful stuff that might be used in numerous packages.

#### actionEmitter
With actionEmitter it is possible to dispatch actions in the store of a parent app.
For example logging-actions or errors that can't be handled by a package itself.

#### appFactory
Helper methods to create a react/redux/saga app and modify it during runtime e.g. injecting reducers.

#### consoleLogger
Abstraction of the console.log and .error with eslint ignore and undefined checks.

#### externalEvents
Can be added to the store to call external events/callback from anywhere with an action.

#### form
Utils for redux forms (`redux-form`).

#### formField
Helper to create tocco-ui FormField component.

#### intl
Retrieves text resources through tocco REST service regarding the principals locale.

#### mockData
Contains a Factory to create mock data and helps to mock basic REST calls for those entities.

#### notifier
Allows to dispatch actions to show a info box or confirm dialog. Just needs to be added to the store and then one of
the exported actions can be dispatched anywhere. When added to store, it can be configured if those actions are
handled or if they get emitted.

#### reducers
Helpers for reducers. As of now only containing singleTransferReducer to set a single attribute in state.

#### rest
TOCCO REST Api abstraction. Helps compose url, set headers, order params with proper error handling.

#### route 
Helper to load a route async.

#### storeStorage
Simple singleton to get and set a store by id.

#### utilFetchMock
Generic fetchMocks e.g. log, session, text-resources.
