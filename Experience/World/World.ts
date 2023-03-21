import Experience from "..";

import Controls from "./Controls";
import Room from "./Room";
import Environment from "./Environment";
import Floor from "./Floor";
export default class World {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  camera: any;
  room: any;
  loader: any;
  environment: any;
  controls: any;
  floor: Floor | undefined;
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
      this.floor = new Floor();
      this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    //animation of fish
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
