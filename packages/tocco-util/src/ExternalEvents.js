export default class ExternalEvents {
  constructor() {
    this.events = {}
  }

  registerEvents(externalEvents) {
    this.events = {...this.events, ...externalEvents}
  }

  invokeExternalEvent(eventName) {
    if (__DEV__) {
      console.log('would call external event', eventName)
      return
    }

    if (this.events[eventName]) {
      this.events[eventName]()
    }
  }
}
