import "./style.css";
import { dropdownElements, insertMyHTML } from "./utils";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
  const CANVAS_WIDTH = (canvas.width = 600);
  const CANVAS_HEIGHT = (canvas.height = 600);

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  let [sx, sy, sw, sh, dx, dy, dw, dh] = [0, 0, 600, 600, 0, 0, 600, 600];

  const playerImage = new Image();
  playerImage.src = "fruits.png";

  const dropdownSX = insertMyHTML(dropdownElements.SX);
  const dropdownSY = insertMyHTML(dropdownElements.SY);
  const dropdownSW = insertMyHTML(dropdownElements.SW);
  const dropdownSH = insertMyHTML(dropdownElements.SH);
  const dropdownDX = insertMyHTML(dropdownElements.DX);
  const dropdownDY = insertMyHTML(dropdownElements.DY);
  const dropdownDW = insertMyHTML(dropdownElements.DW);
  const dropdownDH = insertMyHTML(dropdownElements.DH);

  [
    dropdownSX,
    dropdownSY,
    dropdownSW,
    dropdownSH,
    dropdownDX,
    dropdownDY,
    dropdownDW,
    dropdownDH,
  ].forEach((element) => {
    element.addEventListener("change", function (e: Event) {
      const target = e.target as typeof e.target & {
        value: string;
      };
      switch (element.name) {
        case dropdownElements.SX:
          sx = Number(target.value); // typechecks!
          break;
        case dropdownElements.SY:
          sy = Number(target.value); // typechecks!
          break;
        case dropdownElements.SW:
          sw = Number(target.value); // typechecks!
          break;
        case dropdownElements.SH:
          sh = Number(target.value); // typechecks!
          break;
        case dropdownElements.DX:
          dx = Number(target.value); // typechecks!
          break;
        case dropdownElements.DY:
          dy = Number(target.value); // typechecks!
          break;
        case dropdownElements.DW:
          dw = Number(target.value); // typechecks!
          break;
        case dropdownElements.DH:
          dh = Number(target.value); // typechecks!
          break;
        default:
          console.error("bad happends");
          break;
      }
    });
  });

  function animate() {
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, sx, sy, sw, sh, dx, dy, dw, dh);

    requestAnimationFrame(animate);
  }
  animate();
});
