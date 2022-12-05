# Notification


## Usage
### Import
```javascript
import {notification} from  'tocco-app-extensions'
```

### Setup
Firstly the Notifier util must be added to the store:
```javascript
notification.addToStore(store, accept)
```
or
```javascript
notification.addToStore(store, accept, {withNotificationCenter: true})
```

The first parameter is the redux store. The store is needed to adding its reducers and add saga middleware.
The second parameter (accept) determines whether the app is handling the Notifier action itself or just emits the
actions to the parent app. The latter also needs the `emitAction` util added to the store. Optionally the notification
center can be enabled.

Secondly the Notifier Components must be added to dom:

```javascript
 render() {
    return (
      <Provider store={store}>
        <div>
          <notification.Notifications/>
          <...>
        </div>
     </Provider>
     )
}
```

### Show notifications
Toaster action can be used to show notifications:

`notification.toaster({key, type, title, body, icon, onClose, duration, time})`

* key: Unique identifier for removing a toaster
* type: One of`['neutral', 'success', 'warning', 'error', 'info']`
* title: Either a string, a html formatted string, a text resource key or any component
* body: Either a string, a html formatted string, a text resource key or any component
* icon: To overwrite default icons determined by type
* onClose: Callback when toaster is closed. Parameter: Manually (Boolean) if it was closed by the user or by the duration
* duration: To overwrite default duration. Determines how long the toaster should be displayed in milliseconds. Per default toaster of the type error and warning must be manually closed else the duration is 5 seconds. If -1 the toaster will not disappear automatically.
* time: Time as when the toaster action was executed. Is used to sort all toasters. Default is the add time.

#### Examples
```javascript
store.dispatch(notification.toaster({type: 'info', title: 'client.title', body: 'client.message', icon: ['far', 'thumbs-up']}))
store.dispatch(notification.toaster({type: 'info', title: <Title>Custom</Title>, body: 'message line contains <b>html</b>'}))
store.dispatch(notification.toaster({type: 'success', title: 'client.title', body: 'client.message'}))
store.dispatch(notification.toaster({type: 'warning', title: 'client.title', body: longText}))
store.dispatch(notification.toaster({type: 'warning', title: 'client.title', duration: 5000}))
store.dispatch(notification.toaster({type: 'error', title: 'client.title'}))
```

### Show confirmation
```javascript
store.dispatch(notification.confirm(
  'Title',
  'message line contains <b>html</b>',
  'OK text',
  'Cancel text',
  () => console.log('Ok'),
  () => console.log('Cancel'),
  'cancel' // default action
 ))
```


### Show Yes/No Question
```javascript
store.dispatch(notification.yesNoQuestion(
      title,
      message,
      'Yes text',
      'No text',
      'Cancel text',
      () => console.log('Yes'),
      () => console.log('No'),
      () => console.log('Cancel')
    ))
```


### Show blocking Info
```javascript
store.dispatch(notification.blockingInfo(
  id,
  'Title',
  'Please wait'
 ))
```

### Show Modal Component
```javascript
store.dispatch(notification.modal(
  id,
  'Title',
  'Message',
  props => (
    <React.Fragment>
      <Typography.P>Custom component starts here</Typography.P>
        <Button
          label="Close"
          onClick={() => props.close()}
        />
    </React.Fragment>
  ),
  cancelable,
  () => {/* handle modal get cancelled (by escape key or x button) */}
))
```



