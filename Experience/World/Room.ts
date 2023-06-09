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
  play1: any;
  play2: any;
  play3: any;
  roomChildren: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    //animation of fish
    this.time = this.experience.time;
    this.room = this.loader.items.room;

    this.actualRoom = this.room.scene;

    this.roomChildren = {};
    //const helper2 = new THREE.CameraHelper(this.pointLight.shadow.camera);

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

      if (child.name === "Frame4Front") {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("textures/react4.png", (texture) => {
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          child.geometry.computeBoundingBox();
          const { min, max } = child.geometry.boundingBox;
          const size = new THREE.Vector2(max.x - min.x, max.y - min.y);
          const aspect = texture.image.width / texture.image.height;

          let scaleX = 1;
          let scaleY = 1;

          if (aspect > size.x / size.y) {
            scaleY = size.x / (size.y * aspect);
          } else {
            scaleX = (size.y * aspect) / size.x;
          }
        });
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      }

      if (child.name === "MiniFloor") {
        child.position.set(1.51845, -0.111023, 6.10803);
      }

      if (child.name === "Tumbler") {
        child.position.set(-2.91421, -4.505689, 7.77921);
      }

      if (child.name === "Rock") {
        child.position.set(-4.422, -6.47573, 7.17249);
      }

      if (child.name === "Light" || child.name === "Books") {
        child.scale.set(0, 0, 0);
      }

      child.scale.set(0, 0, 0);
      if (child.name === "LoaderCube") {
        child.scale.set(1, 1, 1);
        child.position.set(0, 1.799, 0);
        child.rotation.y = Math.PI / 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });
    const width = 1;
    const height = 0.25;
    const intensity = 5;
    this.pointlight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );

    this.pointlight.lookAt(0, 0, 0);
    //this.scene.add(helper2);

    this.pointlight.position.set(6.5, 7, 0);
    this.pointlight.rotation.y = Math.PI - Math.PI / 4;

    // const rectLightHelper = new RectAreaLightHelper(this.pointlight);
    // this.pointlight.add(rectLightHelper);

    this.actualRoom.add(this.pointlight);
    this.roomChildren["pointlight"] = this.pointlight;
    //shadow end
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }
  //animation of fish
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //could be fixed in blender but now its ok

    this.swim = this.mixer.clipAction(this.room.animations[10]);
    this.play1 = this.mixer.clipAction(this.room.animations[22]);
    this.play2 = this.mixer.clipAction(this.room.animations[23]);
    this.play3 = this.mixer.clipAction(this.room.animations[24]);
    /*shape keys*/
    this.play1.play();
    /*key animation*/
    this.play2.play();
    this.play3.play();
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
