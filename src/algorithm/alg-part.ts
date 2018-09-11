import {CHECK_TYPES} from "../debug"

export abstract class AlgPart {
  type: string;
}

export abstract class Unit extends AlgPart {}

export abstract class Move extends Unit {}
export abstract class Annotation extends Unit {}
export abstract class Container extends Unit {}

// TODO: Reintroduce an Algorithm class, and allow a mutable sequence too?
export class Sequence extends AlgPart {
  public type: string = "sequence";
  constructor(public nestedUnits: Unit[]) {
    super();
    for (var n of nestedUnits) {
      if (CHECK_TYPES && !(n instanceof Unit)) {
        throw "A Sequence can only contain `Unit`s."
      }
    }
    Object.freeze(this.nestedUnits);
    Object.freeze(this);
  }
}

export interface WithAmount {
  // TODO: Allow `amount` to be `undefined`, to distinguish between R and R1?
  amount: number;
}

export class Group extends Container implements WithAmount {
  public type: string = "group";
  constructor(public nestedSequence: Sequence, public amount: number=1) {
    super();
    Object.freeze(this);
  }
}

export class Commutator extends Container implements WithAmount {
  public type: string = "commutator";
  constructor(public A: Sequence, public B: Sequence, public amount: number=1) {
    super();
    Object.freeze(this);
  }
}

export class Conjugate extends Container implements WithAmount {
  public type: string = "conjugate";
  constructor(public A: Sequence, public B: Sequence, public amount: number=1) {
    super();
    Object.freeze(this);
  }
}

export class Pause extends Move {
  public type: string = "pause";
  constructor() {
    super();
    Object.freeze(this);
  }
}

export class NewLine extends Annotation {
  public type: string = "newLine";
  constructor() {
    super();
    Object.freeze(this);
  }
}

// TODO: must be followed by a newline, unless at the end of an alg?
export class CommentShort extends Annotation {
  public type: string = "commentShort";
  constructor(public comment: string) {
    super();
    Object.freeze(this);
  }
}

export class CommentLong extends Annotation {
  public type: string = "commentLong";
  constructor(public comment: string) {
    super();
    Object.freeze(this);
  }
}

// TODO
// export class TimeStamp extends AlgPart implements AlgPart
