import { Camera, Scene, WebGLRenderer } from 'three'

interface RendererProps {
  canvas: HTMLCanvasElement
  alpha?: boolean
  antialias?: boolean
}

export class Renderer extends WebGLRenderer {
  constructor({ canvas, alpha = true, antialias = true }: RendererProps) {
    super({ canvas, alpha, antialias })
  }

  public setDpr(dpr: number) {
    this.setPixelRatio(dpr)
  }

  public draw(camera: Camera, scene: Scene) {
    this.render(scene, camera)
  }
}
