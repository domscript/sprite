import { SpritesMap } from "./spritesMap";

export enum dropdownElements {
  ANIMATION = "animations",
  SIZE = "size",
  GROUND = "ground",
}

export function insertMyHTML(elementID: dropdownElements) {
  const dropdown = document.getElementById(elementID) as HTMLSelectElement;

  const options = {
    [dropdownElements.ANIMATION]: Object.keys(SpritesMap),
    [dropdownElements.SIZE]: ["1", "0.8", "0.6", "0.4", "0.2"],
    [dropdownElements.GROUND]: ["0", "100", "200", "300", "400", "500"],
  };

  dropdown.insertAdjacentHTML(
    "afterbegin",
    options[elementID].reduce(
      (acc, el) =>
        (acc += `<option value="${el}">${el.toLowerCase()}</option>`),
      ""
    )
  );

  return dropdown;
}
