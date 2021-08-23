import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface RendererProps {
  alpha?: boolean
  antialias?: boolean
}

export interface WebGLProps extends RendererProps {
  controls?: boolean
}

export class WebGL {
  private canvas: HTMLCanvasElement
  private dpr: number
  private props: WebGLProps
  private _width: number
  private _height: number
  private _scene!: Scene
  private _renderer!: WebGLRenderer
  private _camera!: PerspectiveCamera
  private _controls!: OrbitControls

  constructor(
    canvas: HTMLCanvasElement,
    { controls = false, alpha = false, antialias = true }: WebGLProps = {}
  ) {
    this.canvas = canvas
    this._width = 0
    this._height = 0
    this.dpr = window.devicePixelRatio
      ? Math.min(1.5, window.devicePixelRatio)
      : 1

    this.props = {
      controls,
      alpha,
      antialias,
    }

    this.createRenderer()
    this.createScene()
    this.createCamera()

    if (controls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }
  }

  public update(): void {
    if (this.props.controls) {
      this.controls.update()
    }

    this.render()
  }

  public resize(width: number, height: number): void {
    this.width = width
    this.height = height

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.clear()
    this.renderer.setSize(this.width, this.height)
  }

  public add(obj: Object3D): void {
    this.scene.add(obj)
  }

  public remove(obj: Object3D): void {
    this.scene.remove(obj)
  }

  public set renderer(renderer: WebGLRenderer) {
    this._renderer = renderer
  }

  public get renderer(): WebGLRenderer {
    return this._renderer
  }

  public set scene(scene: Scene) {
    this._scene = scene
  }

  public get scene(): Scene {
    return this._scene
  }

  public set camera(camera: PerspectiveCamera) {
    this._camera = camera
  }

  public get camera(): PerspectiveCamera {
    return this._camera
  }

  public set controls(controls: OrbitControls) {
    this._controls = controls
  }

  public get controls(): OrbitControls {
    return this._controls
  }

  public set width(size: number) {
    this._width = size
  }

  public get width(): number {
    return this._width
  }

  public set height(size: number) {
    this._height = size
  }

  public get height(): number {
    return this._height
  }

  private createRenderer(): void {
    const { canvas } = this
    const { antialias, alpha } = this.props
    this.renderer = new WebGLRenderer({ canvas, antialias, alpha })
    this.renderer.setPixelRatio(this.dpr)
  }

  private createScene(): void {
    this._scene = new Scene()
  }

  private createCamera(): void {
    this.camera = new PerspectiveCamera(70, this.width / this.height, 0.1, 100)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera)
  }
}
