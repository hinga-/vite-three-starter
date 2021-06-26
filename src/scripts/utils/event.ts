interface Listener {
  (
    element: EventTarget,
    eventType: string,
    fn: (e: Event, el?: HTMLElement) => void,
    options?: boolean | EventListenerOptions,
    selector?: string
  ): ((e: Event, target?: HTMLElement) => void) | void
}

export const on: Listener = (
  element,
  eventType,
  fn,
  options = false,
  selector
): ((e: Event, el?: HTMLElement) => void) | void => {
  const handler = (e: Event) => {
    let el = e.target as HTMLElement
    while (el && el !== element) {
      if (selector && el.matches && el.matches(selector)) {
        fn(e, el)
        break
      }
      el = el.parentNode as HTMLElement
    }
  }

  element.addEventListener(eventType, selector ? handler : fn, options)

  if (selector) return handler
}

export const off: Listener = (
  element,
  eventType,
  fn,
  options = false
): void => {
  element.removeEventListener(eventType, fn, options)
}
