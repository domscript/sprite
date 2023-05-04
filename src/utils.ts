export type SpritesMapType = {
  [key: string]: {
    sizeX: number;
    sizeY: number;
    loc: { x: number; y: number }[];
  };
};

export function spriteMap({
  height,
  widht,
  rows,
  columns,
}: {
  height: number;
  widht: number;
  rows: number;
  columns: number;
}) {
  const spriteAnimations: SpritesMapType = {};
  const spriteWidth = widht / columns;
  const spriteHeight = height / rows;

  type SpritesType = {
    [key: string]: {
      maxX: number;
      lineY: number;
    };
  };

  const spritesMap: SpritesType = {};

  for (let i = 0; i < rows; ++i) {
    spritesMap[`state${i}`] = { maxX: columns, lineY: i };
  }

  Object.entries(spritesMap).forEach(([state, { maxX, lineY }]) => {
    const loc: { x: number; y: number }[] = [];
    for (let i = 0; i < maxX; ++i) {
      loc.push({ x: i * spriteWidth, y: lineY * spriteHeight });
    }
    spriteAnimations[state] = {
      sizeX: spriteWidth,
      sizeY: spriteHeight,
      loc,
    };
  });

  return spriteAnimations;
}

export const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
