import {
  clone,
  invert,
  expand,
  countBaseMoves,
  coalesceMoves,
  algToString,
  structureEquals,
  concat
} from "./traversal"

"use strict";

export abstract class Algorithm {
  public readonly abstract type: string

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
  // are frozen after initial construction.
  protected freeze() {
    Object.freeze(this);
  }

  // clone():           Algorithm { return clone(this);           }
  // invert():          Algorithm { return invert(this);          }
  // expand():          Algorithm { return expand(this);          }
  // countBaseMoves():  number    { return countBaseMoves(this);  }
  // coalesceMoves():   Algorithm { return coalesceMoves(this);   }
  // toString():        string    { return algToString(this);     }

  // structureEquals(nestedAlg: Algorithm): boolean {
  //   return structureEquals(this, nestedAlg);
  // }
  // concat(nestedAlg: Algorithm): Sequence {
  //   return concat(this, nestedAlg);
  // }
}

export class Sequence extends Algorithm {
  public type: string = "sequence";
  constructor(public nestedAlgs: Algorithm[]) {
    super();
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export abstract class Repeatable extends Algorithm {
  // TODO: Make `amount` an optional argument in derived class constructors.
  constructor(public amount: number) {
    super();
  }
}

export type MoveFamily = string; // TODO: Convert to an enum with string mappings.

// Group is is like a Sequence, but is enclosed in parentheses when
// written.
export class Group extends Repeatable {
  public type: string = "group";
  constructor(public nestedAlg: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export abstract class BaseMove extends Repeatable {
}

var blockMoves: { [s: string]: boolean; } = {
  "U": true,
  "L": true,
  "F": true,
  "R": true,
  "B": true,
  "D": true
}

function validateBlockMove(family: string): boolean {
  return blockMoves[family] === true;
}

// TODO: Handle layers
export class BlockMove extends BaseMove {
  public type: string = "blockMove";
  constructor(public family: MoveFamily, amount: number) {
    super(amount);
    if (!validateBlockMove(family)) {
      throw `Invalid block move family: ${family}`;
    }
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class Commutator extends Repeatable {
  public type: string = "commutator";
  constructor(public A: Algorithm, public B: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class Conjugate extends Repeatable {
  public type: string = "conjugate";
  constructor(public A: Algorithm, public B: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class Pause extends Algorithm {
  public type: string = "pause";
  constructor() {
    super();
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class NewLine extends Algorithm {
  public type: string = "newLine";
  constructor() {
    super();
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class CommentShort extends Algorithm {
  public type: string = "commentShort";
  constructor(public comment: string) {
    super();
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

export class CommentLong extends Algorithm {
  public type: string = "commentLong";
  constructor(public comment: string) {
    super();
    this.freeze();
  }

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
}

// TODO
// export class TimeStamp extends Algorithm implements Algorithm
