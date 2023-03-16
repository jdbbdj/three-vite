import * as THREE from "three";
import Experience from "..";

export default class Environment {
  experience: Experience;
  scene: any;
  loader: any;
  sunlight: any;
  light: any;
  pointLight: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.setSunlight();
  }

  setSunlight() {
    //AXES HELPER
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
    //GRID LINES START
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    //GRID LINES END
    this.scene.add(gridHelper);
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(1.5, 7, 3);
    this.scene.add(this.sunlight);
    //helper
    const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    this.scene.add(helper);
    //ambientlight
    this.light = new THREE.AmbientLight("#ffffff", 0.4);
    this.scene.add(this.light);
    //pointlight
    this.pointLight = new THREE.PointLight("#ffffff", 0.5);
    //const helper2 = new THREE.CameraHelper(this.pointLight.shadow.camera);
    //this.scene.add(helper2);
    this.pointLight.position.set(0.5, 0.6, -0.04);
    this.scene.add(this.pointLight);
  }
  resize() {}

  update() {}
}
