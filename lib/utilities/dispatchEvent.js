const dispatchEvent = (element, type) => element.dispatchEvent(new Event(type, {
  bubbles: true,
  cancelable: true,
}))

export default dispatchEvent
