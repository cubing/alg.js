import {
  AlgPart,
  Unit,
  BaseMove,
  Sequence,
  Group,
  MoveFamily,
  SiGNMove,
  BareSiGNMove,
  LayerSiGNMove,
  RangeSiGNMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong
} from "../src/algorithm";
import {Example as Ex} from "../src/example"
import {
  invert,
  expand,
  structureEquals,
  coalesceBaseMoves,
  algToString,
  algPartToStringForTesting
} from "../src/traversal"
import {fromJSON} from "../src/json"
import {parse} from "../src/parser"

import { expect } from "chai";

var U  = new Sequence([BareSiGNMove("U", 1)]);
var UU = new Sequence([BareSiGNMove("U", 1), BareSiGNMove("U", 1)]);
var U2 = new Sequence([BareSiGNMove("U", 2)]);
var R  = new Sequence([BareSiGNMove("R", 1)]);

var e = function(a1: Sequence, a2: Sequence) {
  return expect(structureEquals(a1, a2));
}

describe("AlgPart", () => {
  class PauseSubClass extends Pause {
    public type: string = "fakePause";
  }

  it("cannot subclass directly", () => {
    expect(() => new PauseSubClass()).to.throw();
  });
});

describe("Sequence", () => {
  it("should allow an empty sequence", () => {
    expect(() => new Sequence([])).to.not.throw();
  });

  it("should throw an error for a nested sequence", () => {
    expect(() => new Sequence([new Sequence([BareSiGNMove("R", 1)])])).to.throw(/can only contain/);
  });
});

describe("SiGNMove", () => {
  it("should allow constructing: x, U, u", () => {
    expect(algToString(new Sequence([BareSiGNMove("x", 1)]))).to.equal("x");
    expect(algToString(new Sequence([BareSiGNMove("U", 1)]))).to.equal("U");
    expect(algToString(new Sequence([BareSiGNMove("u", 1)]))).to.equal("u");
  });

  it("should allow constructing: 2U, 2u", () => {
    expect(algToString(new Sequence([LayerSiGNMove(2, "U", 1)]))).to.equal("2U");
    expect(algToString(new Sequence([LayerSiGNMove(2, "u", 1)]))).to.equal("2u");
  });

  it("should prevent constructing: 2x, [-2]U, [-2]u", () => {
    expect(() => new Sequence([LayerSiGNMove(2, "x", 1)])).to.throw(/cannot have an inner slice/);
    expect(() => new Sequence([LayerSiGNMove(-2, "U", 1)])).to.throw(/Cannot have an inner layer of 0 or less/);
    expect(() => new Sequence([LayerSiGNMove(-2, "u", 1)])).to.throw(/Cannot have an inner layer of 0 or less/);
  });

  it("should allow constructing: 2-3u", () => {
    expect(algToString(new Sequence([RangeSiGNMove(2, 3, "u", 1)]))).to.equal("2-3u");
  });

  it("should prevent constructing: 2-3x, 2-3U, [-2]-3u, 4-3u", () => {
    expect(() => RangeSiGNMove(2, 3, "x", 1)).to.throw(/cannot have an outer and inner layer/);
    expect(() => RangeSiGNMove(2, 3, "U", 1)).to.throw(/cannot have an outer and inner layer/);
    expect(() => RangeSiGNMove(-2, 3, "u", 1)).to.throw(/Cannot have an outer layer of 0 or less/);
    expect(() => RangeSiGNMove(4, 3, "u", 1)).to.throw(/The outer layer must be less than the inner layer/);
  });

  it("should prevent constructing: w, 2T, 2-3q", () => {
    expect(() =>algToString(BareSiGNMove("w", 1))).to.throw(/Invalid SiGN plain move family: w/);
    expect(() =>algToString(LayerSiGNMove(2, "T", 1))).to.throw(/The provided SiGN move family is invalid, or cannot have an inner slice: T/);
    expect(() =>algToString(RangeSiGNMove(2, 3, "q", 1))).to.throw(/The provided SiGN move family is invalid, or cannot have an outer and inner layer: q/);
  });

  it("should support a default amount of 1.", () => {
    e(new Sequence([BareSiGNMove("U")]), new Sequence([BareSiGNMove("U", 1)])).to.be.true;
  });

  it("should throw an error for an invalid family", () => {
    expect(() => BareSiGNMove("Q", 1)).to.throw(/Invalid SiGN plain move family/);
  });

  it("should have a default amount of 1", () => {
    expect(BareSiGNMove("x").amount).to.equal(1);
    expect(BareSiGNMove("R").amount).to.equal(1);
    expect(BareSiGNMove("u").amount).to.equal(1);
    expect(LayerSiGNMove(2, "R").amount).to.equal(1);
    expect(LayerSiGNMove(3, "u").amount).to.equal(1);
    expect(RangeSiGNMove(2, 3, "u").amount).to.equal(1);
  });

  it("should allow different amounts 1", () => {
    expect(BareSiGNMove("x", 2).amount).to.equal(2);
    expect(BareSiGNMove("R", 3).amount).to.equal(3);
    expect(BareSiGNMove("u", -5).amount).to.equal(-5);
    expect(LayerSiGNMove(2, "R", 10).amount).to.equal(10);
    expect(LayerSiGNMove(3, "L", -13).amount).to.equal(-13);
    expect(RangeSiGNMove(2, 12, "u", 15).amount).to.equal(15);
  });
});

describe("algToString()", () => {
  it("should convert all move types correctly", () => {
    expect(algToString(new Sequence([BareSiGNMove("x", 2)]))).to.equal("x2");
    expect(algToString(new Sequence([BareSiGNMove("R", 3)]))).to.equal("R3");
    expect(algToString(new Sequence([BareSiGNMove("u", -5)]))).to.equal("u5'");
    expect(algToString(new Sequence([LayerSiGNMove(2, "R", 10)]))).to.equal("2R10");
    expect(algToString(new Sequence([LayerSiGNMove(3, "L", -13)]))).to.equal("3L13'");
    expect(algToString(new Sequence([RangeSiGNMove(2, 12, "u", 15)]))).to.equal("2-12u15");
  });

  it("should distinguish between 1R and R", () => {
    expect(algToString(new Sequence([LayerSiGNMove(1, "R")]))).to.equal("1R");
    expect(algToString(new Sequence([BareSiGNMove("R")]))).to.equal("R");
  });

  it("should convert Sune to string", () => {
    expect(algToString(Ex.Sune)).to.equal("R U R' U R U2' R'");
  });

  it("should convert U U to string", () => {
    expect(algToString(UU)).to.equal("U U");
  });

 it("should convert E-Perm to string", () => {
   expect(algToString(Ex.EPerm)).to.equal("x' [[R: U'], D] [[R: U], D] x");
 });

  it("should convert triple pause to ... (without spaces)", () => {
    expect(algToString(Ex.TriplePause)).to.equal("...");
  });
});

describe("Traversal", () => {
  class FakePause extends Unit {
    public type: string = "pause";
  }

  it("cannot subclass directly", () => {
    expect(() => algToString(new Sequence([new FakePause()]))).to.throw(/Alg part is not an object of type Pause despite having "type": "pause"/);
  });
});

describe("invert()", () => {
  it("should correctly invert", () => {
    e(invert(Ex.Sune), Ex.AntiSune).to.be.true;
    e(invert(invert(Ex.Sune)), Ex.Sune).to.be.true;
    e(invert(invert(Ex.Sune)), Ex.AntiSune).to.be.false;
  });
});

describe("expand()", () => {
  it("should correctly expand", () => {
    e(expand(Ex.FURURFCompact), Ex.FURURFMoves).to.be.true;
    e(expand(Ex.Sune), Ex.Sune).to.be.true;
    e(expand(Ex.SuneCommutator), Ex.Sune).to.be.false;
    e(expand(Ex.FURURFCompact), expand(Ex.SuneCommutator)).to.be.false;
  });

  it("should correctly expand a group with two units", () => {
    e(expand(parse("(R U)2")), parse("R U R U")).to.be.true;
  });

  it("should correctly expand an E-Perm", () => {
    e(expand(Ex.EPerm), parse("x' R U' R' D R U R' D' R U R' D R U' R' D' x")).to.be.true;
  });
});

describe("structureEquals", () => {
  it("should correctly compare", () => {
    e(Ex.FURURFCompact, Ex.FURURFMoves).to.be.false;
    e(Ex.FURURFMoves, Ex.FURURFCompact).to.be.false;
    e(Ex.FURURFMoves, Ex.FURURFMoves).to.be.true;
    e(Ex.FURURFCompact, Ex.FURURFCompact).to.be.true;
  });
});

describe("coalesceBaseMoves()", () => {
  it("should coalesce U U to U2", () => {
    e(coalesceBaseMoves(UU), U2).to.be.true;
    expect(algToString(coalesceBaseMoves(UU))).to.equal("U2");
  });

  it("should coalesce expanded commutator Sune corectly", () => {
    e(coalesceBaseMoves(expand(Ex.SuneCommutator)), Ex.Sune).to.be.true;
  });
});

describe("JSON", () => {
  it("should round-trip an alg through JSON stringification", () => {
    e(fromJSON(JSON.parse(JSON.stringify(Ex.FURURFCompact))),
      Ex.FURURFCompact).to.be.true;
  });
});

describe("Object Freezing", () => {
  it("should freeze all example alg types", () => {
    // Update this based on the length of AllAlgParts.
    expect(Ex.AllAlgParts.length).to.equal(9);
    for (var a of Ex.AllAlgParts) {
      expect(Object.isFrozen(a)).to.be.true;
    }
  });

  it("should freeze `nestedUnits` list on Sequence", () => {
    // Update this based on the length of AllAlgParts.
    expect(Object.isFrozen(new Sequence([BareSiGNMove("R", 1)]).nestedUnits)).to.be.true;
  });

  it("should not be possible to modify a BaseMove", () => {
      var b = BareSiGNMove("R", 4);
      var e: Error | undefined;
      try {
        b.amount = 2;
      } catch (err) {
        e = err;
      }
      expect(e instanceof TypeError).to.be.true;
  });
});

describe("Parser", () => {
  it("should parse a Sune", () => {
    e(parse("R U R' U R U2' R'"), Ex.Sune).to.be.true;
  });

  it("should parse U u Uw x 2U 2u 2Uw 2-3u 2-3Uw", () => {
    const s = "U u Uw x 2U 2u 2Uw 2-3u 2-3Uw";
    expect(algToString(parse(s))).to.equal(s);
  });

  it("should parse ...", () => {
    const p = new Pause();
    e(parse("..."), new Sequence([p, p, p])).to.be.true;
  });

  // TODO: Should these be parsed differently?
  it("should parse R and R1 as the same (for now)", () => {
    e(parse("R"), parse("R1")).to.be.true;
  });

  it("should round-trip algs through a string", () => {
    e(parse(algToString(Ex.SuneCommutator)), Ex.SuneCommutator).to.be.true;
    e(parse(algToString(Ex.Niklas)), Ex.Niklas).to.be.true;
    e(parse(algToString(Ex.FURURFCompact)), Ex.FURURFCompact).to.be.true;
    e(parse(algToString(Ex.APermCompact)), Ex.APermCompact).to.be.true;
    e(parse(algToString(Ex.TPerm)), Ex.TPerm).to.be.true;
    e(parse(algToString(Ex.HeadlightSwaps)), Ex.HeadlightSwaps).to.be.true;
    e(parse(algToString(Ex.TriplePause)), Ex.TriplePause).to.be.true;
  });

  it("should round-trip all alg types through a string", () => {
    // Update this based on the length of AllAlgParts.
    for (var a of Ex.AllAlgParts) {
      var seq = (a instanceof Sequence) ? a : new Sequence([a]);
      e(parse(algToString(seq)), seq).to.be.true;
    }
  });
});
