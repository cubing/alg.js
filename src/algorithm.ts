
// TODO: Remove AlgPart and only have Sequence and Unit?
export abstract class AlgPart {
  public readonly abstract type: string

  // TODO: Figure out if we can statically enforce that all AlgPart subclasses
  // are frozen after initial construction.
  protected freeze() {
    Object.freeze(this);
  }
}

export abstract class Unit extends AlgPart {}

export abstract class Annotation extends Unit {}

export abstract class UnitWithAmount extends Unit {
  // TODO: Allow `amount` to be `undefined`, to distinguish between R and R1?
  constructor(public amount: number = 1) {
    super();
  }
}

export abstract class BaseMove extends UnitWithAmount {
}

// TODO: Reintroduce an Algorithm class, and allow a mutable sequence too?
export class Sequence extends AlgPart {
  public type: string = "sequence";
  constructor(public nestedUnits: Unit[]) {
    super();
    for (var n of nestedUnits) {
      if (!(n instanceof Unit)) {
        throw "A Sequence can only contain `Unit`s."
      }
    }
    Object.freeze(this.nestedUnits);
    this.freeze();
  }
}

export class Group extends UnitWithAmount {
  public type: string = "group";
  constructor(public nestedSequence: Sequence, amount?: number) {
    super(amount);
    this.freeze();
  }
}

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

var shouldValidateFamily = true;
// TODO: Remove this after the parser and family definitions are robust.
export function validateSiGNMoveFamily(validate: boolean) {
  shouldValidateFamily = validate;
}

function validateFamily(family: string, allowedFamilyLists: FamilyList[]): boolean {
  if (!shouldValidateFamily) {
    return true;
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

export class Commutator extends UnitWithAmount {
  public type: string = "commutator";
  constructor(public A: Sequence, public B: Sequence, amount?: number) {
    super(amount);
    this.freeze();
  }
}

export class Conjugate extends UnitWithAmount {
  public type: string = "conjugate";
  constructor(public A: Sequence, public B: Sequence, amount?: number) {
    super(amount);
    this.freeze();
  }
}

export class Pause extends Unit {
  public type: string = "pause";
  constructor() {
    super();
    this.freeze();
  }
}

export class NewLine extends Annotation {
  public type: string = "newLine";
  constructor() {
    super();
    this.freeze();
  }
}

// TODO: must be followed by a newline, unless at the end of an alg?
export class CommentShort extends Annotation {
  public type: string = "commentShort";
  constructor(public comment: string) {
    super();
    this.freeze();
  }
}

export class CommentLong extends Annotation {
  public type: string = "commentLong";
  constructor(public comment: string) {
    super();
    this.freeze();
  }
}

// TODO
// export class TimeStamp extends AlgPart implements AlgPart
