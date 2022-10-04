import { trigger } from '@/utils/event'
import { Recorder, Resizer } from '@/utils/observer'
import { Canvas } from '@/webgl/Canvas'

export class App {
  private container: HTMLDivElement | null
  private canvas!: Canvas
  private recorder: Recorder
  private resizer: Resizer

  constructor() {
    this.container = document.querySelector('#app')
    this.recorder = Recorder.getInstance()
    this.resizer = Resizer.getInstance()

    if (this.container) {
      const canvas = document.createElement('canvas')
      this.container.appendChild(canvas)
      this.canvas = new Canvas(canvas)

      this.recorder.add(this.onRender.bind(this))
      this.resizer.add(this.onWindowResize.bind(this))
      trigger('resize', window)
    }
  }

  private onRender() {
    this.canvas.draw()
  }

  private onWindowResize(width: number, height: number) {
    const w = this.container ? this.container.offsetWidth : width
    const h = this.container ? this.container.offsetHeight : height
    this.canvas.resize(w, h)
  }
}
