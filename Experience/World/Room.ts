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
    console.log(this.actualRoom);

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
    });

    //shadow end
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  resize() {}

  update() {}
}
