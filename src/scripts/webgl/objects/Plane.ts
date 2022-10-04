import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";

export class Plane extends Mesh {
  constructor() {
    const geometry = new PlaneGeometry()
    const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
    super(geometry, material);
  }
}
