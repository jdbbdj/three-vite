import { EventEmitter } from "events";
import Experience from "..";
import GSAP from "gsap";
import convert from "../Utils/DivtoSpan";
export default class Preloader extends EventEmitter {
  experience: Experience;
  scene: any;
  loader: any;
  time: any;
  camera: any;
  sizes: any;
  world: any;
  room: any;
  roomChildren: any;
  timeline: gsap.core.Timeline | undefined;
  device: any;
  scrollOnceEvent: any;
  secondTimeLine: gsap.core.Timeline | undefined;
  touch: any;
  touchMove: any;
  initialY: any;
  moveFlag: boolean | undefined;
  scaleFlag: any;
  third: gsap.core.Timeline | undefined;
  arrowDownTimeline: any;
  constructor() {
    super();
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;

    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device: any) => {
      this.device = device;
    });

    this.world = this.experience.world;

    this.world.on("worldready", () => {
      this.playIntro();
    });
  }

  intro() {
    return new Promise((resolve: any) => {
      convert(document.querySelector(".intro-text"));
      convert(document.querySelector(".hero-main-title"));
      convert(document.querySelector(".hero-main-description"));
      convert(document.querySelector(".hero-second-subheading"));
      convert(document.querySelector(".hero-second-subheading2"));

      this.timeline = GSAP.timeline();
      this.room = this.experience.world.room.actualRoom;

      this.roomChildren = this.experience.world.room.roomChildren;
      this.timeline.set(".animated", {
        y: 0,
        yPercent: 100,
      });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 0.2,
        onComplete: () => {
          document.querySelector(".preloader")?.classList.toggle("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.loadercube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 1,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.loadercube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 1,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }

      this.timeline.to(".animated-intro-text", {
        yPercent: 0,
        stagger: 0.09,
        ease: "backout(3)",
        onComplete: resolve,
      });
    });
  }

  playAnotherIntro() {
    return new Promise((resolve: any) => {
      this.secondTimeLine = GSAP.timeline();
      this.arrowDownTimeline.to(".arrow-down", {
        marginTop: 20,
      });
      this.secondTimeLine
        .to(".animated-intro-text", {
          yPercent: 100,
          stagger: 0.09,
          ease: "back.in(3)",
        })
        .to(".arrow-down", {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
            duration: 0.7,
          },
          "same"
        )
        .to(
          this.roomChildren.loadercube.rotation,
          {
            y: 2 * Math.PI + (-Math.PI / 4) * 3,
          },
          "same"
        )
        .to(
          this.roomChildren.loadercube.scale,
          {
            x: 6,
            y: 6,
            z: 6,
          },
          "same"
        )
        .to(
          this.roomChildren.loadercube.position,
          {
            y: 5.21585,
            z: 0.55819,
            ease: "power1.out",
            duration: 0.7,
          },
          "same"
        )
        .to(
          this.roomChildren.loadercube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
          },
          "room"
        )
        .to(
          this.roomChildren.roomwalls.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 2,
          },
          "room"
        )
        .to(
          ".animated-hero-main-title",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "backout(1.3)",
            onComplete: resolve,
          },
          "words"
        )
        .to(
          ".animated-hero-main-description",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "backout(1.3)",
            onComplete: resolve,
          },
          "words"
        )
        .to(
          ".animated-hero-second-subheading",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "backout(1.3)",
            onComplete: resolve,
          },
          "words"
        )
        .to(
          ".animated-hero-second-subheading2",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "backout(1.3)",
            onComplete: resolve,
          },
          "words"
        )
        .to(
          this.roomChildren.stands.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "stands"
        )
        .to(
          this.roomChildren.aparador.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "stands"
        )
        .to(
          this.roomChildren.flooritems.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "stands"
        )
        .to(
          this.roomChildren.tabletops.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "tops"
        )
        .to(
          this.roomChildren.tablemiscs.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "tops"
        )
        .to(
          this.roomChildren.flooritems.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "tops"
        )
        .to(
          this.roomChildren.shelves.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "displays"
        )
        .to(
          this.roomChildren.monitor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "displays"
        )
        .to(
          this.roomChildren.monitorscreen.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "displays"
        )
        .to(
          this.roomChildren.window.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "displays"
        )
        .to(
          this.roomChildren.aquariumframe.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "displays"
        )
        .to(this.roomChildren.dotes.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
        .to(
          this.roomChildren.keybs.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.2,
          },
          "hide"
        )
        .to(
          this.roomChildren.minifloor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.2,
          },
          "hide"
        )
        .to(
          this.roomChildren.tumbler.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.2,
          },
          "hide"
        )
        .to(
          this.roomChildren.rock.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          },
          "hide"
        )
        .to(this.roomChildren.rocks.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
        .to(this.roomChildren.plants.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
        .to(this.roomChildren.fish.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
        .to(this.roomChildren.aquarium.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
        .to(".arrow-down", {
          opacity: 1,
          duration: 0.5,
          onComplete: resolve,
        });
    });
  }

  onScroll(e: any) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e: any) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e: any) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touch);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.intro();

    this.arrowDownTimeline = GSAP.timeline({ repeat: -1 });
    this.arrowDownTimeline
      .to(".arrow-down", {
        y: 5,
        ease: "easeOut",
      })
      .to(".arrow-down", {
        y: -5,
        ease: "easeOut",
      });
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touch = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touch);
    window.addEventListener("touchmove", this.touchMove);
  }
  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.playAnotherIntro();

    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    this.roomChildren.pointlight.width = 0;
    this.roomChildren.pointlight.height = 0;
    if (this.device === "desktop") {
      this.room.scale.set(0.15, 0.15, 0.15);
    } else {
      this.room.scale.set(0.07, 0.07, 0.07);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }
    if (this.scaleFlag) {
      this.scale();
    }
  }
}
