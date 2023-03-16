import * as THREE from "three";
import Experience from "..";
export default class Room {
  experience: Experience;
  scene: any;
  loader: any;
  room: any;
  actualRoom: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;

    this.room = this.loader.items.room;
    this.actualRoom = this.room.scene;

    this.setModel();
  }

  setModel() {
    //shadow
    this.actualRoom.children.forEach((child: any) => {
      //for meshes
      child.castShadow = true;
      child.receiveShadow = true;

      //for child that is group
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild: any) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "Aquarium") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x80def9);
        child.material.ior = 1;
        child.material.transmission = 1.5;
        child.material.opacity = 0.9;
      }
    });

    //shadow end
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  resize() {}

  update() {}
}
