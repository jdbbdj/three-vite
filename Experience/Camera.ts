import * as THREE from "three";
import Experience from ".";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  perspectiveCamera: any;
  orthographicCamera: any;
  frustum!: number;
  controls: any;
  helper: any;
  controls2: any;

  constructor() {
    this.experience = new Experience(null);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();

    this.createOrthographicCamera();

    this.setOrbitControls();
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
    this.perspectiveCamera.position.set(
      -0.45073057379357784,
      1.4849256797901773,
      4.897236595254125
    );
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -10,
      10
    );

    this.orthographicCamera.position.set(0, 1, 2);
    this.orthographicCamera.rotation.x = -Math.PI / 7;

    this.scene.add(this.orthographicCamera);
    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
    // this.controls2 = new OrbitControls(this.orthographicCamera, this.canvas);
    // this.controls2.enableDamping = true;
    // this.controls2.enableZoom = true;
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

  update() {
    this.controls.update();
    //console.log(this.orthographicCamera.position);
    //orthographic camera setup
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
