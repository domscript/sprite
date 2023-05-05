import { SpritesMap } from "./spritesMap";
import { Idle, MoveRight, MoveLeft, StateInt, States } from "./playerStates";
import { Game } from "./game";

export class Player {
  playerImage = new Image();
  currentState: StateInt;
  states: {
    [key: string]: StateInt;
  };
  sprites = SpritesMap;
  scale = 0.2;
  frame = 0;
  frameTimer = 0;
  frameInterval = 60;
  width: number;
  height: number;
  frameMax: number = SpritesMap.state0.loc.length - 1;
  speedMax = 15;
  speedX = 0;
  x = 0;

  constructor(public game: Game) {
    this.playerImage.src = "player.png";
    this.width = this.sprites[States.IDLE].sizeX;
    this.height = this.sprites[States.IDLE].sizeY;
    this.states = {
      [States.IDLE]: new Idle(this.game),
      [States.MOVERIGHT]: new MoveRight(this.game),
      [States.MOVELEFT]: new MoveLeft(this.game),
    };
    this.currentState = this.states[States.IDLE];
  }

  draw(context: CanvasRenderingContext2D) {
    const state = this.currentState.states;
    context.save();
    context.drawImage(
      this.playerImage,
      this.sprites[state].loc[this.frame].x,
      this.sprites[state].loc[this.frame].y,
      this.sprites[state].sizeX,
      this.sprites[state].sizeY,
      (this.game.width * (1 - this.scale)) / 2 + this.x,
      this.game.height * (1 - this.scale) - this.game.groundMarginMain,
      this.game.width * this.scale,
      this.game.height * this.scale
    );
    context.restore();
  }
  update(input: string[], deltaTimeInMilliseconds: number) {
    this.spriteAnimation(deltaTimeInMilliseconds);
    this.horisontalMovements(input);
  }

  spriteAnimation(deltaTimeInMilliseconds: number): void {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frame < this.frameMax) {
        this.frame++;
      } else this.frame = 0;
    } else {
      this.frameTimer += deltaTimeInMilliseconds;
    }
  }

  horisontalMovements(input: string[]): void {
    this.currentState.handleInput(input);

    // if (this.x >= -this.game.width / 4 && this.x <= this.game.width / 4)
    //   this.x += this.speedX;
    // else {
    //   this.speedX = 0;
    //   if (this.x < -this.game.width / 4) this.x = -this.game.width / 4;
    //   if (this.x > this.game.width / 4) this.x = this.game.width / 4;
    // }

    if (
      this.x >= -this.game.width / 2.4 - this.speedX &&
      this.x <= this.game.width / 2.4 - this.speedX
    )
      this.x += this.speedX;
    else {
      this.speedX = 0;
    }
  }

  setState(state: string, speed: number) {
    if (this.currentState.states === state) return;
    this.speedX = speed;
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
