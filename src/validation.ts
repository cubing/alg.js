import {
  Sequence,
  Group,
  SiGNMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong
} from "./algorithm";

import {TraversalUp} from "./traversal"

export class ValidationError extends Error {}

export abstract class ValidatorTraversal extends TraversalUp<void> {}

type FamilyList = { [s: string]: boolean; }

function validateFamily(family: string, allowedFamilyLists: FamilyList[]): boolean {
  for (var list of allowedFamilyLists) {
    if (list[family] === true) {
      return true;
    }
  }
  return false;
}

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

abstract class BaseMoveValidator extends ValidatorTraversal {
  public traverseSequence(sequence: Sequence): void {
    // TODO: Handle newLines and comments correctly
    for (var unit of sequence.nestedUnits) {
      this.traverse(unit);
    }
  }
  public traverseGroup(group: Group): void {
    return this.traverse(group.nestedSequence);
  }
  public traverseCommutator(commutator: Commutator): void {
    this.traverse(commutator.A);
    this.traverse(commutator.B);
  }
  public traverseConjugate(conjugate: Conjugate): void {
    this.traverse(conjugate.A);
    this.traverse(conjugate.B);
  }
  public traversePause(pause: Pause):                      void { return; }
  public traverseNewLine(newLine: NewLine):                void { return; }
  public traverseCommentShort(commentShort: CommentShort): void { return; }
  public traverseCommentLong(commentLong: CommentLong):    void { return; }
}

// TODO: Export function instead?
export class SiGNMoveValidator extends BaseMoveValidator {
  public traverseSiGNMove(signMove: SiGNMove): void {
    if (typeof signMove.outerLayer !== "undefined") {
      if (typeof signMove.innerLayer === "undefined") {
        throw new ValidationError("A SiGNMove with an outer layer must have an inner layer.");
      }
      if (!validateFamily(signMove.family, [wideMoveFamilies])) {
        throw new ValidationError(`The provided SiGN move family is invalid, or cannot have an outer and inner layer: ${signMove.family}`);
      }
      if (signMove.outerLayer <= 0) {
        throw new ValidationError("Cannot have an outer layer of 0 or less.");
      }
      // TODO: Allow 2-2r?
      if (signMove.outerLayer >= signMove.innerLayer) {
        throw new ValidationError("The outer layer must be less than the inner layer.");
      }
      return;
    } else if (typeof signMove.innerLayer !== "undefined") {
      if (!validateFamily(signMove.family, [wideMoveFamilies, singleSliceMoveFamilies])) {
        throw new ValidationError(`The provided SiGN move family is invalid, or cannot have an inner slice: ${signMove.family}`);
      }
      if (signMove.innerLayer <= 0) {
        throw new ValidationError("Cannot have an inner layer of 0 or less.");
      }
      return;
    } else {
      if (!validateFamily(signMove.family, [wideMoveFamilies, singleSliceMoveFamilies, plainMoveFamilies])) {
          throw new ValidationError(`Invalid SiGN plain move family: ${signMove.family}`);
      }
      return;
    }
  }
}

// TODO: Export function instead?
export class FlatAlgValidator extends ValidatorTraversal {

  public traverseSequence(sequence: Sequence): void {
    // TODO: Handle newLines and comments correctly
    for (var unit of sequence.nestedUnits) {
      this.traverse(unit);
    }
    return;
  }
  public traverseGroup(group: Group): void {
    throw new ValidationError("A flat alg cannot contain a group.");
  }
  public traverseSiGNMove(signMove: SiGNMove): void {
    return;
  }
  public traverseCommutator(commutator: Commutator): void {
    throw new ValidationError("A flat alg cannot contain a commutator.");
  }
  public traverseConjugate(conjugate: Conjugate): void {
    throw new ValidationError("A flat alg cannot contain a conjugate.");
  }
  public traversePause(pause: Pause):                      void { return; }
  public traverseNewLine(newLine: NewLine):                void { return; }
  public traverseCommentShort(commentShort: CommentShort): void { return; }
  public traverseCommentLong(commentLong: CommentLong):    void { return; }
}

export type Validator = (a: Sequence) => void;


const SiGNMoveValidatorInstance = new SiGNMoveValidator();
export const validateSiGNMoves = <Validator>SiGNMoveValidatorInstance.traverse.bind(SiGNMoveValidatorInstance);

const flatAlgValidatorInstance = new FlatAlgValidator();
export const validateFlatAlg = <Validator>flatAlgValidatorInstance.traverse.bind(flatAlgValidatorInstance);

// TODO: Option for puzzle size?
export const validateSiGNAlg = function(a: Sequence) {
  validateSiGNMoves(a);
  validateFlatAlg(a);
}
