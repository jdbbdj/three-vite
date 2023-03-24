import { EventEmitter } from "events";
import Experience from "..";

import Room from "./Room";
import Environment from "./Environment";
import Floor from "./Floor";
import Preloader from "./Preloader";
export default class World extends EventEmitter {
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
  theme: any;
  preloader: Preloader | undefined;
  constructor() {
    super();
    this.experience = new Experience(null);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.loader = this.experience.loader;
    this.theme = this.experience.theme;
    this.loader.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      //this.controls = new Controls();
      this.emit("worldready", () => {});
    });

    this.theme.on("switch", (theme: any) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme: any) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
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
