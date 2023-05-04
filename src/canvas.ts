import { SpritesMapType } from "./utils";

export function canvasHandler(
  canvas: HTMLCanvasElement,
  inputs: HTMLCollectionOf<HTMLInputElement>,
  index: number,
  spriteAnimations: SpritesMapType,
  playerImage: HTMLImageElement,
  size: number
) {
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = size);
  const CANVAS_HEIGHT = (canvas.height = size);

  let frameInterval = 100;
  let frameTimer = 0;
  let lastTime = 0;

  let frameX = 0;
  let frameXL = Number(inputs[index].value) - 1;

  const spriteStates = Object.keys(spriteAnimations);
  const currentState = spriteStates[index];
  const sizeX = spriteAnimations[currentState].sizeX;
  const sizeY = spriteAnimations[currentState].sizeY;

  inputs[index].addEventListener("change", function () {
    const n = Number(inputs[index].value);
    frameXL = n - 1;
    spriteAnimations[currentState].loc.splice(n + 1);
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
