import { PerspectiveCamera } from 'three'

interface CameraProps {
  fov: number
  aspect: number
  near: number
  far: number
}

export class Camera extends PerspectiveCamera {
  constructor({
    fov = 45,
    aspect,
    near = 0.1,
    far = 100,
  }: Partial<CameraProps> = {}) {
    super(fov, aspect, near, far)
  }
}
