import {
  Unit,
  Sequence,
  Group,
  BareSiGNMove,
  LayerSiGNMove,
  RangeSiGNMove,
  Commutator,
  Pause
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
import {
  parse,
  parseSiGN
} from "../src/parser"
import {
  ValidationError,
  validateSiGNAlg,
  validateFlatAlg,
  validateSiGNMoves
} from "../src/validation"

var UU = new Sequence([BareSiGNMove("U", 1), BareSiGNMove("U", 1)]);
var U2 = new Sequence([BareSiGNMove("U", 2)]);

var e = function(a1: Sequence, a2: Sequence) {
  return expect(structureEquals(a1, a2));
}

describe("AlgPart", () => {
  class PauseSubClass extends Pause {
    public type: string = "fakePause";
  }

  it("cannot subclass directly", () => {
    expect(() => new PauseSubClass()).toThrowError();
  });
});

describe("Sequence", () => {
  it("should allow an empty sequence", () => {
    expect(() => new Sequence([])).not.toThrow();
    expect(() => new Commutator(new Sequence([]), new Sequence([]))).not.toThrow();
  });

  it("should throw an error for a nested sequence", () => {
    expect(() => new Sequence([new Sequence([BareSiGNMove("R", 1)])])).toThrowError(/can only contain/);
  });
});

describe("SiGNMove", () => {
  it("should allow constructing: x, U, u", () => {
    expect(algPartToStringForTesting(BareSiGNMove("x", 1))).toBe("x");
    expect(algPartToStringForTesting(BareSiGNMove("U", 1))).toBe("U");
    expect(algPartToStringForTesting(BareSiGNMove("u", 1))).toBe("u");
  });

  it("should allow constructing: 2U, 2u", () => {
    expect(algPartToStringForTesting(LayerSiGNMove(2, "U", 1))).toBe("2U");
    expect(algPartToStringForTesting(LayerSiGNMove(2, "u", 1))).toBe("2u");
  });

  it("should prevent constructing: 2x, [-2]U, [-2]u", () => {
    expect(() => validateSiGNMoves(new Sequence([LayerSiGNMove(2, "x", 1)]))).toThrowError(/cannot have an inner slice/);
    expect(() => validateSiGNMoves(new Sequence([LayerSiGNMove(-2, "U", 1)]))).toThrowError(/Cannot have an inner layer of 0 or less/);
    expect(() => validateSiGNMoves(new Sequence([LayerSiGNMove(-2, "u", 1)]))).toThrowError(/Cannot have an inner layer of 0 or less/);
  });

  it("should allow constructing: 2-3u", () => {
    expect(algPartToStringForTesting(RangeSiGNMove(2, 3, "u", 1))).toBe("2-3u");
  });

  it("should prevent constructing: 2-3x, 2-3U, [-2]-3u, 4-3u", () => {
    expect(() => validateSiGNMoves(new Sequence([RangeSiGNMove(2, 3, "x", 1)]))).toThrowError(/cannot have an outer and inner layer/);
    expect(() => validateSiGNMoves(new Sequence([RangeSiGNMove(2, 3, "U", 1)]))).toThrowError(/cannot have an outer and inner layer/);
    expect(() => validateSiGNMoves(new Sequence([RangeSiGNMove(-2, 3, "u", 1)]))).toThrowError(/Cannot have an outer layer of 0 or less/);
    expect(() => validateSiGNMoves(new Sequence([RangeSiGNMove(4, 3, "u", 1)]))).toThrowError(/The outer layer must be less than the inner layer/);
  });

  it("should prevent constructing: w, 2T, 2-3q", () => {
    // expect(() =>algPartToStringForTesting(BareSiGNMove("w", 1))).toThrowError(/Invalid SiGN plain move family: w/);
    // expect(() =>algPartToStringForTesting(LayerSiGNMove(2, "T", 1))).toThrowError(/The provided SiGN move family is invalid, or cannot have an inner slice: T/);
    // expect(() =>algPartToStringForTesting(RangeSiGNMove(2, 3, "q", 1))).toThrowError(/The provided SiGN move family is invalid, or cannot have an outer and inner layer: q/);
  });

  it("should support a default amount of 1.", () => {
    e(new Sequence([BareSiGNMove("U")]), new Sequence([BareSiGNMove("U", 1)])).toBe(true);
  });

  it("should throw an error for an invalid family", () => {
    // expect(() => BareSiGNMove("Q", 1)).toThrowError(/Invalid SiGN plain move family/);
  });

  it("should have a default amount of 1", () => {
    expect(BareSiGNMove("x").amount).toBe(1);
    expect(BareSiGNMove("R").amount).toBe(1);
    expect(BareSiGNMove("u").amount).toBe(1);
    expect(LayerSiGNMove(2, "R").amount).toBe(1);
    expect(LayerSiGNMove(3, "u").amount).toBe(1);
    expect(RangeSiGNMove(2, 3, "u").amount).toBe(1);
  });

  it("should allow different amounts 1", () => {
    expect(BareSiGNMove("x", 2).amount).toBe(2);
    expect(BareSiGNMove("R", 3).amount).toBe(3);
    expect(BareSiGNMove("u", -5).amount).toBe(-5);
    expect(LayerSiGNMove(2, "R", 10).amount).toBe(10);
    expect(LayerSiGNMove(3, "L", -13).amount).toBe(-13);
    expect(RangeSiGNMove(2, 12, "u", 15).amount).toBe(15);
  });

  it("should catch invalid moves with parseSiGN().", () => {
    expect(() => parseSiGN("R")).not.toThrowError();
    expect(() => parseSiGN("g")).toThrowError(/Invalid SiGN plain move family/);
    expect(() => parseSiGN("2Ww")).toThrowError(/The provided SiGN move family is invalid/);
    expect(() => parseSiGN("2-3T")).toThrowError(/The provided SiGN move family is invalid/);
    expect(() => parseSiGN("2-3UF")).toThrowError(/The provided SiGN move family is invalid/);
    expect(() => parseSiGN("4TEST_Hello")).toThrowError(/The provided SiGN move family is invalid/);
    expect(() => parseSiGN("_R")).toThrowError(/Invalid SiGN plain move family/);
  });
});

describe("algToString()", () => {
  it("should convert all move types correctly", () => {
    expect(algPartToStringForTesting(BareSiGNMove("x", 2))).toBe("x2");
    expect(algPartToStringForTesting(BareSiGNMove("R", 3))).toBe("R3");
    expect(algPartToStringForTesting(BareSiGNMove("u", -5))).toBe("u5'");
    expect(algPartToStringForTesting(LayerSiGNMove(2, "R", 10))).toBe("2R10");
    expect(algPartToStringForTesting(LayerSiGNMove(3, "L", -13))).toBe("3L13'");
    expect(algPartToStringForTesting(RangeSiGNMove(2, 12, "u", 15))).toBe("2-12u15");
  });

  it("should distinguish between 1R and R", () => {
    expect(algPartToStringForTesting(LayerSiGNMove(1, "R"))).toBe("1R");
    expect(algPartToStringForTesting(BareSiGNMove("R"))).toBe("R");
  });

  it("should handle empty sequences", () => {
    expect(algToString(new Sequence([]))).toBe("");
    expect(algPartToStringForTesting(new Group(new Sequence([])))).toBe("()");
    // TODO: Should this be "[,]"
    expect(algToString(
      new Sequence([
        new Commutator(
          new Sequence([]),
          new Sequence([])
        )
      ])
    )).toBe("[, ]");
  });

  it("should convert Sune to string", () => {
    expect(algToString(Ex.Sune)).toBe("R U R' U R U2' R'");
  });

  it("should convert U U to string", () => {
    expect(algToString(UU)).toBe("U U");
  });

 it("should convert E-Perm to string", () => {
   expect(algToString(Ex.EPerm)).toBe("x' [[R: U'], D] [[R: U], D] x");
 });

  it("should convert triple pause to ... (without spaces)", () => {
    expect(algToString(Ex.TriplePause)).toBe("...");
  });
});

describe("Traversal", () => {
  class FakePause extends Unit {
    public type: string = "pause";
  }

  it("cannot subclass directly", () => {
    expect(() => algPartToStringForTesting(new FakePause())).toThrowError(/Alg part is not an object of type Pause despite having "type": "pause"/);
  });
});

describe("invert()", () => {
  it("should correctly invert", () => {
    e(invert(Ex.Sune), Ex.AntiSune).toBe(true);
    e(invert(invert(Ex.Sune)), Ex.Sune).toBe(true);
    e(invert(invert(Ex.Sune)), Ex.AntiSune).toBe(false);
  });
});

describe("expand()", () => {
  it("should correctly expand", () => {
    e(expand(Ex.FURURFCompact), Ex.FURURFMoves).toBe(true);
    e(expand(Ex.Sune), Ex.Sune).toBe(true);
    e(expand(Ex.SuneCommutator), Ex.Sune).toBe(false);
    e(expand(Ex.FURURFCompact), expand(Ex.SuneCommutator)).toBe(false);
  });

  it("should correctly expand a group with two units", () => {
    e(expand(parse("(R U)2")), parse("R U R U")).toBe(true);
  });

  it("should correctly expand an E-Perm", () => {
    e(expand(Ex.EPerm), parse("x' R U' R' D R U R' D' R U R' D R U' R' D' x")).toBe(true);
  });
});

describe("structureEquals", () => {
  it("should correctly compare", () => {
    e(Ex.FURURFCompact, Ex.FURURFMoves).toBe(false);
    e(Ex.FURURFMoves, Ex.FURURFCompact).toBe(false);
    e(Ex.FURURFMoves, Ex.FURURFMoves).toBe(true);
    e(Ex.FURURFCompact, Ex.FURURFCompact).toBe(true);
  });
});

describe("coalesceBaseMoves()", () => {
  it("should coalesce U U to U2", () => {
    e(coalesceBaseMoves(UU), U2).toBe(true);
    expect(algToString(coalesceBaseMoves(UU))).toBe("U2");
  });

  it("should coalesce expanded commutator Sune corectly", () => {
    e(coalesceBaseMoves(expand(Ex.SuneCommutator)), Ex.Sune).toBe(true);
  });
});

describe("JSON", () => {
  it("should round-trip an alg through JSON stringification", () => {
    e(fromJSON(JSON.parse(JSON.stringify(Ex.FURURFCompact))),
      Ex.FURURFCompact).toBe(true);
  });
});

describe("Object Freezing", () => {
  it("should freeze all example alg types", () => {
    // Update this based on the length of AllAlgParts.
    expect(Ex.AllAlgParts.length).toBe(9);
    for (var a of Ex.AllAlgParts) {
      expect(Object.isFrozen(a)).toBe(true);
    }
  });

  it("should freeze `nestedUnits` list on Sequence", () => {
    // Update this based on the length of AllAlgParts.
    expect(Object.isFrozen(new Sequence([BareSiGNMove("R", 1)]).nestedUnits)).toBe(true);
  });

  it("should not be possible to modify a BaseMove", () => {
      var b = BareSiGNMove("R", 4);
      var e: Error | undefined;
      try {
        b.amount = 2;
      } catch (err) {
        e = err;
      }
      expect(e instanceof TypeError).toBe(true);
  });
});

describe("Parser", () => {
  it("should parse an empty sequence", () => {
    e(parse(""), new Sequence([])).toBe(true);
    e(parse("()"), new Sequence([new Group(new Sequence([]))])).toBe(true);
  });

  it("should parse a Sune", () => {
    e(parse("R U R' U R U2' R'"), Ex.Sune).toBe(true);
  });

  it("should parse U u Uw x 2U 2u 2Uw 2-3u 2-3Uw", () => {
    const s = "U u Uw x 2U 2u 2Uw 2-3u 2-3Uw";
    expect(algToString(parse(s))).toBe(s);
  });

  it("should parse ...", () => {
    const p = new Pause();
    e(parse("..."), new Sequence([p, p, p])).toBe(true);
  });

  // TODO: Should these be parsed differently?
  it("should parse R and R1 as the same (for now)", () => {
    e(parse("R"), parse("R1")).toBe(true);
  });

  it("should round-trip algs through a string", () => {
    e(parse(algToString(Ex.SuneCommutator)), Ex.SuneCommutator).toBe(true);
    e(parse(algToString(Ex.Niklas)), Ex.Niklas).toBe(true);
    e(parse(algToString(Ex.FURURFCompact)), Ex.FURURFCompact).toBe(true);
    e(parse(algToString(Ex.APermCompact)), Ex.APermCompact).toBe(true);
    e(parse(algToString(Ex.TPerm)), Ex.TPerm).toBe(true);
    e(parse(algToString(Ex.HeadlightSwaps)), Ex.HeadlightSwaps).toBe(true);
    e(parse(algToString(Ex.TriplePause)), Ex.TriplePause).toBe(true);
  });

  it("should round-trip all alg types through a string", () => {
    // Update this based on the length of AllAlgParts.
    for (var a of Ex.AllAlgParts) {
      var seq = (a instanceof Sequence) ? a : new Sequence([a]);
      e(parse(algToString(seq)), seq).toBe(true);
    }
  });
});

describe("Validator", () => {
  it("can validate flat algs", () => {
    expect(() => parse("(R)",  {validators: [validateFlatAlg]})).toThrowError(ValidationError, /cannot contain a group/);
    expect(() => parse("Qw",   {validators: [validateFlatAlg]})).not.toThrowError();
    expect(() => parse("(Qw)", {validators: [validateFlatAlg]})).toThrowError(ValidationError, /cannot contain a group/);
  });
  it("can validate cube base moves alg", () => {
    expect(() => parse("(R)",  {validators: [validateSiGNMoves]})).not.toThrowError();
    expect(() => parse("Qw",   {validators: [validateSiGNMoves]})).toThrowError(ValidationError, /Invalid SiGN plain move family/);
    expect(() => parse("(Qw)", {validators: [validateSiGNMoves]})).toThrowError(ValidationError, /Invalid SiGN plain move family/);
  });
  it("can validate cube algs", () => {
    expect(() => parse("(R)",  {validators: [validateSiGNAlg]})).toThrowError(ValidationError, /cannot contain a group/);
    expect(() => parse("Qw",   {validators: [validateSiGNAlg]})).toThrowError(ValidationError, /Invalid SiGN plain move family/);
    expect(() => parse("(Qw)", {validators: [validateSiGNAlg]})).toThrowError(ValidationError);
  });
});

