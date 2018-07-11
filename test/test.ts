import * as Alg from "../src/algorithm"
import {BlockMove as BM} from "../src/algorithm"
import {Example as Ex} from "../src/example"
import {
  invert,
  expand,
  structureEquals,
  coalesceBaseMoves,
  algToString
} from "../src/traversal"
import {fromJSON} from "../src/json"
import {parse} from "../src/parser"

import { expect } from "chai";
import "mocha";

var U  = new BM("U", 1);
var UU = new Alg.Sequence([new BM("U", 1), new BM("U", 1)]);
var U2 = new Alg.Sequence([new BM("U", 2)]);
var R  = new Alg.Sequence([new BM("R", 1)]);

describe("algToString()", () => {
  it("should convert Sune to string", () => {
    expect(algToString(Ex.Sune)).to.equal("R U R' U R U2' R'");
  });

  it("should convert U U to string", () => {
    expect(algToString(UU)).to.equal("U U");
  });
});

var e = function(a1: Alg.Algorithm, a2: Alg.Algorithm) {
  return expect(structureEquals(a1, a2));
}

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

describe("Parser", () => {
  it("should parse a Sune", () => {
    e(parse("R U R' U R U2' R'"), Ex.Sune).to.be.true;
  });

  it("should round-trip algs through a string", () => {
    e(parse(algToString(Ex.SuneCommutator)), Ex.SuneCommutator).to.be.true;
    e(parse(algToString(Ex.Niklas)), Ex.Niklas).to.be.true;
    e(parse(algToString(Ex.FURURFCompact)), Ex.FURURFCompact).to.be.true;
    e(parse(algToString(Ex.APermCompact)), Ex.APermCompact).to.be.true;
    e(parse(algToString(Ex.TPerm)), Ex.TPerm).to.be.true;
    e(parse(algToString(Ex.HeadlightSwaps)), Ex.HeadlightSwaps).to.be.true;
  });

  it("should round-trip all alg types through a string", () => {
    // Update this based on the length of AllAlgTypes.
    for (var a of Ex.AllAlgTypes) {
      e(parse(algToString(a)), a).to.be.true;
    }
  });
});
