export class FramesPerSecond {
  private framerate!: number
  private currentTime: number

  constructor(fps = 10) {
    this.change(fps)
    this.currentTime = performance.now()
  }
  
  get check(): boolean {
    const now: number = performance.now()
    const elapsed: number = now - this.currentTime
    if (elapsed > this.framerate) {
      this.currentTime = now - (elapsed % this.framerate)
      return true
    }
    return false
  }

  public change(fps: number): void {
    this.framerate = 1000 / fps
  }
}
