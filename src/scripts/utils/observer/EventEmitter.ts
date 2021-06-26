import { Listener } from './Listener'

export class EventEmitter {
  private listeners: Map<string, Listener[]>
  public emit: EventEmitter['fire']
  public on: EventEmitter['addEventListener']
  public off: EventEmitter['removeEventListener']

  constructor() {
    this.listeners = new Map()
    // alias
    this.emit = this.fire
    this.on = this.addEventListener
    this.off = this.removeEventListener
  }

  public fire(eventName: string, ...data: any[]): void {
    if (!this.listeners.has(eventName)) {
      return
    }
    const listeners = this.listeners.get(eventName) as Listener[]
    listeners.forEach((listener) => listener(...data))
  }

  public addEventListener(eventName: string, fn: (event?: any) => void): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, [fn])
    } else {
      const listeners = this.listeners.get(eventName) as Listener[]
      listeners.push(fn)
    }
  }

  public removeEventListener(eventName: string, fn: (event?: any) => void): void {
    if (eventName === '*') {
      //
    } else if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName) as Listener[]
      listeners.forEach((listener, i) => {
        if (fn === listener) {
          listeners.splice(i, 1)
        }
      })

      if (listeners.length === 0) {
        this.listeners.delete(eventName)
      }
    }
  }
}
