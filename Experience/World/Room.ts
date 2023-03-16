import * as THREE from "three";
import Experience from "..";
export default class Room {
  experience: Experience;
  scene: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  resize() {}

  update() {}
}
