var events = {}

export function registerEvents(externalEvents) {
  events = {...externalEvents, ...events}
}

export default function invokeExternalEvent(eventName) {
  if (__DEV__) {
    console.log('would call external event', eventName)
    return
  }

  if (events[eventName]) {
    events[eventName]()
  }
}
