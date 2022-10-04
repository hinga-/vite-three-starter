import { on } from '@/utils/event'

interface Listener {
  (width: number, height: number): void
}

export class Resizer {
  private static instance: Resizer
  private listeners: Listener[]

  private constructor() {
    this.listeners = []
    on(window, 'resize', this.onWindowResize.bind(this))
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Resizer()
    }
    return this.instance
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

  private onWindowResize(): void {
    const { innerWidth, innerHeight } = window
    this.listeners.forEach((fn) => fn(innerWidth, innerHeight))
  }
}
