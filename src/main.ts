import "./style.css";
import { spriteAnimations } from "./utils";

window.addEventListener("load", () => {
  let playerState = "IDLE";
  const dropdown = document.getElementById("animations") as HTMLSelectElement;

  dropdown.insertAdjacentHTML(
    "afterbegin",
    Object.keys(spriteAnimations).reduce(
      (acc, el) =>
        (acc += `<option value="${el}">${el.toLowerCase()}</option>`),
      ""
    )
  );

  dropdown.addEventListener("change", function (e: Event) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    playerState = target.value; // typechecks!
  });

  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = 2400);
  const CANVAS_HEIGHT = (canvas.height = 1800);

  const playerImage = new Image();
  playerImage.src = "mad_dog.png";
  let frameInterval = 30;
  let frameTimer = 0;
  let lastTime = 0;
  let frameX = 0;
  let frameY = 0;

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;
    if (frameTimer < frameInterval) {
      frameTimer += deltaTimeInMilliseconds;
    } else {
      let frameXL = spriteAnimations[playerState].loc.length - 1;
      frameY = spriteAnimations[playerState].loc[0].y;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        playerImage,
        frameX * spriteAnimations[playerState].sizeX,
        frameY,
        spriteAnimations[playerState].sizeX,
        spriteAnimations[playerState].sizeY,
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
});
