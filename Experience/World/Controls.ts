import Experience from "..";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default class Controls {
  experience: Experience;
  scene: any;
  loader: any;
  room: any;
  actualRoom: any;
  mixer: any;
  swim: any;
  time: any;
  curve: any;
  dummyCurve: any;
  camera: any;
  progress: number | undefined;
  //lerp: { current: number; target: number; ease: number };
  position: any;
  back: any;
  lookAtPosition: any;
  directionalVector: any;
  staticVector: any;
  crossVector: any;
  timeline: any;
  sizes: any;

  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.sizes = this.experience.sizes;
    GSAP.registerPlugin(ScrollTrigger);
    // this.progress = 0;
    // this.dummyCurve = new THREE.Vector3(0, 0, 0);

    //lerping making your movement more smoother
    // this.position = new THREE.Vector3(0, 0, 0);
    // this.lerp = {
    //   current: 0,
    //   target: 0,
    //   ease: 0.1,
    // };

    //for camera to directional in parallel with the curve
    // this.directionalVector = new THREE.Vector3(0, 0, 0);

    //this is static that always points upward this will determine if the camera points inside or outside
    //this uses substraction of vectors
    // this.staticVector = new THREE.Vector3(0, -1, 0);
    //this will be the cross product of vector and will always be perpendicular to two of given vectors
    // this.crossVector = new THREE.Vector3(0, 0, 0);

    //lookat
    // this.lookAtPosition = new THREE.Vector3(0, 0, 0);
    //path of scroll
    this.setPath();
    //when scrolling the camera moves
    // this.onScrolling();
  }

  setPath() {
    //   //create a path that camera can follow
    //   this.curve = new THREE.CatmullRomCurve3(
    //     [
    //       new THREE.Vector3(-5, 0, 0),
    //       new THREE.Vector3(0, 0, -5),
    //       new THREE.Vector3(5, 0, 0),
    //       new THREE.Vector3(0, 0, 5),
    //     ],
    //     true
    //   );
    //   const points = this.curve.getPoints(50);
    //   const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //   const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    //   // Create the final object to add to the scene
    //   const curveObject = new THREE.Line(geometry, material);
    //   this.scene.add(curveObject);
    // }
    // onScrolling() {
    //   window.addEventListener("wheel", (e) => {
    //     //scroll up
    //     if (e.deltaY > 0) {
    //       this.lerp.target += 0.01;
    //       //helper for increase
    //       this.back = false;
    //     } else if (e.deltaY < 0) {
    //       this.lerp.target -= 0.01;
    //       this.back = true;
    //     }
    //   });
    //scroll
    this.timeline = GSAP.timeline();
    //moves our room
    this.timeline.to(this.room.position, {
      x: () => {
        /*a function that reruns when resized */
        return this.sizes.width * 0.002;
      },
      scrollTrigger: {
        /*targets the class of element*/
        trigger: ".first-scroll",
        markers: true,
        start: "top top",
        end: "bottom bottom",
        onEnter:()=>{
          console.log("HERE")
        },
        /*makes the animation more smooth */
        scrub: 0.6,

        /* */
        invalidateOnRefresh: true,
      },
    });
  }

  resize() {}

  update() {
    //creating smooth camera movement
    //LERPING ROTATIONS
    //making sure your value is in range
    // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
    //this part makes your camera points perpendicular to the curve
    //this.curve.getPointAt(this.lerp.current % 1, this.position);
    //this.camera.orthographicCamera.position.copy(this.position);
    //substraction of vectors to be caught to used for cross product
    //this.directionalVector.subVectors(
    //  this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
    //  this.position
    //);
    //unit vector conversion
    //this.directionalVector.normalize();
    //cross product
    //this.crossVector.crossVectors(this.directionalVector, this.staticVector);
    //this makes the values inverse and makes the camera focus more accurate
    //this.crossVector.multiplyScalar(100000);
    //this.camera.orthographicCamera.lookAt(this.crossVector);
    //--------------------BOTTOM ARE INITIAL FOR EXPLANATION------------------------
    //making it automatic
    // if (this.back) {
    //   this.lerp.target -= 0.001;
    // } else {
    //   this.lerp.target += 0.001;
    // }
    //get the first point on catmul rom curve
    //getpoint first param is the percentage 0 -1
    //second param is the basis of points
    // this.curve.getPointAt(this.lerp.current, this.position);
    //watcher of the next point
    // this.curve.getPointAt(
    //   (this.lerp.current += 0.00001) % 1,
    //   this.lookAtPosition
    // );
    //copy the position
    // this.camera.orthographicCamera.position.copy(this.position);
    //this makes your camera align with the curve
    // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
  }
}
