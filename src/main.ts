import "./style.css";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = 2400);
  const CANVAS_HEIGHT = (canvas.height = 1800);

  const playerImage = new Image();
  playerImage.src = "mad_dog.png";
  const spriteWidth = 200;
  const spriteHeight = 180;
  let frameX = 0;
  let frameY = 0;
  let gameFrame = 0;
  const reduceFrames = 4;

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      frameY * spriteHeight,
      spriteWidth,
      spriteHeight,
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    if (gameFrame % reduceFrames === 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
  }
  animate();
});
