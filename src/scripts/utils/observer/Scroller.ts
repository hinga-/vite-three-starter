import { on } from '@/utils/event'
import { Listener } from './Listener'

export class Scroller {
  private listeners: Listener[]

  constructor() {
    this.listeners = []
    on(window, 'scroll', this.onWindowScroll.bind(this))
  }

  private onWindowScroll(): void {
    const { pageYOffset, pageXOffset } = window
    this.listeners.forEach((fn) => fn(pageYOffset, pageXOffset))
  }

  public add(fn: Listener): void {
    this.listeners.push(fn)
  }

  public remove(fn: Listener): void {
    this.listeners.forEach((listener, i) => {
      if (fn === listener) {
        this.listeners.splice(i, 1)
      }
    })
  }
}
