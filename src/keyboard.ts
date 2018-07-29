import {SiGNMove, BareSiGNMove} from "./algorithm"

const cubeKeyMapping: {[key: number]: SiGNMove} = {
  73: BareSiGNMove("R"), 75: BareSiGNMove("R", -1),
  87: BareSiGNMove("B"), 79: BareSiGNMove("B", -1),
  83: BareSiGNMove("D"), 76: BareSiGNMove("D", -1),
  68: BareSiGNMove("L"), 69: BareSiGNMove("L", -1),
  74: BareSiGNMove("U"), 70: BareSiGNMove("U", -1),
  72: BareSiGNMove("F"), 71: BareSiGNMove("F", -1), // Heise
  78: BareSiGNMove("F"), 86: BareSiGNMove("F", -1), //Kirjava

  67: BareSiGNMove("l"), 82: BareSiGNMove("l", -1),
  85: BareSiGNMove("r"), 77: BareSiGNMove("r", -1),

  84: BareSiGNMove("x"), 89: BareSiGNMove("x"), 66: BareSiGNMove("x", -1), // 84 (T) and 89 (Y) are alternatives.
  186: BareSiGNMove("y"), 59: BareSiGNMove("y"), 65: BareSiGNMove("y", -1), // 186 is WebKit, 59 is Mozilla; see http://unixpapa.com/js/key.html
  80: BareSiGNMove("z"), 81: BareSiGNMove("z", -1),

  190: BareSiGNMove("M", -1),
}

// TODO: options about whether to ignore modifier keys (e.g. alt, ctrl).
// TODO: Support different mappings.
// TODO: Return BaseMove instead?
export function keyToMove(e: KeyboardEvent): SiGNMove | null {
  if(e.altKey || e.ctrlKey) {
    return null;
  }

  return cubeKeyMapping[e.keyCode] || null;
}
