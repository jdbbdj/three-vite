import * as THREE from "three";
import Experience from "..";
import GSAP from "gsap";

export default class Room {
  experience: Experience;
  scene: any;
  loader: any;
  room: any;
  actualRoom: any;
  mixer: any;
  swim: any;
  time: any;
  rotation: any;
  lerp: any;
  pointlight: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    //animation of fish
    this.time = this.experience.time;
    this.room = this.loader.items.room;
    this.actualRoom = this.room.scene;
    //const helper2 = new THREE.CameraHelper(this.pointLight.shadow.camera);
    const width = 1;
    const height = 0.25;
    this.pointlight = new THREE.RectAreaLight(0x80def9, 4, width, height);

    //this.scene.add(helper2);

    this.pointlight.position.set(7, 6, 0);

    this.pointlight.rotation.z = Math.PI / 10;
    this.pointlight.rotation.y = Math.PI / 2;
    // const rectLightHelper = new RectAreaLightHelper(this.pointlight);
    // this.pointlight.add(rectLightHelper);
    this.actualRoom.add(this.pointlight);
    //lerping rotation
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    this.setModel();
    this.setAnimation();
    this.onMouseMove();
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

  //on mouse move

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      //moves the object when you move your mouse to the right
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      //lerping rotation
      this.lerp.target = this.rotation * 0.25;
    });
  }

  resize() {}
  //animation of fish
  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.0009);
  }
}
