import Stats from 'stats.js'
import * as dat from 'dat.gui'
import { AxesHelper, GridHelper } from 'three'
import { WebGL } from '@/webgl/core/'
import { FramesPerSecond } from '@/utils/animation/FramesPerSecond'
import { resizer, recorder } from '@/utils/observer/'

interface GUIProps {
  speed: number
  fps: number
  controls: boolean
}

interface AppProps {
  debug?: boolean
  cameraZ?: number
}

const canvas = document.createElement('canvas')

export class App {
  private app: HTMLDivElement
  private info: HTMLParagraphElement
  private props: Required<AppProps>
  private gui: Required<GUIProps>
  private guiElement!: HTMLLIElement
  private fps: FramesPerSecond
  private stats!: Stats
  private webgl!: WebGL

  constructor({ debug = true }: AppProps = {}) {
    this.app = document.querySelector('#app') as HTMLDivElement
    this.info = document.querySelector('.info') as HTMLParagraphElement

    if (this.info) {
      this.info.innerHTML = ''
    }

    this.props = {
      debug,
      cameraZ: 14,
    }

    this.gui = {
      speed: 0.001,
      fps: 60,
      controls: true,
    }

    this.fps = new FramesPerSecond(this.gui.fps)

    if (this.app) {
      this.webgl = new WebGL(canvas, { controls: true, alpha: true })
      this.webgl.camera.position.z = this.props.cameraZ
      this.app.appendChild(canvas)

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
    commonGUI.add(this.gui, 'speed', 0, 0.02).step(0.001)
    commonGUI.add(this.gui, 'fps', 1, 60).onChange((n) => this.fps.change(n))
    commonGUI
      .add(this.gui, 'controls')
      .onChange((val) => (this.webgl.controls.enabled = val))

    commonGUI.open()

    // performance
    const perfFolder = gui.addFolder('Performance')
    this.guiElement = document.createElement('li')
    this.guiElement.classList.add('gui-stats')
    perfFolder.domElement.children[0].appendChild(this.guiElement)
    perfFolder.open()
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

      const { calls, lines, triangles, points } =
        this.webgl.renderer.info.render
      const { geometries } = this.webgl.renderer.info.memory
      this.guiElement.innerHTML = `
        <i>GPU draw calls</i>: ${calls}<br>
        <i>GPU lines</i>: ${lines}<br>
        <i>GPU triangles</i>: ${triangles}<br>
        <i>GPU points</i>: ${points}<br>
        <i>Memory geometries</i>: ${geometries}<br>
      `
    }

    // const time = performance.now() * this.gui.speed

    this.webgl.update()
  }

  private onWindowResize(): void {
    const { offsetWidth, offsetHeight } = this.app
    this.webgl.resize(offsetWidth, offsetHeight)
  }
}
