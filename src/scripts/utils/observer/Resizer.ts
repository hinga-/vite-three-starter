import { on } from '@/utils/event'
import { Listener } from './Listener'

export class Resizer {
  private listeners: Listener[]

  constructor() {
    this.listeners = []
    on(window, 'resize', this.onWindowResize.bind(this))
  }

  private onWindowResize(): void {
    const { innerWidth, innerHeight } = window
    this.listeners.forEach((fn) => fn(innerWidth, innerHeight))
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
