import { EventEmitter } from "events";
export default class Theme extends EventEmitter {
  theme: any;
  toggleButton: any;
  toggleCircle: any;

  constructor() {
    super();
    this.theme = "light";
    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle = document.querySelector(".toggle-circle");

    this.setEventListeners();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      //insert a class when clicked

      this.toggleCircle.classList.toggle("slide");

      this.theme = this.theme === "dark" ? "light" : "dark";
      document.body.classList.toggle("dark-theme");

      this.emit("switch", this.theme);
    });
  }
}
