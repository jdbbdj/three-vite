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
    this.scene.add(this.actualRoom);
  }

  resize() {}

  update() {}
}
