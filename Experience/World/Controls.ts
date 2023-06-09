import Experience from "..";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";
import { backend_models, frontend_models } from "../data/data";
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
  animations: any;
  play1: any;
  play2: any;
  play3: any;
  play4: any;
  play5: any;
  backend_play1: any;
  backend_play2: any;
  backend_play3: any;
  backend_play4: any;
  backend_play5: any;
  //lerp: { current: number; target: number; ease: number };
  position: any;
  back: any;
  lookAtPosition: any;
  directionalVector: any;
  staticVector: any;
  crossVector: any;
  timeline: any;
  sizes: any;
  firstMoveTimeLine: any;
  secondMoveTimeLine: gsap.core.Timeline | undefined;
  thirdMoveTimeLine: gsap.core.Timeline | undefined;
  pointlight: any;
  rectlight: any;
  button: any;
  circle: any;
  theme: any;
  first: any;
  second: any;
  third: any;
  fourth: any;
  fifth: any;
  sixth: any;
  secondPartTimeLine: any;
  thirdPartTimeline: any;
  sections: NodeListOf<Element> | undefined;
  progressWrapper: NodeListOf<Element> | undefined;
  progressBar: any;
  smooth: any;
  circle1: any;
  circle2: any;
  circle3: any;
  firstCircleTimeLine: gsap.core.Timeline | undefined;
  secondCircleTimeLine: gsap.core.Timeline | undefined;
  thirdCircleTimeLine: gsap.core.Timeline | undefined;
  device: any;
  links: any;
  linksTimeline: any;
  linkIcon: any;
  linkShown: any;
  roomChildren: any;
  animation1: any;
  animation2: any;
  animation3: any;
  animation4: any;
  constructor() {
    this.experience = new Experience(null);
    this.scene = this.experience.scene;
    this.loader = this.experience.loader;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.device = this.experience.sizes.device;
    this.circle1 = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;
    this.animations = this.experience.world.room?.room.animations;
    this.room = this.experience.world.room.actualRoom;
    this.sizes = this.experience.sizes;
    this.button = this.experience.theme?.toggleButton;
    this.circle = this.experience.theme?.toggleCircle;
    this.mixer = this.experience.world.room?.mixer;
    this.room.children.forEach((child: any) => {
      if (child.type === "RectAreaLight") {
        this.rectlight = child;
      }
    });
    this.roomChildren = this.experience.world.room.roomChildren;
    this.theme = this.experience.theme;
    GSAP.registerPlugin(ScrollTrigger);

    if (this.device === "mobile") {
      document.body.classList.toggle("shown");
    } else {
      document.body.classList.remove("shown");
    }

    this.smoothScroll();
    this.setScrollTrigger();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    mm.add("(min-width: 968px)", () => {
      this.room.scale.set(0.15, 0.15, 0.15);
      this.room.position.set(0, 0, 0);
      this.rectlight.width = 1;
      this.rectlight.height = 0.25;

      this.firstMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".first-scroll",

          start: "top top",
          end: "bottom bottom",

          /*makes the animation more smooth */
          scrub: 0.6,
          /* */
          invalidateOnRefresh: true,
        },
      });
      this.secondMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".second-scroll",

          start: "top top",
          end: "bottom bottom",

          onEnter: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },

          onEnterBack: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          /*makes the animation more smooth */
          scrub: 2,
          /* */
          invalidateOnRefresh: true,
        },
      });
      this.thirdMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".third-scroll",

          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            if (this.theme.theme === "dark") {
              this.circle.classList.remove("slideColored");
              this.button.classList.remove("buttonColored");
              const paths = document.querySelectorAll("path");
              paths.forEach((path) => {
                path.classList.remove("buttonColored");
              });
            }
          },

          onEnterBack: () => {
            if (this.theme.theme === "dark") {
              this.circle.classList.toggle("slideColored");
              this.button.classList.toggle("buttonColored");
              const paths = document.querySelectorAll("path");
              paths.forEach((path) => {
                path.classList.toggle("buttonColored");
              });
            }
          },
          /*makes the animation more smooth */
          scrub: 0.6,
          /* */
          invalidateOnRefresh: true,
        },
      });

      this.firstMoveTimeLine.to(this.room.position, {
        x: () => {
          /*a function that reruns when resized */
          return this.sizes.width * 0.0015;
        },
      });

      this.secondMoveTimeLine
        .to(
          this.room.position,
          {
            x: () => {
              /*a function that reruns when resized */
              return -1.05;
            },
            y: () => {
              return 5;
            },
            z: () => {
              return this.sizes.height * 0.004;
            },
          } /*makes this to call at the same time*/,
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 0.35,
            y: 0.35,
            z: 0.35,
          },
          /*makes this to call at the same time*/
          "same"
        )
        .to(
          this.rectlight.position,
          {
            x: () => {
              return 2.608;
            },
            y: () => {
              return -5;
            },
            z: () => {
              return 2.1654;
            },
          },
          /*makes this to call at the same time*/
          "same"
        )
        .to(
          this.rectlight,
          {
            width: 1 * 3.5,
            height: 0.25 * 3.5,
            intensity: 5,
          },
          /*makes this to call at the same time*/
          "same"
        );

      this.thirdMoveTimeLine.to(
        this.room.position,
        {
          y: () => {
            return 10;
          },
        } /*makes this to call at the same time*/,
        "same"
      );
    });

    mm.add("(max-width: 799px)", () => {
      this.room.scale.set(0.07, 0.07, 0.07);
      this.firstMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".first-scroll",

          start: "top top",
          end: "bottom bottom",

          onEnterBack: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          onLeave: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },

          /*makes the animation more smooth */
          scrub: 0.6,
          /* */
          invalidateOnRefresh: true,
        },
      });
      this.secondMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".second-scroll",

          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          onLeaveBack: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },

          onEnterBack: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          onLeave: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },
          /*makes the animation more smooth */
          scrub: 2,
          /* */
          invalidateOnRefresh: true,
        },
      });

      this.secondMoveTimeLine.to(
        this.room.position,
        {
          y: () => {
            return 5;
          },
        } /*makes this to call at the same time*/,
        "same"
      );
      this.thirdMoveTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".third-scroll",

          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          onEnterBack: () => {
            this.circle.classList.remove("slideColored");
            this.button.classList.remove("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.remove("buttonColored");
            });
          },

          onLeave: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },

          onLeaveBack: () => {
            this.circle.classList.toggle("slideColored");
            this.button.classList.toggle("buttonColored");
            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              path.classList.toggle("buttonColored");
            });
          },

          /*makes the animation more smooth */
          scrub: 0.6,
          /* */
          invalidateOnRefresh: true,
        },
      });
      this.secondMoveTimeLine.to(
        this.room.position,
        {
          y: () => {
            return 1.25;
          },
        } /*makes this to call at the same time*/,
        "same"
      );
      //resets

      this.room.position.set(0, 0, 0);
      this.rectlight.width = 1;
      this.rectlight.height = 0.25;
      this.firstMoveTimeLine.to(this.room.scale, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      });

      this.secondMoveTimeLine.to(
        this.rectlight,
        {
          width: 1 * 3.5,
          height: 0.25 * 3.5,
          intensity: 5,
        },
        /*makes this to call at the same time*/
        "same"
      );

      this.thirdMoveTimeLine.to(
        this.room.position,
        {
          y: () => {
            return 2.75;
          },
        } /*makes this to call at the same time*/,
        "same"
      );
    });

    mm.add("", () => {
      /*mini platform */
      let clickHandler = 0;
      this.links = document.querySelector(".links-below");
      this.linkIcon = document.querySelector(".link-handler");
      this.linkShown = document.querySelector(".link-shown");
      this.linksTimeline = GSAP.timeline({ paused: true });

      this.linksTimeline
        .to(this.links, { height: 100 }, "same")
        .to(this.linkIcon, { opacity: 0, display: "none" }, "same")
        .to(this.linkShown, {
          opacity: 1,
          display: "flex",
          flexDirection: "column",
          height: 100,
        });

      this.links.addEventListener("click", () => {
        if (clickHandler === 0) {
          this.linksTimeline.play();
          clickHandler++;
        } else if (clickHandler === 1) {
          this.linksTimeline.reverse();
          clickHandler = 0;
        }
      });

      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelectorAll(".progress-wrapper");
        this.progressBar = section.querySelector(".progress-bar");

        if (section.classList.contains("right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",

              scrub: 0.6,
            },
          });
          /*thin the border on botttom */
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        if (section.classList.contains("left")) {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",

              scrub: 0.6,
            },
          });

          /*thin the border on botttom */
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        /*progress bar length vertical */
        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        });
      });

      /*circles*/

      this.firstCircleTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".first-scroll",
          start: "top top",
          end: "bottom bottom",
          /*makes the animation more smooth */
          scrub: 0.2,
          /* */
          invalidateOnRefresh: true,
        },
      }).to(this.circle1.scale, {
        x: 6,
        y: 6,
        z: 6,
      });

      this.secondCircleTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".second-scroll",
          start: "top top",
          end: "bottom bottom",
          /*makes the animation more smooth */
          scrub: 0.2,
          /* */
          invalidateOnRefresh: true,
        },
      }).to(this.circle2.scale, {
        x: 6,
        y: 6,
        z: 6,
      });

      this.thirdCircleTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".third-scroll",
          start: "top top",
          end: "bottom bottom",
          /*makes the animation more smooth */
          scrub: 0.2,
          /* */
          invalidateOnRefresh: true,
        },
      }).to(this.circle3.scale, {
        x: 6,
        y: 6,
        z: 6,
      });

      /*animates the mini floor*/

      this.secondPartTimeLine = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".second-scroll",
          start: "top top",
          onEnter: () => {
            this.play1 = this.mixer.clipAction(this.animations[62]);
            this.play2 = this.mixer.clipAction(this.animations[66]);
            this.play3 = this.mixer.clipAction(this.animations[67]);
            /*shape keys*/
            this.play1.play();
            this.play2.play();
            this.play3.play();
          },
        },
      });
      /*tweens*/
      this.room.children.forEach((child: any) => {
        if (child.name === "MiniFloor") {
          this.first = GSAP.to(child.position, {
            x: -3.5139245986938477,
            z: 11.1404,
            y: -0.111023,
            ease: "back.out(2.3)",
            duration: 0.67,
          });
        } else if (child.name === "Tumbler") {
          this.second = GSAP.to(child.position, {
            x: -2.91421,
            y: 0.505689,
            z: 7.77921,
            ease: "back.out(2.3)",
            duration: 0.5,
          });
        } else if (child.name === "Rock") {
          this.third = GSAP.to(child.position, {
            x: -4.422,
            y: -3.47573,
            z: 7.17249,
            ease: "back.out(2.3)",
            duration: 0.3,
          });
        } else if (child.name === "Light") {
          this.fourth = GSAP.to(child.scale, {
            x: 1.8,
            y: 1.8,
            z: 1.8,
            ease: "back.out(2.3)",
            duration: 0.4,
          });
        } else if (child.name === "Books") {
          this.fifth = GSAP.to(child.scale, {
            x: 1.8,
            y: 1.8,
            z: 1.8,
            ease: "back.out(2.3)",
            duration: 0.5,
          });
        }
      });
      this.secondPartTimeLine.add(this.first);
      this.secondPartTimeLine.add(this.second);
      this.secondPartTimeLine.add(this.third, "-=0.2");
      this.secondPartTimeLine.add(this.fourth);
      this.secondPartTimeLine.add(this.fifth, "-=0.1");
      frontend_models.forEach((model) => {
        this.secondPartTimeLine.to(
          this.roomChildren[model].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 0.7,
          },
          "same"
        );
      });

      this.thirdPartTimeline = GSAP.timeline({
        scrollTrigger: {
          /*targets the class of element*/
          trigger: ".third-scroll",
          start: "top top",
          onEnter: () => {
            this.backend_play1 = this.mixer.clipAction(this.animations[95]);
            this.backend_play2 = this.mixer.clipAction(this.animations[98]);
            this.backend_play3 = this.mixer.clipAction(this.animations[99]);
            this.backend_play4 = this.mixer.clipAction(this.animations[100]);
            this.backend_play5 = this.mixer.clipAction(this.animations[101]);
            /*shape keys*/
            this.backend_play1.play();
            this.backend_play2.play();
            this.backend_play3.play();
            this.backend_play4.play();
            this.backend_play5.play();
          },
        },
      });

      backend_models.forEach((model) => {
        this.thirdPartTimeline.to(
          this.roomChildren[model].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 0.7,
          },
          "same"
        );
      });
    });
  }

  setupAsScroll() {
    /*copy and pasted */
    const asscroll = new ASScroll({
      ease: 0.4,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value: any) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  smoothScroll() {
    this.smooth = this.setupAsScroll();
  }

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}
