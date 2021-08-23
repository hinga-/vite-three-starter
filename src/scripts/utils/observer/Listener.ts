export interface Listener {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void
  (timestamp: number): void
  (innerWidth?: number, innerHeight?: number): void
  (pageYOffset?: number, pageXOffset?: number): void
}
