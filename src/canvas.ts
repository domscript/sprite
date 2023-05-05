import { SpritesMapType } from "./utils";

export function canvasHandler(
  canvas: HTMLCanvasElement,
  input: HTMLInputElement,
  index: number,
  spriteAnimations: SpritesMapType,
  playerImage: HTMLImageElement,
  size: number
) {
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = size);
  const CANVAS_HEIGHT = (canvas.height = size);

  const newSpriteMap: SpritesMapType = Object.entries(spriteAnimations).reduce(
    (acc: SpritesMapType, [state, data]) => {
      acc[state] = {
        ...data,
        loc: data.loc.map((e) => ({ ...e })),
      };
      return acc;
    },
    {}
  );

  let frameInterval = 100;
  let frameTimer = 0;
  let lastTime = 0;

  let frameX = 0;
  if (!input) return;
  let frameXL = Number(input.value) - 1;

  const spriteStates = Object.keys(spriteAnimations);
  const currentState = spriteStates[index];
  const sizeX = spriteAnimations[currentState].sizeX;
  const sizeY = spriteAnimations[currentState].sizeY;

  input.addEventListener("change", function () {
    const n = Number(input.value);
    frameXL = n - 1;
    spriteAnimations[currentState].loc = newSpriteMap[currentState].loc.slice(
      0,
      n
    );
  });

  function animate(timeStamp: number = 0) {
    if (!ctx) return;

    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;
    if (frameTimer < frameInterval) {
      frameTimer += deltaTimeInMilliseconds;
    } else {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        playerImage,
        frameX * sizeX,
        index * sizeY,
        sizeX,
        sizeY,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      frameTimer = 0;
      if (frameX < frameXL) frameX++;
      else frameX = 0;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
