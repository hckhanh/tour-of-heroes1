export function createCustomEvent(eventName: string): CustomEvent {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, false, false, undefined)
  return event
}
