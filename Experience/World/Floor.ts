import * as THREE from "three";
import Experience from "..";
import GSAP from "gsap";

export default class Floor {
  experience: Experience;
  scene: any;
  loader: any;
  room: any;
  actualRoom: any;
  time: any;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.MeshStandardMaterial | undefined;
  plane:
    | THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>
    | undefined;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;

    this.setFloor();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.1;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  resize() {}

  update() {}
}
