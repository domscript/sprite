// "./player";  ++++
// "./input";  ++++
// "./playerStates";  ++++
// "./fire";
// "./enemies";
// "./layer";
// "./UI";
// "./effects";

import { Player } from "./player";
import { InputHandler } from "./input";

export class Game {
  groundMarginMain = 100;
  public player: Player;
  public input: InputHandler;
  debug = true;

  constructor(public width: number, public height: number) {
    this.player = new Player(this);
    this.input = new InputHandler(this);
  }
  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
  }
  update(deltaTimeInMilliseconds: number) {
    this.player.update(this.input.keys, deltaTimeInMilliseconds);
  }
}
