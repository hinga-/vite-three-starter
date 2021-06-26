import { Listener } from './Listener'

export class Recorder {
  private rafId: number | null
  private listeners: Listener[]
  private isAnimating: boolean

  constructor() {
    this.rafId = null
    this.listeners = []
    this.isAnimating = false
  }

  private loop(): void {
    this.rafId = requestAnimationFrame((timestamp) => {
      this.listeners.forEach((fn) => fn(timestamp))
      if (this.isAnimating) this.loop()
    })
  }

  public start(): void {
    this.isAnimating = true
    this.loop()
  }

  public stop(): void {
    this.isAnimating = false
    cancelAnimationFrame(this.rafId as number)
  }

  public add(fn: Listener): void {
    this.listeners.push(fn)

    if (this.listeners.length > 0 && !this.isAnimating) {
      this.start()
    }
  }

  public remove(fn: Listener): void {
    this.listeners.forEach((listener, i) => {
      if (fn === listener) {
        this.listeners.splice(i, 1)
      }
    })

    if (this.listeners.length <= 0) {
      this.stop()
    }
  }
}
