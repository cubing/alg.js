import * as Alg from "../src/algorithm"
import {BlockMove as BM} from "../src/algorithm"
import {Example as Ex} from "../src/example"
import {
  Traversal,
  clone,
  invert,
  expand,
  countBaseMoves,
  structureEquals,
  coalesceMoves,
  concat,
  algToString
} from "../src/traversal"
import {fromJSON} from "../src/json"

import { expect } from "chai";
import "mocha";

var U  = new BM("U", 1);
var UU = new Alg.Sequence([new BM("U", 1), new BM("U", 1)]);
var U2 = new Alg.Sequence([new BM("U", 2)]);
var R  = new Alg.Sequence([new BM("R", 1)]);

describe("toString", () => {
  it("should convert Sune to string", () => {
    expect(algToString(Ex.Sune)).to.equal("R U R' U R U2' R'");
    // TODO: re-enable this if we restore chaining to the Algorithm class.
    // expect(String(Ex.Sune)).to.equal("R U R' U R U2' R'");
  });

  // it("should convert E Perm to string", () => {
  //   expect(algToString(Ex.EPerm)).to.equal("x' [[R: U'], D] [[R: U], D] x");
  // });

  it("should convert U U to string", () => {
    expect(algToString(UU)).to.equal("U U");
  });
});

var e = function(a1: Alg.Algorithm, a2: Alg.Algorithm) {
  var structureEquals = new Traversal.StructureEquals();
  return expect(structureEquals.traverse(a1, a2));
}

describe("Traversal", () => {
  it("should correctly traverse using CountBaseMoves", () => {
    var t = new Traversal.CountBaseMoves();
    expect(t.traverse(Ex.Sune)).to.equal(7);

    expect(countBaseMoves(Ex.Sune)).to.equal(7);
  });
 
  it("should correctly traverse using StructureEquals", () => {
    var s = new Traversal.StructureEquals();
    e(Ex.FURURFCompact, Ex.FURURFMoves).to.be.false;
    e(Ex.FURURFMoves, Ex.FURURFCompact).to.be.false;
    e(Ex.FURURFMoves, Ex.FURURFMoves).to.be.true;
    e(Ex.FURURFCompact, Ex.FURURFCompact).to.be.true;
  });
 
  it("should correctly traverse using Expand", () => {
    var s = new Traversal.StructureEquals();
    e(expand(Ex.FURURFCompact), Ex.FURURFMoves).to.be.true;
    e(expand(Ex.Sune), Ex.Sune).to.be.true;
    e(expand(Ex.SuneCommutator), Ex.Sune).to.be.false;
    e(expand(Ex.FURURFCompact), expand(Ex.SuneCommutator)).to.be.false;
  });

  it("should correctly traverse using Invert", () => {
    e(invert(Ex.Sune), Ex.AntiSune).to.be.true;
    e(invert(invert(Ex.Sune)), Ex.Sune).to.be.true;
    e(invert(invert(Ex.Sune)), Ex.AntiSune).to.be.false;
  });
});

describe("Coalesce", () => {
  it("should coalesce U U to U2", () => {
    e(coalesceMoves(UU), U2).to.be.true;
    expect(algToString(coalesceMoves(UU))).to.equal("U2");
  });

  it("should coalesce expanded commutator Sune corectly", () => {
    e(coalesceMoves(expand(Ex.SuneCommutator)), Ex.Sune).to.be.true;
  });
});

describe("Concat", () => {
  it("should concat U U corectly", () => {
    e(concat(U, U), UU).to.be.true;
  });

  it("should be associative", () => {
    e(concat(concat(U, R), U),
      concat(U, concat(R, U))).to.be.true;
  });

  it("should build a Sune correctly", () => {
    e(concat(concat(concat(concat(concat(concat(
      R, U), invert(R)), U), R), invert(U2)), invert(R)),
      Ex.Sune).to.be.true;
  });
});

describe("JSON", () => {
  it("should round-trip an alg through JSON", () => {
    e(fromJSON(JSON.parse(JSON.stringify(Ex.FURURFCompact))),
      Ex.FURURFCompact).to.be.true;
  });
});

describe("Custom Traversal", () => {
  it("should be able to calculate alg depth", () => {
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
      public traverseBlockMove(blockMove: Alg.BaseMove): number {
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

    var depth = new Depth();
    expect(depth.traverse(Ex.Sune)).to.equal(0);
    expect(depth.traverse(Ex.HeadlightSwaps)).to.equal(2);
    expect(depth.traverse(Ex.FURURFCompact)).to.equal(2);
  });

  it("should be able to clone an alg with a new alg type", () => {
    class ConfabAwareClone extends Traversal.Clone  {
      public traverseConfabulator(confabulator: Confabulator): Alg.Algorithm {
        return new Alg.Commutator(clone(confabulator.A), clone(confabulator.A), 3);

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
    var t2 = new Alg.Group(new Alg.Commutator(new Alg.BlockMove("R", 1), new Alg.BlockMove("R", 1), 3), 2);
    e(t, t2).to.be.true;

    // TODO: Fix stringification.
    // expect(algToString(t)).to.equal("([R, R]3)2");
  });
})


describe("Object Freezing", () => {
  it("should freeze all example alg types", () => {
    // Update this based on the length of AllAlgTypes.
    expect(Ex.AllAlgTypes.length).to.equal(9);
    for (var a of Ex.AllAlgTypes) {
      expect(Object.isFrozen(a)).to.be.true;
    }
  });

  it("should not be possible to modify a BaseMove", () => {
      var b = new Alg.BlockMove("R", 4);
      var e: any;
      try {
        b.amount = 2;
      } catch (err) {
        e = err;
      }
      expect(e instanceof TypeError).to.be.true;
  });
});
