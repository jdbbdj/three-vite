import * as THREE from "three";
import Experience from ".";
export default class Renderer {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  camera: any;
  renderer: any;

  constructor() {
    this.experience = new Experience(null);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    //creates a split view on your render
    // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    // this.renderer.render(this.scene, this.camera.orthographicCamera);
    //props for second screen
    // this.renderer.setScissorTest(true);

    //clips the viewport
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    //creates a section on your screen
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );

    this.renderer.render(this.scene, this.camera.perspectiveCamera);
    //make sure to call this after
    this.renderer.setScissorTest(false);
  }
}
