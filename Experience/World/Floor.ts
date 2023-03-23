import * as THREE from "three";
import Experience from "..";

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
  circle:
    | THREE.Mesh<THREE.CircleGeometry, THREE.MeshStandardMaterial>
    | undefined;
  circle3:
    | THREE.Mesh<THREE.CircleGeometry, THREE.MeshStandardMaterial>
    | undefined;
  circle2:
    | THREE.Mesh<THREE.CircleGeometry, THREE.MeshStandardMaterial>
    | undefined;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.setCircles();
    this.setFloor();
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(1, 48);
    const material = new THREE.MeshStandardMaterial({ color: 0x1b2325 });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x251d1b });
    const material3 = new THREE.MeshStandardMaterial({ color: 0xb5bbe2 });

    this.circle = new THREE.Mesh(geometry, material);
    this.circle3 = new THREE.Mesh(geometry, material3);
    this.circle2 = new THREE.Mesh(geometry, material2);

    this.circle.position.y = -0.09;
    this.circle3.position.y = -0.07;
    this.circle2.position.y = -0.08;

    this.circle.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);

    this.circle.rotation.x =
      this.circle2.rotation.x =
      this.circle3.rotation.x =
        -Math.PI / 2;

    this.circle.receiveShadow =
      this.circle2.receiveShadow =
      this.circle3.receiveShadow =
        true;

    this.scene.add(this.circle);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
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
