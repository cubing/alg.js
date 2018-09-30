import {CHECK_TYPES} from "./debug"

import {
  AlgPart,
  Unit,
  Sequence,
  Group,
  BlockMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong,
  WithAmount
} from "./algorithm";

function dispatch<DataDown, DataUp>(t: TraversalDownUp<DataDown, DataUp>, algPart: AlgPart, dataDown: DataDown): DataUp {
  switch (algPart.type) {
    case "sequence":
      if (CHECK_TYPES && !(algPart instanceof Sequence)) {
        throw `Alg part is not an object of type Sequence despite having "type": \"${algPart.type}\"`
      }
      return t.traverseSequence(<Sequence >algPart, dataDown);
    case "group":
      if (CHECK_TYPES && !(algPart instanceof Group)) {
        throw `Alg part is not an object of type Group despite having "type": \"${algPart.type}\"`
      }
      return t.traverseGroup(<Group >algPart, dataDown);
    case "blockMove":
      if (CHECK_TYPES && !(algPart instanceof BlockMove)) {
        throw `Alg part is not an object of type BlockMove despite having "type": \"${algPart.type}\"`
      }
      return t.traverseBlockMove(<BlockMove >algPart, dataDown);
    case "commutator":
      if (CHECK_TYPES && !(algPart instanceof Commutator)) {
        throw `Alg part is not an object of type Commutator despite having "type": \"${algPart.type}\"`
      }
      return t.traverseCommutator (<Commutator>algPart, dataDown);
    case "conjugate":
      if (CHECK_TYPES && !(algPart instanceof Conjugate)) {
        throw `Alg part is not an object of type Conjugate despite having "type": \"${algPart.type}\"`
      }
      return t.traverseConjugate(<Conjugate >algPart, dataDown);
    case "pause":
      if (CHECK_TYPES && !(algPart instanceof Pause)) {
        throw `Alg part is not an object of type Pause despite having "type": \"${algPart.type}\"`
      }
      return t.traversePause(<Pause>algPart, dataDown);
    case "newLine":
      if (CHECK_TYPES && !(algPart instanceof NewLine)) {
        throw `Alg part is not an object of type NewLine despite having "type": \"${algPart.type}\"`
      }
      return t.traverseNewLine(<NewLine >algPart, dataDown);
    case "commentShort":
      if (CHECK_TYPES && !(algPart instanceof CommentShort)) {
        throw `Alg part is not an object of type CommentShort despite having "type": \"${algPart.type}\"`
      }
      return t.traverseCommentShort (<CommentShort>algPart, dataDown);
    case "commentLong":
      if (CHECK_TYPES && !(algPart instanceof CommentLong)) {
        throw `Alg part is not an object of type CommentLong despite having "type": \"${algPart.type}\"`
      }
      return t.traverseCommentLong (<CommentLong>algPart, dataDown);
    default: 
      throw `Unknown AlgPart type: ${algPart.type}`
  }
}

export abstract class TraversalDownUp<DataDown, DataUp> {
  // Immediate subclasses should overwrite this.
  public traverse(algPart: AlgPart, dataDown: DataDown): DataUp {
    return dispatch(this, algPart, dataDown);
  }

  public traverseIntoUnit(algPart: AlgPart, dataDown: DataDown): Unit {
    var out = this.traverse(algPart, dataDown);
    if (CHECK_TYPES && !(out instanceof Unit)) {
      throw "Traversal did not produce a unit as expected."
    }
    return <Unit><any>out;
  }

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

export abstract class TraversalUp<DataUp> extends TraversalDownUp<undefined, DataUp> {
  public traverse(algPart: AlgPart): DataUp {
    return dispatch<undefined, DataUp>(this, algPart, undefined);
  }

  public traverseIntoUnit(algPart: AlgPart): Unit {
    var out = this.traverse(algPart);
    if (CHECK_TYPES && !(out instanceof Unit)) {
      throw "Traversal did not produce a unit as expected."
    }
    return <Unit><any>out;
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
export class Invert extends TraversalUp<AlgPart> {
  public traverseSequence(sequence: Sequence): Sequence {
    // TODO: Handle newLines and comments correctly
    return new Sequence(sequence.nestedUnits.slice().reverse().map(a => this.traverseIntoUnit(a)));
  }
  public traverseGroup(group: Group): AlgPart {
    return new Group(this.traverseSequence(group.nestedSequence), group.amount);
  }
  public traverseBlockMove(blockMove: BlockMove): AlgPart {
    return new BlockMove(blockMove.outerLayer, blockMove.innerLayer, blockMove.family, -blockMove.amount);
  }
  public traverseCommutator(commutator: Commutator): AlgPart {
    return new Commutator(commutator.B, commutator.A, commutator.amount);
  }
  public traverseConjugate(conjugate: Conjugate): AlgPart {
    return new Conjugate(conjugate.A, this.traverseSequence(conjugate.B), conjugate.amount);
  }
  public traversePause(pause: Pause):                      AlgPart { return pause; }
  public traverseNewLine(newLine: NewLine):                AlgPart { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): AlgPart { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    AlgPart { return commentLong; }
}

export class Expand extends TraversalUp<AlgPart> {
  private flattenSequenceOneLevel(algList: AlgPart[]): Unit[] {
    var flattened: Unit[] = [];
    for (const part of algList) {
      if (part instanceof Sequence) {
        flattened = flattened.concat(part.nestedUnits);
      } else if (part instanceof Unit) {
        flattened.push(part)
      } else {
        throw "expand() encountered an internal error. Did you pass in a valid Algorithm?"
      }
    }
    return flattened;
  }

  private repeat(algList: Unit[], accordingTo: WithAmount): Sequence {
    var amount = Math.abs(accordingTo.amount);
    var amountDir = (accordingTo.amount > 0) ? 1 : -1; // Mutable

    // TODO: Cleaner inversion
    var once: Unit[];
    if (amountDir == -1) {
      // TODO: Avoid casting to sequence.
      once = (<Sequence>(invert(new Sequence(algList)))).nestedUnits;
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
    return new Sequence(this.flattenSequenceOneLevel(sequence.nestedUnits.map(a => this.traverse(a))));
  }
  public traverseGroup(group: Group): AlgPart {
    // TODO: Pass raw AlgPart[] to sequence.
    return this.repeat(this.flattenSequenceOneLevel([this.traverse(group.nestedSequence)]), group);
  }
  public traverseBlockMove(blockMove: BlockMove): AlgPart {
    return blockMove;
  }
  public traverseCommutator(commutator: Commutator): AlgPart {
    var expandedA = this.traverseSequence(commutator.A)
    var expandedB = this.traverseSequence(commutator.B)
    var once: AlgPart[] = [];
    once = once.concat(
      expandedA,
      expandedB,
      invert(expandedA),
      invert(expandedB)
    );
    return this.repeat(this.flattenSequenceOneLevel(once), commutator);
  }
  public traverseConjugate(conjugate: Conjugate): AlgPart {
    var expandedA = this.traverseSequence(conjugate.A)
    var expandedB = this.traverseSequence(conjugate.B)
    var once: AlgPart[] = [];
    once = once.concat(
      expandedA,
      expandedB,
      invert(expandedA)
    );
    return this.repeat(this.flattenSequenceOneLevel(once), conjugate);
  }
  public traversePause(pause: Pause):                      AlgPart { return pause; }
  public traverseNewLine(newLine: NewLine):                AlgPart { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): AlgPart { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    AlgPart { return commentLong; }
}

export class StructureEquals extends TraversalDownUp<AlgPart, boolean> {
  public traverseSequence(sequence: Sequence, dataDown: AlgPart): boolean {
    if (!(dataDown instanceof Sequence)) {
      return false;
    }
    if (sequence.nestedUnits.length !== dataDown.nestedUnits.length) {
      return false;
    }
    for (var i = 0; i < sequence.nestedUnits.length; i++) {
      if (!this.traverse(sequence.nestedUnits[i], dataDown.nestedUnits[i])) {
        return false;
      }
    }
    return true;
  }
  public traverseGroup(group: Group, dataDown: AlgPart): boolean {
    return (dataDown instanceof Group) && this.traverse(group.nestedSequence, dataDown.nestedSequence);
  }
  public traverseBlockMove(blockMove: BlockMove, dataDown: AlgPart): boolean {
    // TODO: Handle layers.
    return dataDown instanceof BlockMove &&
           blockMove.outerLayer === dataDown.outerLayer &&
           blockMove.innerLayer === dataDown.innerLayer &&
           blockMove.family === dataDown.family &&
           blockMove.amount === dataDown.amount;
  }
  public traverseCommutator(commutator: Commutator, dataDown: AlgPart): boolean {
    return (dataDown instanceof Commutator) &&
           this.traverse(commutator.A, dataDown.A) &&
           this.traverse(commutator.B, dataDown.B);
  }
  public traverseConjugate(conjugate: Conjugate, dataDown: AlgPart): boolean {
    return (dataDown instanceof Conjugate) &&
           this.traverse(conjugate.A, dataDown.A) &&
           this.traverse(conjugate.B, dataDown.B);
  }
  public traversePause(pause: Pause, dataDown: AlgPart): boolean {
    return dataDown instanceof Pause;
  }
  public traverseNewLine(newLine: NewLine, dataDown: AlgPart): boolean {
    return dataDown instanceof NewLine;
  }
  public traverseCommentShort(commentShort: CommentShort, dataDown: AlgPart): boolean {
    return (dataDown instanceof CommentShort) && (commentShort.comment == dataDown.comment);
  }
  public traverseCommentLong(commentLong: CommentLong, dataDown: AlgPart): boolean {
    return (dataDown instanceof CommentLong) && (commentLong.comment == dataDown.comment);
  }
}

// TODO: Test that inverses are bijections.
export class CoalesceBaseMoves extends TraversalUp<AlgPart> {
  private sameBlock(moveA: BlockMove, moveB: BlockMove): boolean {
    // TODO: Handle layers
    return moveA.outerLayer === moveB.outerLayer &&
           moveA.innerLayer === moveB.innerLayer &&
           moveA.family === moveB.family;
  }

  // TODO: Handle
  public traverseSequence(sequence: Sequence): Sequence {
    var coalesced: Unit[] = [];
    for (const part of sequence.nestedUnits) {
      if (!(part instanceof BlockMove)) {
        coalesced.push(this.traverseIntoUnit(part));
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
            coalesced.push(new BlockMove(part.outerLayer, part.innerLayer, part.family, amount));
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
  public traverseGroup(group: Group):                      AlgPart { return group; }
  public traverseBlockMove(blockMove: BlockMove):             AlgPart { return blockMove; }
  public traverseCommutator(commutator: Commutator):       AlgPart { return commutator; }
  public traverseConjugate(conjugate: Conjugate):          AlgPart { return conjugate; }
  public traversePause(pause: Pause):                      AlgPart { return pause; }
  public traverseNewLine(newLine: NewLine):                AlgPart { return newLine; }
  public traverseCommentShort(commentShort: CommentShort): AlgPart { return commentShort; }
  public traverseCommentLong(commentLong: CommentLong):    AlgPart { return commentLong; }
}

// export class Concat extends TraversalDownUp<Algorithm, Sequence> {
//   private concatIntoSequence(A: Algorithm[], B: Algorithm): Sequence {
//     var nestedAlgs: Algorithm[] = A.slice();
//     if (B instanceof Sequence) {
//       nestedAlgs = nestedAlgs.concat(B.nestedUnits)
//     } else {
//       nestedAlgs.push(B);
//     }
//     return new Sequence(nestedAlgs)
//   }
//   public traverseSequence(     sequence:     Sequence,     dataDown: Algorithm): Sequence {return this.concatIntoSequence(sequence.nestedUnits, dataDown); }
//   public traverseGroup(        group:        Group,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([group]          , dataDown); }
//   public traverseBlockMove(    BlockMove:    BlockMove,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([BlockMove]      , dataDown); }
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
    if (sequence.nestedUnits.length > 0) {
      output += this.traverse(sequence.nestedUnits[0]);
      for (var i = 1; i < sequence.nestedUnits.length; i++) {
        output += this.spaceBetween(sequence.nestedUnits[i-1], sequence.nestedUnits[i]);
        output += this.traverse(sequence.nestedUnits[i]);
      }
    }
    return output;
  }
  public traverseGroup(        group:        Group       ): string { return "(" + this.traverse(group.nestedSequence) + ")" + this.repetitionSuffix(group.amount); }
  public traverseBlockMove(     blockMove:     BlockMove    ): string {
    var out = blockMove.family + this.repetitionSuffix(blockMove.amount);
    if (typeof blockMove.innerLayer !== "undefined") {
      out = String(blockMove.innerLayer) + out;
      if (typeof blockMove.outerLayer !== "undefined") {
        out = String(blockMove.outerLayer) + "-" + out;
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

const invertInstance = new Invert();
const expandInstance = new Expand();
const structureEqualsInstance = new StructureEquals();
const coalesceBaseMovesInstance = new CoalesceBaseMoves();
const algToStringInstance = new ToString();

export const invert            = <(a: Sequence) => Sequence>invertInstance.traverseSequence.bind(invertInstance)
export const expand            = <(a: Sequence) => Sequence>expandInstance.traverseSequence.bind(expandInstance);
export const structureEquals   = <(a1: Sequence, a2: Sequence) => boolean>structureEqualsInstance.traverseSequence.bind(structureEqualsInstance);
export const coalesceBaseMoves = <(a: Sequence) => Sequence>coalesceBaseMovesInstance.traverseSequence.bind(coalesceBaseMovesInstance);
export const algToString       = <(a: Sequence) => string>algToStringInstance.traverseSequence.bind(algToStringInstance);

export const algPartStructureEqualsForTesting = <(a1: AlgPart, a2: AlgPart) => boolean>algToStringInstance.traverse.bind(algToStringInstance);
export const algPartToStringForTesting = <(a: AlgPart) => Sequence>algToStringInstance.traverse.bind(algToStringInstance);
