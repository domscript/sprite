import "./style.css";
import { SpritesMap } from "./spritesMap";
import { dropdownElements, insertMyHTML } from "./utils";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const CANVAS_WIDTH = (canvas.width = 2400);
  const CANVAS_HEIGHT = (canvas.height = 1800);

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  let playerState = Object.keys(SpritesMap)[0] as keyof typeof SpritesMap;
  let scale = 1;
  let groundMargin = 0;

  const playerImage = new Image();
  playerImage.src = "tablet_small.png";
  let frameInterval = 30;
  let frameTimer = 0;
  let lastTime = 0;
  let frame = 0;
  let frameMax = SpritesMap[playerState].loc.length - 1;

  const dropdown = insertMyHTML(dropdownElements.ANIMATION);
  const dropdownSize = insertMyHTML(dropdownElements.SIZE);
  const dropdownGround = insertMyHTML(dropdownElements.GROUND);

  [dropdown, dropdownSize, dropdownGround].forEach((element) => {
    element.addEventListener("change", function (e: Event) {
      const target = e.target as typeof e.target & {
        value: keyof typeof SpritesMap;
      };
      switch (element.name) {
        case dropdownElements.ANIMATION:
          playerState = target.value; // typechecks!
          frame = 0;
          frameMax = SpritesMap[playerState].loc.length - 1;
          break;
        // TODO :
        case dropdownElements.SIZE:
          scale = Number(target.value); // error typechecks
          break;
        case dropdownElements.GROUND:
          groundMargin = Number(target.value); // error typechecks
          break;
        default:
          console.error("bad happends");
          break;
      }
    });
  });

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;

    if (frameTimer < frameInterval) {
      frameTimer += deltaTimeInMilliseconds;
    } else {
      frameTimer = 0;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        playerImage,
        SpritesMap[playerState].loc[frame].x,
        SpritesMap[playerState].loc[frame].y,
        SpritesMap[playerState].sizeX,
        SpritesMap[playerState].sizeY,
        (CANVAS_WIDTH * (1 - scale)) / 2,
        CANVAS_HEIGHT * (1 - scale) - groundMargin,
        CANVAS_WIDTH * scale,
        CANVAS_HEIGHT * scale
      );
      if (frame < frameMax) frame++;
      else frame = 0;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
