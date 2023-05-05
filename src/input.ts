import { Game } from "./game";

export enum Control {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Attack = "KeyZ",
  Debug = "KeyD",
}

export class InputHandler {
  keys: string[] = [];
  constructor(public game: Game) {
    window.addEventListener("keydown", (e) => {
      if (this.keys.includes(e.code)) return;

      switch (e.code) {
        case Control.ArrowLeft:
        case Control.ArrowRight:
        case Control.Attack:
          this.keys.push(e.code);
          break;
        case Control.Debug:
          this.game.debug = !this.game.debug;
          break;
        default:
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case Control.ArrowLeft:
        case Control.ArrowRight:
        case Control.Attack:
          this.keys = this.keys.filter((el) => !(el === e.code));
          break;
        default:
          break;
      }
    });
  }
}
