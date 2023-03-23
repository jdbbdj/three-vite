import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "..";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default class Loader extends EventEmitter {
  experience: Experience;
  renderer: any;
  assets: { name: string; type: string; path: string }[];
  items: any;
  queue: number;
  loaded: number;
  loaders: any;
  video: any;
  videoTexture: any;

  constructor(assets: { name: string; type: string; path: string }[]) {
    super();
    this.experience = new Experience(null);
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};

    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfloader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();

    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfloader.setDRACOLoader(this.loaders.dracoLoader);
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfloader.load(asset.path, (file: any) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "videoTexture") {
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.path;
        this.video[asset.name].playInline = true;
        this.video[asset.name].muted = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );

        this.videoTexture[asset.name].flipY = true;
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].generateMipmaps = false;
        this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset: any, file: any) {
    this.items[asset.name] = file;

    this.loaded++;
    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
