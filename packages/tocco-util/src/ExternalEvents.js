let events = {}

function registerEvents(externalEvents) {
  events = {...events, ...externalEvents}
}

function invokeExternalEvent(eventName, ...args) {
  if (__DEV__) {
    console.log('would call external event', eventName)
    return
  }

  if (events[eventName]) {
    events[eventName](...args)
  }
}

function getEvents() {
  return Object.keys(events)
}

const obj = {
  invokeExternalEvent,
  registerEvents,
  getEvents
}

export default obj
