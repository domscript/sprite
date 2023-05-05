import { Game } from "./game";
import { Control } from "./input";

export enum States {
  IDLE = "state0",
  MOVERIGHT = "state1",
  MOVELEFT = "state2",
}

export interface StateInt {
  states: States;
  game: Game;
  enter: () => void;
  handleInput: (input: string[]) => void;
}

abstract class State implements StateInt {
  constructor(
    public states: States.IDLE | States.MOVELEFT | States.MOVERIGHT,
    public game: Game
  ) {}

  enter() {
    if (!this.game.player) return;

    this.game.player.width = this.game.player.sprites[this.states].sizeX;
    this.game.player.height = this.game.player.sprites[this.states].sizeY;
    this.game.player.frame = 0;
    this.game.player.frameMax =
      this.game.player.sprites[this.states].loc.length - 1;
  }

  handleInput(input: string[]) {
    if (input.includes(Control.ArrowRight)) {
      this.game.player.setState(States.MOVERIGHT, this.game.player.speedMax);
    } else if (input.includes(Control.ArrowLeft)) {
      this.game.player.setState(States.MOVELEFT, -this.game.player.speedMax);
    } else {
      this.game.player.setState(States.IDLE, 0);
    }
  }
}

export class Idle extends State {
  constructor(game: Game) {
    super(States.IDLE, game);
  }
}

export class MoveRight extends State {
  constructor(game: Game) {
    super(States.MOVERIGHT, game);
  }
}

export class MoveLeft extends State {
  constructor(game: Game) {
    super(States.MOVELEFT, game);
  }
}
