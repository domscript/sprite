import "./style.css";
import { SpritesMap } from "./spritesMap";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const CANVAS_WIDTH = (canvas.width = 2400);
  const CANVAS_HEIGHT = (canvas.height = 1800);

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const dropdown = document.getElementById("animations") as HTMLSelectElement;
  const dropdownSize = document.getElementById("size") as HTMLSelectElement;
  const dropdownGround = document.getElementById("ground") as HTMLSelectElement;

  let playerState = Object.keys(SpritesMap)[0] as keyof typeof SpritesMap;
  let scale = 1;
  let groundMargin = 0;

  dropdown.insertAdjacentHTML(
    "afterbegin",
    Object.keys(SpritesMap).reduce(
      (acc, el) =>
        (acc += `<option value="${el}">${el.toLowerCase()}</option>`),
      ""
    )
  );

  dropdownSize.insertAdjacentHTML(
    "afterbegin",
    [1, 0.8, 0.6, 0.4, 0.2].reduce(
      (acc, el) =>
        (acc += `<option def value="${el}">${String(
          el
        ).toLowerCase()}</option>`),
      ""
    )
  );

  dropdownGround.insertAdjacentHTML(
    "afterbegin",
    [0, 100, 200, 300, 400, 500].reduce(
      (acc, el) =>
        (acc += `<option value="${el}">${String(el).toLowerCase()}</option>`),
      ""
    )
  );

  dropdown.addEventListener("change", function (e: Event) {
    const target = e.target as typeof e.target & {
      value: keyof typeof SpritesMap;
    };
    playerState = target.value; // typechecks!
  });

  dropdownSize.addEventListener("change", function (e: Event) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    scale = Number(target.value); // typechecks!
  });

  dropdownGround.addEventListener("change", function (e: Event) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    groundMargin = Number(target.value); // typechecks!
  });

  const playerImage = new Image();
  playerImage.src = "white_dog.png";
  let frameInterval = 30;
  let frameTimer = 0;
  let lastTime = 0;
  let frame = 0;

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;

    const sizeX = SpritesMap[playerState].sizeX;
    const sizeY = SpritesMap[playerState].sizeY;
    let frameMax = SpritesMap[playerState].loc.length - 1;

    if (frameTimer < frameInterval) {
      frameTimer += deltaTimeInMilliseconds;
    } else {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        playerImage,
        SpritesMap[playerState].loc[frame].x,
        SpritesMap[playerState].loc[frame].y,
        sizeX,
        sizeY,
        (CANVAS_WIDTH * (1 - scale)) / 2,
        CANVAS_HEIGHT * (1 - scale) - groundMargin,
        CANVAS_WIDTH * scale,
        CANVAS_HEIGHT * scale
      );
      frameTimer = 0;
      if (frame < frameMax) frame++;
      else frame = 0;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
