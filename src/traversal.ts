import {
  Algorithm,
  Unit,
  UnitWithAmount,
  BaseMove,
  Sequence,
  Group,
  MoveFamily,
  SiGNMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong
} from "./algorithm";

function dispatch<DataDown, DataUp>(t: TraversalDownUp<DataDown, DataUp>, algorithm: Algorithm, dataDown: DataDown): DataUp {
  switch (algorithm.type) {
    case "sequence":
      if (!(algorithm instanceof Sequence)) {
        throw `Algorithm is not an object of type Sequence despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseSequence(<Sequence >algorithm, dataDown);
    case "group":
      if (!(algorithm instanceof Group)) {
        throw `Algorithm is not an object of type Group despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseGroup(<Group >algorithm, dataDown);
    case "signMove":
      if (!(algorithm instanceof SiGNMove)) {
        throw `Algorithm is not an object of type SiGNMove despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseSiGNMove(<SiGNMove >algorithm, dataDown);
    case "commutator":
      if (!(algorithm instanceof Commutator)) {
        throw `Algorithm is not an object of type Commutator despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseCommutator (<Commutator>algorithm, dataDown);
    case "conjugate":
      if (!(algorithm instanceof Conjugate)) {
        throw `Algorithm is not an object of type Conjugate despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseConjugate(<Conjugate >algorithm, dataDown);
    case "pause":
      if (!(algorithm instanceof Pause)) {
        throw `Algorithm is not an object of type Pause despite having "type": \"${algorithm.type}\"`
      }
      return t.traversePause(<Pause>algorithm, dataDown);
    case "newLine":
      if (!(algorithm instanceof NewLine)) {
        throw `Algorithm is not an object of type NewLine despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseNewLine(<NewLine >algorithm, dataDown);
    case "commentShort":
      if (!(algorithm instanceof CommentShort)) {
        throw `Algorithm is not an object of type CommentShort despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseCommentShort (<CommentShort>algorithm, dataDown);
    case "commentLong":
      if (!(algorithm instanceof CommentLong)) {
        throw `Algorithm is not an object of type CommentLong despite having "type": \"${algorithm.type}\"`
      }
      return t.traverseCommentLong (<CommentLong>algorithm, dataDown);
    default: 
      throw `Unknown algorithm type: ${algorithm.type}`
  }
}

export abstract class TraversalDownUp<DataDown, DataUp> {
  // Immediate subclasses should overwrite this.
  public traverse(algorithm: Algorithm, dataDown: DataDown): DataUp {
    return dispatch(this, algorithm, dataDown);
  }

  public traverseIntoUnit(algorithm: Algorithm, dataDown: DataDown): Unit {
    var out = this.traverse(algorithm, dataDown);
    if (!(out instanceof Unit)) {
      throw "Traversal did not produce a unit as expected."
    }
    return <Unit>out;
  }

  public abstract traverseSequence(sequence: Sequence, dataDown: DataDown): DataUp;
  public abstract traverseGroup(group: Group, dataDown: DataDown): DataUp;
  public abstract traverseSiGNMove(signMove: SiGNMove, dataDown: DataDown): DataUp;
  public abstract traverseCommutator(commutator: Commutator, dataDown: DataDown): DataUp;
  public abstract traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataUp;
  public abstract traversePause(pause: Pause, dataDown: DataDown): DataUp;
  public abstract traverseNewLine(newLine: NewLine, dataDown: DataDown): DataUp;
  public abstract traverseCommentShort(commentShort: CommentShort, dataDown: DataDown): DataUp;
  public abstract traverseCommentLong(commentLong: CommentLong, dataDown: DataDown): DataUp;
}

export abstract class TraversalUp<DataUp> extends TraversalDownUp<undefined, DataUp> {
  public traverse(algorithm: Algorithm): DataUp {
    return dispatch<undefined, DataUp>(this, algorithm, undefined);
  }

  public traverseIntoUnit(algorithm: Algorithm): Unit {
    var out = this.traverse(algorithm);
    if (!(out instanceof Unit)) {
      throw "Traversal did not produce a unit as expected."
    }
    return <Unit>out;
  }

  public abstract traverseSequence(sequence: Sequence): DataUp;
  public abstract traverseGroup(group: Group): DataUp;
  public abstract traverseSiGNMove(signMove: SiGNMove): DataUp;
  public abstract traverseCommutator(commutator: Commutator): DataUp;
  public abstract traverseConjugate(conjugate: Conjugate): DataUp;
  public abstract traversePause(pause: Pause): DataUp;
  public abstract traverseNewLine(newLine: NewLine): DataUp;
  public abstract traverseCommentShort(commentShort: CommentShort): DataUp;
  public abstract traverseCommentLong(commentLong: CommentLong): DataUp;
};

// TODO: Test that inverses are bijections.
export class Invert extends TraversalUp<Algorithm> {
  public traverseSequence(sequence: Sequence): Sequence {
    // TODO: Handle newLines and comments correctly
    return new Sequence(sequence.nestedAlgs.slice().reverse().map(a => this.traverseIntoUnit(a)));
  }
  public traverseGroup(group: Group): Algorithm {
    return new Group(this.traverse(group.nestedAlg), group.amount);
  }
  public traverseSiGNMove(signMove: SiGNMove): Algorithm {
    return new SiGNMove(signMove.outerLayer, signMove.innerLayer, signMove.family, -signMove.amount);
  }
  public traverseCommutator(commutator: Commutator): Algorithm {
    return new Commutator(commutator.B, commutator.A, commutator.amount);
  }
  public traverseConjugate(conjugate: Conjugate): Algorithm {
    return new Conjugate(conjugate.A, this.traverse(conjugate.B), conjugate.amount);
  }
  public traversePause(pause: Pause):                      Algorithm { return pause; }
  public traverseNewLine(newLine: NewLine):                Algorithm { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): Algorithm { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    Algorithm { return commentLong; }
}

export class Expand extends TraversalUp<Algorithm> {
  private flattenSequenceOneLevel(algList: Algorithm[]): Unit[] {
    var flattened: Unit[] = [];
    for (var part of algList) {
      if (part instanceof Sequence) {
        flattened = flattened.concat(part.nestedAlgs);
      } else if (part instanceof Unit) {
        flattened.push(part)
      } else {
        throw "expand() encountered an internal error. Did you pass in a valid Algorithm?"
      }
    }
    return flattened;
  }

  private repeat(algList: Unit[], accordingTo: UnitWithAmount): Sequence {
    var amount = Math.abs(accordingTo.amount);
    var amountDir = (accordingTo.amount > 0) ? 1 : -1; // Mutable

    // TODO: Cleaner inversion
    var once: Unit[];
    if (amountDir == -1) {
      // TODO: Avoid casting to sequence.
      once = (<Sequence>(invert(new Sequence(algList)))).nestedAlgs;
    } else {
      once = algList;
    }

    var repeated: Unit[] = [];
    for (var i = 0; i < amount; i++) {
      repeated = repeated.concat(once);
    }

    return new Sequence(repeated);
  }

  public traverseSequence(sequence: Sequence): Sequence {
    return new Sequence(this.flattenSequenceOneLevel(sequence.nestedAlgs.map(a => this.traverse(a))));
  }
  public traverseGroup(group: Group): Algorithm {
    // TODO: Pass raw Algorithm[] to sequence.
    return this.repeat(this.flattenSequenceOneLevel([this.traverse(group.nestedAlg)]), group);
  }
  public traverseSiGNMove(signMove: SiGNMove): Algorithm {
    return signMove;
  }
  public traverseCommutator(commutator: Commutator): Algorithm {
    var expandedA = this.traverse(commutator.A)
    var expandedB = this.traverse(commutator.B)
    var once: Algorithm[] = [];
    once = once.concat(
      expandedA,
      expandedB,
      invert(expandedA),
      invert(expandedB)
    );
    return this.repeat(this.flattenSequenceOneLevel(once), commutator);
  }
  public traverseConjugate(conjugate: Conjugate): Algorithm {
    var expandedA = this.traverse(conjugate.A)
    var expandedB = this.traverse(conjugate.B)
    var once: Algorithm[] = [];
    once = once.concat(
      expandedA,
      expandedB,
      invert(expandedA)
    );
    return this.repeat(this.flattenSequenceOneLevel(once), conjugate);
  }
  public traversePause(pause: Pause):                      Algorithm { return pause; }
  public traverseNewLine(newLine: NewLine):                Algorithm { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): Algorithm { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    Algorithm { return commentLong; }
}

export class StructureEquals extends TraversalDownUp<Algorithm, boolean> {
  public traverseSequence(sequence: Sequence, dataDown: Algorithm): boolean {
    if (!(dataDown instanceof Sequence)) {
      return false;
    }
    if (sequence.nestedAlgs.length !== dataDown.nestedAlgs.length) {
      return false;
    }
    for (var i = 0; i < sequence.nestedAlgs.length; i++) {
      if (!this.traverse(sequence.nestedAlgs[i], dataDown.nestedAlgs[i])) {
        return false;
      }
    }
    return true;
  }
  public traverseGroup(group: Group, dataDown: Algorithm): boolean {
    return (dataDown instanceof Group) && this.traverse(group.nestedAlg, dataDown.nestedAlg);
  }
  public traverseSiGNMove(signMove: SiGNMove, dataDown: Algorithm): boolean {
    // TODO: Handle layers.
    return dataDown instanceof SiGNMove &&
           signMove.outerLayer === dataDown.outerLayer &&
           signMove.innerLayer === dataDown.innerLayer &&
           signMove.family === dataDown.family &&
           signMove.amount === dataDown.amount;
  }
  public traverseCommutator(commutator: Commutator, dataDown: Algorithm): boolean {
    return (dataDown instanceof Commutator) &&
           this.traverse(commutator.A, dataDown.A) &&
           this.traverse(commutator.B, dataDown.B);
  }
  public traverseConjugate(conjugate: Conjugate, dataDown: Algorithm): boolean {
    return (dataDown instanceof Conjugate) &&
           this.traverse(conjugate.A, dataDown.A) &&
           this.traverse(conjugate.B, dataDown.B);
  }
  public traversePause(pause: Pause, dataDown: Algorithm): boolean {
    return dataDown instanceof Pause;
  }
  public traverseNewLine(newLine: NewLine, dataDown: Algorithm): boolean {
    return dataDown instanceof NewLine;
  }
  public traverseCommentShort(commentShort: CommentShort, dataDown: Algorithm): boolean {
    return (dataDown instanceof CommentShort) && (commentShort.comment == dataDown.comment);
  }
  public traverseCommentLong(commentLong: CommentLong, dataDown: Algorithm): boolean {
    return (dataDown instanceof CommentLong) && (commentLong.comment == dataDown.comment);
  }
}

// TODO: Test that inverses are bijections.
export class CoalesceBaseMoves extends TraversalUp<Algorithm> {
  private sameBlock(moveA: SiGNMove, moveB: SiGNMove): boolean {
    // TODO: Handle layers
    return moveA.outerLayer === moveB.outerLayer &&
           moveA.innerLayer === moveB.innerLayer &&
           moveA.family === moveB.family;
  }

  // TODO: Handle
  public traverseSequence(sequence: Sequence): Sequence {
    var coalesced: Unit[] = [];
    for (var part of sequence.nestedAlgs) {
      if (!(part instanceof SiGNMove)) {
        coalesced.push(this.traverseIntoUnit(part));
      } else if (coalesced.length > 0) {
        var last = coalesced[coalesced.length-1];
        if (last instanceof SiGNMove &&
            this.sameBlock(last, part)) {
          // TODO: This is cube-specific. Perhaps pass the modules as DataDown?
          var amount = last.amount + part.amount;
          coalesced.pop();
          if (amount !== 0) {
            // We could modify the last element instead of creating a new one,
            // but this is safe against shifting coding practices.
            // TODO: Figure out if the shoot-in-the-foot risk
            // modification is worth the speed.
            coalesced.push(new SiGNMove(part.outerLayer, part.innerLayer, part.family, amount));
          }
        } else {
          coalesced.push(part);
        }
      } else {
        coalesced.push(part);
      }
    }
    return new Sequence(coalesced);
  }
  public traverseGroup(group: Group):                      Algorithm { return group; }
  public traverseSiGNMove(signMove: SiGNMove):             Algorithm { return signMove; }
  public traverseCommutator(commutator: Commutator):       Algorithm { return commutator; }
  public traverseConjugate(conjugate: Conjugate):          Algorithm { return conjugate; }
  public traversePause(pause: Pause):                      Algorithm { return pause; }
  public traverseNewLine(newLine: NewLine):                Algorithm { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): Algorithm { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    Algorithm { return commentLong; }
}

// export class Concat extends TraversalDownUp<Algorithm, Sequence> {
//   private concatIntoSequence(A: Algorithm[], B: Algorithm): Sequence {
//     var nestedAlgs: Algorithm[] = A.slice();
//     if (B instanceof Sequence) {
//       nestedAlgs = nestedAlgs.concat(B.nestedAlgs)
//     } else {
//       nestedAlgs.push(B);
//     }
//     return new Sequence(nestedAlgs)
//   }
//   public traverseSequence(     sequence:     Sequence,     dataDown: Algorithm): Sequence {return this.concatIntoSequence(sequence.nestedAlgs, dataDown); }
//   public traverseGroup(        group:        Group,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([group]          , dataDown); }
//   public traverseSiGNMove(    SiGNMove:    SiGNMove,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([SiGNMove]      , dataDown); }
//   public traverseCommutator(   commutator:   Commutator,   dataDown: Algorithm): Sequence {return this.concatIntoSequence([commutator]     , dataDown); }
//   public traverseConjugate(    conjugate:    Conjugate,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([conjugate]      , dataDown); }
//   public traversePause(        pause:        Pause,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([pause]          , dataDown); }
//   public traverseNewLine(      newLine:      NewLine,      dataDown: Algorithm): Sequence {return this.concatIntoSequence([newLine]        , dataDown); }
//   public traverseCommentShort( commentShort: CommentShort, dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentShort]   , dataDown); }
//   public traverseCommentLong(  commentLong:  CommentLong,  dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentLong]    , dataDown); }
// }

export class ToString extends TraversalUp<string> {
  private repetitionSuffix(amount: number): string {
    var absAmount = Math.abs(amount);
    var s = "";
    if (absAmount !== 1) {
      s += String(absAmount)
    }
    if (absAmount !== amount) {
      s += "'"
    }
    return s;
  }

  private spaceBetween(u1: Unit, u2: Unit): string {
    if (u1 instanceof Pause && u2 instanceof Pause) {
      return ""
    }
    return " "
  }

  public traverseSequence(sequence: Sequence): string {
    var output = "";
    output += this.traverse(sequence.nestedAlgs[0]);
    for (var i = 1; i < sequence.nestedAlgs.length; i++) {
      output += this.spaceBetween(sequence.nestedAlgs[i-1], sequence.nestedAlgs[i]);
      output += this.traverse(sequence.nestedAlgs[i]);
    }
    return output;
  }
  public traverseGroup(        group:        Group       ): string { return "(" + this.traverse(group.nestedAlg) + ")" + this.repetitionSuffix(group.amount); }
  public traverseSiGNMove(     signMove:     SiGNMove    ): string {
    var out = signMove.family + this.repetitionSuffix(signMove.amount);
    if (typeof signMove.innerLayer !== "undefined") {
      out = String(signMove.innerLayer) + out;
      if (typeof signMove.outerLayer !== "undefined") {
        out = String(signMove.outerLayer) + "-" + out;
      }
    }
    return out;
  }
  public traverseCommutator(   commutator:   Commutator  ): string { return "[" + this.traverse(commutator.A) + ", " + this.traverse(commutator.B) + "]" + this.repetitionSuffix(commutator.amount); }
  public traverseConjugate(    conjugate:    Conjugate   ): string { return "[" + this.traverse(conjugate.A) + ": " + this.traverse(conjugate.B) + "]" + this.repetitionSuffix(conjugate.amount); }
  // TODO: Remove spaces between repeated pauses (in traverseSequence)
  public traversePause(        pause:        Pause       ): string { return "."; }
  public traverseNewLine(      newLine:      NewLine     ): string { return "\n"; }
  // TODO: Enforce being followed by a newline (or the end of the alg)?
  public traverseCommentShort( commentShort: CommentShort): string { return "//" + commentShort.comment; }
    // TODO: Sanitize `*/`
  public traverseCommentLong(  commentLong:  CommentLong ): string { return "/*" + commentLong.comment + "*/"; }
}

function makeDownUp<DataDown, DataUp>(
  ctor: { new(): TraversalDownUp<DataDown, DataUp> }
 ): (a: Algorithm, dataDown: DataDown) => DataUp {
  var instance = new ctor();
  return instance.traverse.bind(instance);
}

function makeUp<DataUp>(
  ctor: { new(): TraversalUp<DataUp> }
 ): (a: Algorithm) => DataUp {
  var instance = new ctor();
  return instance.traverse.bind(instance);
}

export const invert            = makeUp(Invert);
export const expand            = makeUp(Expand);
export const structureEquals   = makeDownUp(StructureEquals);
export const coalesceBaseMoves = makeUp(CoalesceBaseMoves);
export const algToString       = makeUp(ToString);
