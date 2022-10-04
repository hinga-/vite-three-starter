import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Camera } from './Camera'
import { GuiControls } from './GuiControls'
import { Renderer } from './Renderer'
import { Scene } from './Scene'

import { FramesPerSecond } from '@/utils/FramesPerSecond'
import { Plane } from '@/webgl/objects/Plane'

interface GuiParams {
  speed: number
  fps: number
}

export class Canvas {
  private canvas: HTMLCanvasElement
  private sizes: { width: number; height: number }
  private params: GuiParams
  private gui!: GuiControls
  private fps: FramesPerSecond
  private stats!: Stats
  private controls!: OrbitControls
  private renderer!: Renderer
  private camera!: Camera
  private scene!: Scene
  private plane!: Plane

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.sizes = {
      width: 0,
      height: 0,
    }
    this.params = {
      speed: 0.005,
      fps: 60,
    }
    this.fps = new FramesPerSecond(this.params.fps)

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createPlane()

    this.createGui()
    this.createStats()
    this.createControls()
  }

  public resize(width: number, height: number) {
    this.sizes = { width, height }
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.clear()
    this.renderer.setSize(width, height)
  }

  public draw() {
    if (!this.fps.check) {
      return
    }
    if (this.stats) {
      this.stats.update()
    }
    this.renderer.render(this.scene, this.camera)
  }

  private createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls
  }

  private createStats(): void {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  private createGui() {
    this.gui = GuiControls.getInstance()
    const common = this.gui.addFolder('Common').close()
    common.add(this.params, 'speed', 0, 0.02, 0.001)
    common
      .add(this.params, 'fps', 1, 60, 1)
      .onChange((n: number) => this.fps.change(Math.floor(n)))
  }

  private createRenderer() {
    const { canvas } = this
    this.renderer = new Renderer({ canvas })
    this.renderer.setDpr(
      window.devicePixelRatio ? Math.min(1.5, window.devicePixelRatio) : 1
    )
  }

  private createCamera() {
    this.camera = new Camera({
      fov: 30,
      aspect: this.sizes.width / this.sizes.height,
    })
    this.camera.position.z = 15
  }

  private createScene() {
    this.scene = new Scene()
  }

  private createPlane() {
    this.plane = new Plane()
    this.scene.add(this.plane)
  }
}
