import { WebGL } from '@/webgl'
import { FramesPerSecond } from '@/utils/animation/FramesPerSecond'
import { resizer, recorder } from '@/utils/observer/'
import Stats from 'stats.js'
import * as dat from 'dat.gui'
import { AxesHelper, GridHelper } from 'three'

interface GUIProps {
  speed: number
  fps: number
}

interface AppProps {
  debug?: boolean
}

const canvas = document.createElement('canvas')

export class App {
  private background: HTMLDivElement
  private props: AppProps
  private gui: GUIProps
  private fps: FramesPerSecond
  private stats!: Stats
  private webgl!: WebGL

  constructor({ debug = true }: AppProps = {}) {
    this.background = document.querySelector('#app') as HTMLDivElement

    this.props = {
      debug,
    }

    this.gui = {
      speed: 0.005,
      fps: 50,
    }

    this.fps = new FramesPerSecond(this.gui.fps)

    if (this.background) {
      this.webgl = new WebGL(canvas, { controls: true, alpha: true })
      this.background.appendChild(canvas)

      if (debug) {
        // stats
        this.createStats()
        // gui
        this.createGUI()

        this.createHelper()
      }

      this.onWindowResize()
      resizer.add(this.onWindowResize.bind(this))
      recorder.add(this.onTick.bind(this))
    }
  }

  private createStats(): void {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  private createGUI(): void {
    const gui = new dat.GUI()
    const commonGUI = gui.addFolder('Common')
    commonGUI.add(this.gui, 'speed', 0, 3.0)
    commonGUI.add(this.gui, 'fps', 1, 60).onChange((n) => this.fps.change(n))
    commonGUI.open()
  }

  private createHelper(): void {
    ;[new GridHelper(10, 10), new AxesHelper(5)].forEach((obj) =>
      this.webgl.add(obj)
    )
  }

  private onTick(): void {
    if (!this.fps.check) {
      return
    }

    if (this.props.debug) {
      this.stats.update()
    }

    this.webgl.update<GUIProps>(this.gui)
  }

  private onWindowResize(): void {
    const { offsetWidth, offsetHeight } = this.background
    this.webgl.resize(offsetWidth, offsetHeight)
  }
}
