import {Algorithm, Sequence, BlockMove, Commutator, Group, Conjugate, Pause, NewLine, CommentShort, CommentLong, Repeatable} from "./algorithm"

"use strict";

function dispatch<DataDown, DataUp>(t: DownUp<DataDown, DataUp>, algorithm: Algorithm, dataDown: DataDown): DataUp {
  switch (algorithm.type) {
    case "sequence":
      if (!(algorithm instanceof Sequence)) {
        throw "Algorithm is not an object of type Sequence despite having `type`: ${algorithm.type}"
      }
      return t.traverseSequence(<Sequence >algorithm, dataDown);
    case "group":
      if (!(algorithm instanceof Group)) {
        throw "Algorithm is not an object of type Group despite having `type`: ${algorithm.type}"
      }
      return t.traverseGroup(<Group >algorithm, dataDown);
    case "blockMove":
      if (!(algorithm instanceof BlockMove)) {
        throw "Algorithm is not an object of type BlockMove despite having `type`: ${algorithm.type}"
      }
      return t.traverseBlockMove(<BlockMove >algorithm, dataDown);
    case "commutator":
      if (!(algorithm instanceof Commutator)) {
        throw "Algorithm is not an object of type Commutator despite having `type`: ${algorithm.type}"
      }
      return t.traverseCommutator (<Commutator>algorithm, dataDown);
    case "conjugate":
      if (!(algorithm instanceof Conjugate)) {
        throw "Algorithm is not an object of type Conjugate despite having `type`: ${algorithm.type}"
      }
      return t.traverseConjugate(<Conjugate >algorithm, dataDown);
    case "pause":
      if (!(algorithm instanceof Pause)) {
        throw "Algorithm is not an object of type Pause despite having `type`: ${algorithm.type}"
      }
      return t.traversePause(<Pause>algorithm, dataDown);
    case "newLine":
      if (!(algorithm instanceof NewLine)) {
        throw "Algorithm is not an object of type NewLine despite having `type`: ${algorithm.type}"
      }
      return t.traverseNewLine(<NewLine >algorithm, dataDown);
    case "commentShort":
      if (!(algorithm instanceof CommentShort)) {
        throw "Algorithm is not an object of type CommentShort despite having `type`: ${algorithm.type}"
      }
      return t.traverseCommentShort (<CommentShort>algorithm, dataDown);
    case "commentLong":
      if (!(algorithm instanceof CommentLong)) {
        throw "Algorithm is not an object of type CommentLong despite having `type`: ${algorithm.type}"
      }
      return t.traverseCommentLong (<CommentLong>algorithm, dataDown);
    default: 
      throw `Unknown algorithm type: ${algorithm.type}`
  }
}

export abstract class DownUp<DataDown, DataUp> {
  public traverse(algorithm: Algorithm, dataDown: DataDown): DataUp {
    return dispatch(this, algorithm, dataDown);
  }
  // Immediate subclasses should overwrite this.

  public abstract traverseSequence(sequence: Sequence, dataDown: DataDown): DataUp;
  public abstract traverseGroup(group: Group, dataDown: DataDown): DataUp;
  public abstract traverseBlockMove(blockMove: BlockMove, dataDown: DataDown): DataUp;
  public abstract traverseCommutator(commutator: Commutator, dataDown: DataDown): DataUp;
  public abstract traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataUp;
  public abstract traversePause(pause: Pause, dataDown: DataDown): DataUp;
  public abstract traverseNewLine(newLine: NewLine, dataDown: DataDown): DataUp;
  public abstract traverseCommentShort(commentShort: CommentShort, dataDown: DataDown): DataUp;
  public abstract traverseCommentLong(commentLong: CommentLong, dataDown: DataDown): DataUp;
}

export abstract class Up<DataUp> extends DownUp<undefined, DataUp> {
  public traverse(algorithm: Algorithm): DataUp {
    return dispatch<undefined, DataUp>(this, algorithm, undefined);
  }

  public abstract traverseSequence(sequence: Sequence): DataUp;
  public abstract traverseGroup(group: Group): DataUp;
  public abstract traverseBlockMove(blockMove: BlockMove): DataUp;
  public abstract traverseCommutator(commutator: Commutator): DataUp;
  public abstract traverseConjugate(conjugate: Conjugate): DataUp;
  public abstract traversePause(pause: Pause): DataUp;
  public abstract traverseNewLine(newLine: NewLine): DataUp;
  public abstract traverseCommentShort(commentShort: CommentShort): DataUp;
  public abstract traverseCommentLong(commentLong: CommentLong): DataUp;
};

// TODO: Test that inverses are bijections.
export class Invert extends Up<Algorithm> {
  public traverseSequence(sequence: Sequence): Sequence {
    // TODO: Handle newLines and comments correctly
    return new Sequence(sequence.nestedAlgs.slice().reverse().map(a => this.traverse(a)));
  }
  public traverseGroup(group: Group): Algorithm {
    return new Group(this.traverse(group.nestedAlg), group.amount);
  }
  public traverseBlockMove(blockMove: BlockMove): Algorithm {
    return new BlockMove(blockMove.family, -blockMove.amount);
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

export class Expand extends Up<Algorithm> {
  private flattenSequenceOneLevel(algList: Algorithm[]): Algorithm[] {
    var flattened: Algorithm[] = [];
    for (var part of algList) {
      if (part instanceof Sequence) {
        flattened = flattened.concat(part.nestedAlgs);
      } else {
        flattened.push(part)
      }
    }
    return flattened;
  }

  private repeat(algList: Algorithm[], accordingTo: Repeatable): Sequence {
    var amount = Math.abs(accordingTo.amount);
    var amountDir = (accordingTo.amount > 0) ? 1 : -1; // Mutable

    // TODO: Cleaner inversion
    var once: Algorithm[];
    if (amountDir == -1) {
      // TODO: Avoid casting to sequence.
      once = (<Sequence>(invert(new Sequence(algList)))).nestedAlgs;
    } else {
      once = algList;
    }

    var repeated: Algorithm[] = [];
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
    return this.repeat([this.traverse(group.nestedAlg)], group);
  }
  public traverseBlockMove(blockMove: BlockMove): Algorithm {
    return blockMove;
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

export class StructureEquals extends DownUp<Algorithm, boolean> {
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
  public traverseBlockMove(blockMove: BlockMove, dataDown: Algorithm): boolean {
    // TODO: Handle layers.
    return dataDown instanceof BlockMove &&
           blockMove.family === dataDown.family &&
           blockMove.amount === dataDown.amount;
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
    return (dataDown instanceof CommentShort) && (commentLong.comment == dataDown.comment);
  }
}

// TODO: Test that inverses are bijections.
export class CoalesceBaseMoves extends Up<Algorithm> {
  private sameBlock(moveA: BlockMove, moveB: BlockMove): boolean {
    // TODO: Handle layers
    return moveA.family === moveB.family;
  }

  // TODO: Handle
  public traverseSequence(sequence: Sequence): Sequence {
    var coalesced: Algorithm[] = [];
    for (var part of sequence.nestedAlgs) {
      if (!(part instanceof BlockMove)) {
        coalesced.push(this.traverse(part));
      } else if (coalesced.length > 0) {
        var last = coalesced[coalesced.length-1];
        if (last instanceof BlockMove &&
            this.sameBlock(last, part)) {
          // TODO: This is cube-specific. Perhaps pass the modules as DataDown?
          var amount = last.amount + part.amount;
          coalesced.pop();
          if (amount !== 0) {
            // We could modify the last element instead of creating a new one,
            // but this is safe against shifting coding practices.
            // TODO: Figure out if the shoot-in-the-foot risk
            // modification is worth the speed.
            coalesced.push(new BlockMove(part.family, amount));
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
  public traverseBlockMove(blockMove: BlockMove):          Algorithm { return blockMove; }
  public traverseCommutator(commutator: Commutator):       Algorithm { return commutator; }
  public traverseConjugate(conjugate: Conjugate):          Algorithm { return conjugate; }
  public traversePause(pause: Pause):                      Algorithm { return pause; }
  public traverseNewLine(newLine: NewLine):                Algorithm { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): Algorithm { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    Algorithm { return commentLong; }
}

// export class Concat extends DownUp<Algorithm, Sequence> {
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
//   public traverseBlockMove(    BlockMove:    BlockMove,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([BlockMove]      , dataDown); }
//   public traverseCommutator(   commutator:   Commutator,   dataDown: Algorithm): Sequence {return this.concatIntoSequence([commutator]     , dataDown); }
//   public traverseConjugate(    conjugate:    Conjugate,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([conjugate]      , dataDown); }
//   public traversePause(        pause:        Pause,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([pause]          , dataDown); }
//   public traverseNewLine(      newLine:      NewLine,      dataDown: Algorithm): Sequence {return this.concatIntoSequence([newLine]        , dataDown); }
//   public traverseCommentShort( commentShort: CommentShort, dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentShort]   , dataDown); }
//   public traverseCommentLong(  commentLong:  CommentLong,  dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentLong]    , dataDown); }
// }

export class ToString extends Up<string> {
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
  public traverseSequence(     sequence:     Sequence,     ): string { return sequence.nestedAlgs.map(a => this.traverse(a)).join(" "); }
  public traverseGroup(        group:        Group,        ): string { return "(" + group.nestedAlg + ")" + this.repetitionSuffix(group.amount); }
  public traverseBlockMove(    blockMove:    BlockMove,    ): string { return blockMove.family + this.repetitionSuffix(blockMove.amount); }
  public traverseCommutator(   commutator:   Commutator,   ): string { return "[" + this.traverse(commutator.A) + ", " + this.traverse(commutator.B) + "]" + this.repetitionSuffix(commutator.amount); }
  public traverseConjugate(    conjugate:    Conjugate,    ): string { return "[" + this.traverse(conjugate.A) + ": " + this.traverse(conjugate.B) + "]" + this.repetitionSuffix(conjugate.amount); }
  // TODO: Remove spaces between repeated pauses (in traverseSequence)
  public traversePause(        pause:        Pause,        ): string { return "."; }
  public traverseNewLine(      newLine:      NewLine,      ): string { return "\n"; }
  // TODO: Enforce being followed by a newline (or the end of the alg)?
  public traverseCommentShort( commentShort: CommentShort, ): string { return "//" + commentShort.comment; }
    // TODO: Sanitize `*/`
  public traverseCommentLong(  commentLong:  CommentLong,  ): string { return "/*" + commentLong.comment + "*/"; }
}

function makeDownUp<DataDown, DataUp>(
  ctor: { new(): DownUp<DataDown, DataUp> }
 ): (a: Algorithm, dataDown: DataDown) => DataUp {
  var instance = new ctor();
  return instance.traverse.bind(instance);
}

function makeUp<DataUp>(
  ctor: { new(): Up<DataUp> }
 ): (a: Algorithm) => DataUp {
  var instance = new ctor();
  return instance.traverse.bind(instance);
}

export const invert            = makeUp(Invert);
export const expand            = makeUp(Expand);
export const structureEquals   = makeDownUp(StructureEquals);
export const coalesceBaseMoves = makeUp(CoalesceBaseMoves);
export const algToString       = makeUp(ToString);
