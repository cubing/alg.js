import * as Alg from "../algorithm"
import * as Example from "../example"
import * as Traversal from "../traversal"
import {fromJSON} from "../json"

"use strict";

window.addEventListener("load", function() {

// Hacky, yet effective.
function algTest(description: string, condition: boolean) {
  var li = document.createElement("li");
  if (condition) {
    console.log("\u2705 " + description);
    li.textContent = "\u2705 " + description;
  } else {
    console.error("\u274C " + description);
    li.textContent = "\u274C " + description;
  }
  document.body.appendChild(li);
}

(function TestToString() {
  var alg = Example.Sune;
  algTest("Sune moves", alg.toString() === "R U R' U R U2' R'");
  algTest("String() vs. toString()", String(alg) === alg.toString());
})();

(function TestCountBlockMoves() {
  var t = new Traversal.CountBlockMoves();
  algTest("Sune has 7 moves", t.traverse(Example.Sune) === 7);
  algTest("FURURFCompact has 7 moves", t.traverse(Example.FURURFCompact) === 6);
})();

(function TestStructureEqualsTraversal() {
  var structureEquals = new Traversal.StructureEquals();
  algTest("[Traversal] FURUFCompact !== FURURFMoves", !structureEquals.traverse(Example.FURURFCompact, Example.FURURFMoves));
  algTest("[Traversal] FURURFMoves !== FURUFCompact", !structureEquals.traverse(Example.FURURFMoves, Example.FURURFCompact));
  algTest("[Traversal] FURURFMoves == FURURFMoves", structureEquals.traverse(Example.FURURFMoves, Example.FURURFMoves));
  algTest("[Traversal] FURURFCompact == FURURFCompact", structureEquals.traverse(Example.FURURFCompact, Example.FURURFCompact));
})();

(function TestStructureEquals() {
  algTest("FURUFCompact == FURURFMoves", !Example.FURURFCompact.structureEquals(Example.FURURFMoves));
  algTest("FURURFMoves == FURURFMoves", Example.FURURFMoves.structureEquals(Example.FURURFMoves));
  algTest("FURURFCompact == FURURFCompact", Example.FURURFCompact.structureEquals(Example.FURURFCompact));
  algTest("SuneCommutator != Sune", !Example.SuneCommutator.structureEquals(Example.Sune));
})();

(function TestExpand() {
  algTest("Expand FURURFCompact", Example.FURURFCompact.expand().structureEquals(Example.FURURFMoves));
  algTest("Expand Sune (fixed point)", Example.Sune.expand().structureEquals(Example.Sune));
  algTest("Expand SuneCommutator", !Example.SuneCommutator.expand().structureEquals(Example.Sune));
  algTest("Expand FURURFCompact != expand SuneCommutator", !Example.FURURFCompact.expand().structureEquals(Example.SuneCommutator.expand()));
})();

(function TestInvert() {
  algTest("Sune double inverted is Sune", Example.Sune.invert().invert().structureEquals(Example.Sune));
  algTest("Sune inverse is not Sune", !Example.Sune.invert().invert().structureEquals(Example.AntiSune));
  algTest("Sune inverse is AntiSune", Example.Sune.invert().structureEquals(Example.AntiSune));
})();

var U = new Alg.BlockMove("U", 1);
var UU_raw = new Alg.Sequence([
  new Alg.BlockMove("U", 1),
  new Alg.BlockMove("U", 1)
]);
var U2 = new Alg.Sequence([
  new Alg.BlockMove("U", 2)
]);
var R = new Alg.Sequence([
  new Alg.BlockMove("R", 1)
]);

(function TestCoalesceMoves() {
  algTest("Coalesce U U", UU_raw.coalesceMoves().structureEquals(U2));
  algTest("Coalesce U U string value", UU_raw.coalesceMoves().toString() === "U2");
  algTest("Expanded SuneCommutator coalesces into Sune", Example.SuneCommutator.expand().coalesceMoves().structureEquals(Example.Sune));
})();

(function TestConcat() {
  algTest("Concat U U", U.concat(U).structureEquals(UU_raw));
  algTest("Concat U U string value", U.concat(U).toString() === "U U");
  algTest("Concatenation associativity", U.concat(R.concat(U)).structureEquals(U.concat(R).concat(U)));
  algTest("Build Sune", R.concat(U).concat(R.invert()).concat(U).concat(R).concat(U2.invert()).concat(R.invert()).structureEquals(Example.Sune));
})();

(function TestJSON() {
  algTest("FURURFCompact JSON string roundtrip", fromJSON(JSON.parse(JSON.stringify(Example.FURURFCompact))).structureEquals(Example.FURURFCompact));
})();


// TODO: Test that inverses are bijections.
class Depth extends Traversal.Up<number> {
  public traverseSequence(sequence: Alg.Sequence): number {
    var max = 0;
    for (var part of sequence.nestedAlgs) {
      max = Math.max(max, this.traverse(part));
    }
    return max;
  }
  public traverseGroup(group: Alg.Group): number {
    return 1 + this.traverse(group.nestedAlg);
  }
  public traverseBlockMove(blockMove: Alg.BlockMove): number {
    return 0;
  }
  public traverseCommutator(commutator: Alg.Commutator): number {
    return 1 + Math.max(this.traverse(commutator.A), this.traverse(commutator.B));
  }
  public traverseConjugate(conjugate: Alg.Conjugate): number {
    return 1 + Math.max(this.traverse(conjugate.A), this.traverse(conjugate.B));
  }
  public traversePause(pause: Alg.Pause):                      number { return 0; }
  public traverseNewLine(newLine: Alg.NewLine):                number { return 0; }
  public traverseCommentShort(commentShort: Alg.CommentShort): number { return 0; }
  public traverseCommentLong(commentLong: Alg.CommentLong):    number { return 0; }
}

(function TestTraversal() {
  var depth = new Depth();
  algTest("Regular Sune depth", depth.traverse(Example.Sune) === 0);
  algTest("SuneCommutator depth", depth.traverse(Example.SuneCommutator) === 1);
  algTest("FRURFCompact depth", depth.traverse(Example.FURURFCompact) === 2);
})();

(function TestNewAlgTypeNewTraversal() {

  class ConfabAwareClone extends Traversal.Clone  {
    public traverseConfabulator(confabulator: Confabulator): Alg.Algorithm {
      return new Alg.Commutator(confabulator.A.clone(), confabulator.A.clone(), 3);

    }
  }

  class Confabulator extends Alg.Algorithm {
    public type: string = "confabulator";
    constructor(public A: Alg.Algorithm) {
      super();
      this.freeze();
    }
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp {
      // TODO: can we do this without breaking the type system?
      return (t as any).traverseConfabulator(this, dataDown);
    }
  }

  // TODO: Figure out how to add definitions to existing traversals like ToString.

  var h = new ConfabAwareClone();
  var t = h.traverse(new Alg.Group(new Confabulator(new Alg.BlockMove("R", 1)), 2));
  // console.log();
  algTest("Check that you can create a new traversal for a new algorithm type.", t.structureEquals(new Alg.Group(new Alg.Commutator(new Alg.BlockMove("R", 1), new Alg.BlockMove("R", 1), 3), 2)));
  algTest("Check traversed confabulator.", t.toString() === "([R, R]3)2");
})();


// TODO: Cover all alg types
(function TestThatAlgorithmsAreFrozen() {
  for (var a of Example.AllAlgTypes) {
    algTest(`Alg of type ${a.type} is frozen`, Object.isFrozen(a));
  }
})();

(function TestBlockMoveFrozen() {
  var b = new Alg.BlockMove("R", 4);
  var e: any;
  try {
    b.amount = 2;
  } catch (err) {
    e = err;
  }
   algTest("Modifying BlockMove should not succeed.", e instanceof TypeError);
})();

});
