import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ObjectComponent } from '@/webgl/objects/ObjectComponent'

interface RendererProps {
  alpha?: boolean
  antialias?: boolean
}

interface WebGLProps extends RendererProps {
  controls?: boolean
}

export class WebGL {
  private canvas: HTMLCanvasElement
  private width: number
  private height: number
  private dpr: number
  private props: WebGLProps
  private renderer!: WebGLRenderer
  private scene!: Scene
  private camera!: PerspectiveCamera
  private controls!: OrbitControls

  constructor(
    canvas: HTMLCanvasElement,
    { controls = false, alpha = false, antialias = true }: WebGLProps = {}
  ) {
    this.canvas = canvas
    this.width = 0
    this.height = 0
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

  private createRenderer(): void {
    const { canvas } = this
    const { antialias, alpha } = this.props
    this.renderer = new WebGLRenderer({ canvas, antialias, alpha })
    this.renderer.setPixelRatio(this.dpr)
  }

  private createScene(): void {
    this.scene = new Scene()
  }

  private createCamera(): void {
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 100)
    this.camera.position.z = 3
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  public update<U>(params?: U): void {
    if (this.props.controls) {
      this.controls.update()
    }

    this.scene.children.forEach((obj) => {
      if ('update' in obj && params) {
        ;(obj as ObjectComponent).update(params)
      }
    })

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
}
