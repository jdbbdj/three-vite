import * as THREE from "three";
import Experience from "..";

import Room from "./Room";
import Environment from "./Environment";
export default class World {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  camera: any;
  room: any;
  loader: any;
  environment: any;
  constructor() {
    this.experience = new Experience(null);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.loader = this.experience.loader;
    this.loader.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      console.log("CREATED ROOM");
    });
  }

  resize() {}

  update() {}
}
