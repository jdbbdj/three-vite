import * as THREE from "three";

//Global UTILS
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Loader from "./Utils/Loader";

//assets
import assets from "./Utils/assets";
//Reusable
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Theme from "./Theme";
import Preloader from "./World/Preloader";
import Controls from "./World/Controls";
export default class Experience {
  canvas: any;
  static instance: any;
  sizes: any;
  scene: any;
  camera: any;
  renderer: any;
  time: any;
  world: any;
  loader: any;
  theme: Theme | undefined;
  preloader: any;
  controls: Controls | undefined;

  constructor(canvas: any) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loader = new Loader(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => (this.controls = new Controls()));

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    //animation of fish
    this.world.resize();
    //render
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    //animation of fish
    this.world.update();
    //render
    this.renderer.update();
  }
}
