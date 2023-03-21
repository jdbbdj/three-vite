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

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
  }

  //on mouse move

  resize() {}

  update() {}
}
