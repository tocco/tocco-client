# Notifier


## Usage
### Import
```javascript
import {notifier} from  'tocco-app-extensions'
```

### Setup
Firstly the Notifier util must be added to the store:
```javascript
notifier.addToStore(store, accept)
```

The first parameter is the redux store. The store is needed to adding its reducers and add saga middleware.
The second parameter (accept) determines whether the app is handling the Notifier action itself or just emits the
actions to the parent app. The latter also needs the `emmitAction` util added to the store.

Secondly the Notifier Components must be added to dom:

```javascript
 render() {
    return (
      <Provider store={store}>
        <div>
          <notifier.Notifier/>
          <...>
        </div>
     </Provider>
     )
}
```

### Show notifications
info action creator can be used to show notifications:

`notifier.info(type, title, message, icon, timeOut)`


#### Examples
```javascript
store.dispatch(notifier.info('info', 'client.title', 'client.message', ['far', 'thumbs-up'], 2000))
store.dispatch(notifier.info('info', <Title>Custom</Title>, 'message line contains <b>html</b>'))
store.dispatch(notifier.info('success', 'client.title', 'client.message', null, 2000))
store.dispatch(notifier.info('warning', 'client.title', longText))
store.dispatch(notifier.info('error', 'client.title', 'client.description')) 
```

### Show notifications
```javascript
store.dispatch(notifier.confirm(
  'Title',
  'message line contains <b>html</b>',
  'OK text',
  'Cancel text',
  () => console.log('Ok'),
  () => console.log('Cancel')
 ))
```


### Show Yes/No Question
```javascript
store.dispatch(notifier.yesNoQuestion(
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
store.dispatch(notifier.blockingInfo(
  id,
  'Title',
  'Please wait'
 ))
```

### Show Modal Component
```javascript
store.dispatch(notifier.modalComponent(
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
  closable
))
```



