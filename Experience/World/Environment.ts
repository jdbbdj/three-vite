import * as THREE from "three";
import Experience from "..";

export default class Environment {
  experience: Experience;
  scene: any;
  loader: any;
  sunlight: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.setSunlight();
  }

  setSunlight() {
    //GRID LINES START
    const size = 100;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper(size, divisions);
    //GRID LINES END
    this.scene.add(gridHelper);
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(1.5, 7, 3);
    this.scene.add(this.sunlight);
  }
  resize() {}

  update() {}
}
