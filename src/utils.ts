export enum dropdownElements {
  SX = "sx",
  SY = "sy",
  SW = "sw",
  SH = "sh",
  DX = "dx",
  DY = "dy",
  DW = "dw",
  DH = "dh",
}

export function insertMyHTML(elementID: dropdownElements) {
  const dropdown = document.getElementById(elementID) as HTMLSelectElement;

  const options = {
    [dropdownElements.SX]: ["0", "100", "200", "300", "400", "500", "600"],
    [dropdownElements.SY]: ["0", "100", "200", "300", "400", "500", "600"],
    [dropdownElements.SW]: ["600", "500", "400", "300", "200", "100", "50"],
    [dropdownElements.SH]: ["600", "500", "400", "300", "200", "100", "50"],
    [dropdownElements.DX]: ["0", "100", "200", "300", "400", "500", "600"],
    [dropdownElements.DY]: ["0", "100", "200", "300", "400", "500", "600"],
    [dropdownElements.DW]: ["600", "500", "400", "300", "200", "100", "50"],
    [dropdownElements.DH]: ["600", "500", "400", "300", "200", "100", "50"],
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
