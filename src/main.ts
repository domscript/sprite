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
  let frameInterval = 30;
  let frameTimer = 0;

  let lastTime = 0;

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;
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
    if (frameTimer < frameInterval) {
      frameTimer += deltaTimeInMilliseconds;
    } else {
      frameTimer = 0;
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
