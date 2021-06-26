export interface Listener {
  (...args: any[]): void
  (timestamp: number): void
  (innerWidth?: number, innerHeight?: number): void
  (pageYOffset?: number, pageXOffset?: number): void
}
