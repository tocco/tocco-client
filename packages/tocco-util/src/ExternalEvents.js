var events = {}

function registerEvents(externalEvents) {
  events = {...events, ...externalEvents}
}

function invokeExternalEvent(eventName) {
  if (__DEV__) {
    console.log('would call external event', eventName)
    return
  }

  if (events[eventName]) {
    events[eventName]()
  }
}

const obj = {
  invokeExternalEvent,
  registerEvents
}

export default obj
