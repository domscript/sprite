import "./style.css";
import { Game } from "./game";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const CANVAS_WIDTH = (canvas.width = 2400);
  const CANVAS_HEIGHT = (canvas.height = 1800);

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

  let lastTime = 0;

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    game.update(deltaTimeInMilliseconds);
    game.draw(ctx);

    requestAnimationFrame(animate);
  }
  animate();
});
