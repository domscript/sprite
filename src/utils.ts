export const spriteAnimations: {
  [key: string]: {
    sizeX: number;
    sizeY: number;
    loc: { x: number; y: number }[];
  };
} = {};

const spriteWidth = 200;
const spriteHeight = 180;

export enum States {
  IDLE = "IDLE",
  JUMPING = "JUMPING",
  FALLING = "FALLING",
  RUNNING = "RUNNING",
  DIZZY = "DIZZY",
  LIEDOWN = "LIEDOWN",
  ROLLING = "ROLLING",
  BITE = "BITE",
  KO = "KO",
  HIT = "HIT",
}

type SpritesMapType = {
  [key: string]: {
    maxX: number;
    lineY: number;
  };
  IDLE: {
    maxX: number;
    lineY: number;
  };
  JUMPING: {
    maxX: number;
    lineY: number;
  };
  FALLING: {
    maxX: number;
    lineY: number;
  };
  RUNNING: {
    maxX: number;
    lineY: number;
  };
  DIZZY: {
    maxX: number;
    lineY: number;
  };
  LIEDOWN: {
    maxX: number;
    lineY: number;
  };
  ROLLING: {
    maxX: number;
    lineY: number;
  };
  BITE: {
    maxX: number;
    lineY: number;
  };
  KO: {
    maxX: number;
    lineY: number;
  };
  HIT: {
    maxX: number;
    lineY: number;
  };
};

const spritesMap: SpritesMapType = {
  [States.IDLE]: { maxX: 7, lineY: 0 },
  [States.JUMPING]: { maxX: 7, lineY: 1 },
  [States.FALLING]: { maxX: 7, lineY: 2 },
  [States.RUNNING]: { maxX: 9, lineY: 3 },
  [States.DIZZY]: { maxX: 11, lineY: 4 },
  [States.LIEDOWN]: { maxX: 5, lineY: 5 },
  [States.ROLLING]: { maxX: 7, lineY: 6 },
  [States.BITE]: { maxX: 7, lineY: 7 },
  [States.KO]: { maxX: 12, lineY: 8 },
  [States.HIT]: { maxX: 4, lineY: 9 },
};

Object.entries(spritesMap).forEach(([state, { maxX, lineY }]) => {
  const loc = [];
  for (let i = 0; i < maxX; ++i) {
    loc.push({ x: i * spriteWidth, y: lineY * spriteHeight });
  }
  spriteAnimations[state] = {
    sizeX: spriteWidth,
    sizeY: spriteHeight,
    loc,
  };
});
