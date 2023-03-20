import * as THREE from "three";
import Experience from "..";
export default class Room {
  experience: Experience;
  scene: any;
  loader: any;
  room: any;
  actualRoom: any;
  mixer: any;
  swim: any;
  time: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    //animation of fish
    this.time = this.experience.time;
    this.room = this.loader.items.room;
    this.actualRoom = this.room.scene;
    console.log(this.room);
    this.setModel();
    this.setAnimation();
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
        console.log(child);
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x80def9);
        child.material.ior = 1;
        child.material.transmission = 1.5;
        child.material.opacity = 0.9;
      }

      if (child.name === "MonitorScreen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.loader.items.screen,
        });
      }
    });

    //shadow end
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }
  //animation of fish
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //could be fixed in blender but now its ok
    this.swim = this.mixer.clipAction(this.room.animations[131]);
    this.swim.play();
  }

  resize() {}
  //animation of fish
  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}
