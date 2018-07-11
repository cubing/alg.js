import {
  invert,
  expand,
  structureEquals,
  coalesceBaseMoves,
  algToString
} from "./traversal"

"use strict";

export abstract class Algorithm {
  public readonly abstract type: string

  // TODO: Figure out if we can statically enforce that all Algorithm subclasses
  // are frozen after initial construction.
  protected freeze() {
    Object.freeze(this);
  }
}

export abstract class Unit extends Algorithm {
  // TODO: Make `amount` an optional argument in derived class constructors.
  constructor(public amount: number) {
    super();
  }
}

export abstract class BaseMove extends Unit {
}

export class Sequence extends Algorithm {
  public type: string = "sequence";
  constructor(public nestedAlgs: Algorithm[]) {
    super();
    this.freeze();
  }
}

export class Group extends Unit {
  public type: string = "group";
  constructor(public nestedAlg: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }
}

export type MoveFamily = string; // TODO: Convert to an enum with string mappings.

var blockMoveFamilies: { [s: string]: boolean; } = {
  "U": true,
  "L": true,
  "F": true,
  "R": true,
  "B": true,
  "D": true
}

function validateBlockMove(family: string): boolean {
  return blockMoveFamilies[family] === true;
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
}

export class Commutator extends Unit {
  public type: string = "commutator";
  constructor(public A: Algorithm, public B: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }
}

export class Conjugate extends Unit {
  public type: string = "conjugate";
  constructor(public A: Algorithm, public B: Algorithm, amount: number) {
    super(amount);
    this.freeze();
  }
}

export class Pause extends Algorithm {
  public type: string = "pause";
  constructor() {
    super();
    this.freeze();
  }
}

export class NewLine extends Algorithm {
  public type: string = "newLine";
  constructor() {
    super();
    this.freeze();
  }
}

export class CommentShort extends Algorithm {
  public type: string = "commentShort";
  constructor(public comment: string) {
    super();
    this.freeze();
  }
}

export class CommentLong extends Algorithm {
  public type: string = "commentLong";
  constructor(public comment: string) {
    super();
    this.freeze();
  }
}

// TODO
// export class TimeStamp extends Algorithm implements Algorithm
