import * as THREE from "three";
import Experience from "..";
import GSAP from "gsap";
export default class Environment {
  experience: Experience;
  scene: any;
  loader: any;
  sunlight: any;
  light: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.setSunlight();
  }

  setSunlight() {
    //AXES HELPER
    // const axesHelper = new THREE.AxesHelper(20);
    // this.scene.add(axesHelper);
    // //GRID LINES START
    // const size = 20;
    // const divisions = 20;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // //GRID LINES END
    // this.scene.add(gridHelper);
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(1.5, 7, 3);
    this.scene.add(this.sunlight);
    //helper
    // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(helper);
    //ambientlight

    this.light = new THREE.AmbientLight("#ffffff", 0.4);
    this.scene.add(this.light);
    //pointlight
  }

  switchTheme(theme: any) {
    if (theme === "dark") {
      //animate the color
      GSAP.to(this.sunlight.color, {
        r: 10 / 255,
        g: 10 / 255,
        b: 10 / 255,
      });

      GSAP.to(this.light.color, {
        r: 35 / 255,
        g: 35 / 255,
        b: 35 / 255,
      });
    } else if (theme === "light") {
      GSAP.to(this.sunlight.color, {
        r: 1,
        g: 1,
        b: 1,
      });

      GSAP.to(this.light.color, {
        r: 1,
        g: 1,
        b: 1,
      });
    }
  }
  resize() {}

  update() {}
}
