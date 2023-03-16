import * as THREE from "three";
import Experience from ".";
export default class World {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  camera: any;
  renderer: any;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
  }

  resize() {}

  update() {}
}
