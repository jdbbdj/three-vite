import * as THREE from "three";
import Experience from ".";
export default class Camera {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  perspectiveCamera: any;
  orthographicCamera: any;
  frustum!: number;

  constructor() {
    this.experience = new Experience(null);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();

    this.createOrthographicCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

    this.scene.add(this.perspectiveCamera);
    //to be changed for perspective
    this.perspectiveCamera.position.z = 10;
  }

  createOrthographicCamera() {
    this.frustum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -100,
      1000
    );

    this.scene.add(this.orthographicCamera);
  }

  resize() {
    //perspective update
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
    //orthographic update
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {}
}