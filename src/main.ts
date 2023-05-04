import "./style.css";
import { spriteMap, copyContent } from "./utils";
import { canvasHandler } from "./canvas";
window.addEventListener("load", () => {
  const size = 100;
  const input = document.querySelector("#file") as HTMLInputElement;
  const rows = document.querySelector("#rows") as HTMLInputElement;
  const colomns = document.querySelector("#colomns") as HTMLInputElement;
  const button = document.getElementsByTagName("button")[0];
  const canvasesContainer = document.getElementById(
    "canvases"
  ) as HTMLDivElement;

  input!.addEventListener("change", function () {
    const file = this.files;
    if (!file) return;
    spriteImageURL = `${URL.createObjectURL(file[0])}`;
    playerImage = new Image();
    playerImage.src = spriteImageURL;
  });

  let spriteImageURL = "mad_dog.png";
  let playerImage = new Image();
  playerImage.src = spriteImageURL;
  let spriteAnimations = spriteMap({
    height: playerImage.height,
    widht: playerImage.width,
    rows: Number(rows.value),
    columns: Number(colomns.value),
  });

  button.addEventListener("click", async function () {
    let text = `export const SpritesMap = `;
    text += await JSON.stringify(spriteAnimations);
    copyContent(text);
  });

  [rows, colomns].forEach((el: HTMLInputElement) => {
    el.addEventListener("change", function () {
      spriteAnimations = spriteMap({
        height: playerImage.height,
        widht: playerImage.width,
        rows: Number(rows.value),
        columns: Number(colomns.value),
      });

      canvasesContainer.innerHTML = Object.keys(spriteAnimations).reduce(
        (acc, el: keyof typeof spriteAnimations) =>
          (acc += `<div class="grid_row"><canvas id="c-${el}" width="${size}" height="${size}"></canvas><label for="${el}">${el}: numbers of frames</label><input 
        class="inputCol" type="number" min="1" max="100" step="1" value="${spriteAnimations[el].loc.length}" id="${el}" /></div>`),
        ""
      );

      const canvases = document.getElementsByTagName("canvas");
      const inputs = document.getElementsByClassName(
        "inputCol"
      ) as HTMLCollectionOf<HTMLInputElement>;

      [...canvases].forEach((canvas, index) => {
        canvasHandler(
          canvas,
          inputs,
          index,
          spriteAnimations,
          playerImage,
          size
        );
      });
    });
  });
});
