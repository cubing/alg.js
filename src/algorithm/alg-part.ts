
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
