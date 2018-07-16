import {BaseMove} from "./alg-part"

// TODO: Move SiGN move defs into a separate file.
export type MoveFamily = string; // TODO: Convert to an enum with string mappings.

type FamilyList = { [s: string]: boolean; }

// TODO: Switch to `Set`?
var plainMoveFamilies: FamilyList = {
  "x": true,
  "y": true,
  "z": true,
  "M": true,
  "E": true,
  "S": true,
  "m": true,
  "e": true,
  "s": true
}

var singleSliceMoveFamilies: FamilyList = {
  "U": true,
  "L": true,
  "F": true,
  "R": true,
  "B": true,
  "D": true
}

var wideMoveFamilies: FamilyList = {
  "u": true,
  "l": true,
  "f": true,
  "r": true,
  "b": true,
  "d": true,
  "Uw": true,
  "Lw": true,
  "Fw": true,
  "Rw": true,
  "Bw": true,
  "Dw": true
}

var shouldAllowMoreMoveFamilies = false;
// TODO: Remove this after the parser and family definitions are robust.
export function allowMoreMoveFamilies(allow: boolean) {
  shouldAllowMoreMoveFamilies = allow;
}

function validateFamily(family: string, allowedFamilyLists: FamilyList[]): boolean {
  if (shouldAllowMoreMoveFamilies) {
    if (/^<[A-Za-z]+(_[A-Za-z]+)*>*$/.test(family)) {
      return true;
    }
    if (/^[a-z]|([A-Z]w?)$/.test(family)) {
      return true;
    }
  }

  for (var list of allowedFamilyLists) {
    if (list[family] === true) {
      return true;
    }
  }
  return false;
}

// Throws an error if the input does not validate.
function validateSiGNMove(outerLayer: number | undefined, innerLayer: number | undefined, family: string): void {
  if (typeof outerLayer !== "undefined") {
    if (typeof innerLayer === "undefined") {
      throw "A SiGNMove with an outer layer must have an inner layer.";
    }
    if (!validateFamily(family, [wideMoveFamilies])) {
      throw `The provided SiGN move family is invalid, or cannot have an outer and inner layer: ${family}`;
    }
    if (outerLayer <= 0) {
      throw "Cannot have an outer layer of 0 or less."
    }
    // TODO: Allow 2-2r?
    if (outerLayer >= innerLayer) {
      throw "The outer layer must be less than the inner layer."
    }
    return;
  } else if (typeof innerLayer !== "undefined") {
    if (!validateFamily(family, [wideMoveFamilies, singleSliceMoveFamilies])) {
      throw `The provided SiGN move family is invalid, or cannot have an inner slice: ${family}`;
    }
    if (innerLayer <= 0) {
      throw "Cannot have an inner layer of 0 or less."
    }
    return;
  } else {
    if (!validateFamily(family, [wideMoveFamilies, singleSliceMoveFamilies, plainMoveFamilies])) {
        throw `Invalid SiGN plain move family: ${family}`;
    }
    return;
  }
}

// TODO: Handle layers
export class SiGNMove extends BaseMove {
  public type: string = "signMove";

  // If `outerLayer` is set, `innerLayer` must also be set.
  public outerLayer?: number;
  public innerLayer?: number;
  constructor(outerLayer: number | undefined, innerLayer: number | undefined, public family: MoveFamily, amount?: number) {
    super(amount);

    validateSiGNMove(outerLayer, innerLayer, family);

    this.outerLayer = outerLayer;
    this.innerLayer = innerLayer;
    this.freeze();
  }
}

export function BareSiGNMove(family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(undefined, undefined, family, amount);
}

export function LayerSiGNMove(innerLayer: number, family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(undefined, innerLayer, family, amount);
}

export function RangeSiGNMove(outerLayer: number,innerLayer: number, family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(outerLayer, innerLayer, family, amount);
}
