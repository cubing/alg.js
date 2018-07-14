import {
  Algorithm,
  Unit,
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

// TODO: Turn this into a union.
export interface AlgorithmJSON {
  type: string;
  nestedAlg?: AlgorithmJSON;
  nestedAlgs?: AlgorithmJSON[];
  innerLayer?: number;
  outerLayer?: number;
  family?: string;
  amount?: number;
  A?: AlgorithmJSON;
  B?: AlgorithmJSON;
  comment?: string;
}

// TODO: Implement using Traversal?
export function fromJSON(json: AlgorithmJSON): Algorithm {
  switch (json.type) {
    case "sequence":
      if (!json.nestedAlgs) { throw "Missing nestedAlgs" }
      return new Sequence(json.nestedAlgs.map(j => fromJSON(j)));
    case "group":
      if (!json.nestedAlg) { throw "Missing nestedAlg" }
      if (!json.amount) { throw "Missing amount" }
      return new Group(fromJSON(json.nestedAlg), json.amount);
    case "signMove":
      // TODO: Double-check that there is no outer layer without an inner layer?
      if (!json.family) { throw "Missing family" }
      if (!json.amount) { throw "Missing amount" }
      return new SiGNMove(json.outerLayer, json.innerLayer, json.family, json.amount);
    case "commutator":
      if (!json.A) { throw "Missing A" }
      if (!json.B) { throw "Missing B" }
      if (!json.amount) { throw "Missing amount" }
      return new Commutator(fromJSON(json.A), fromJSON(json.B), json.amount);
    case "conjugate":
      if (!json.A) { throw "Missing A" }
      if (!json.B) { throw "Missing B" }
      if (!json.amount) { throw "Missing amount" }
      return new Conjugate(fromJSON(json.A), fromJSON(json.B), json.amount);
    case "pause":
      return new Pause();
    case "newLine":
      return new NewLine();
    case "commentShort":
      if (!json.comment) { throw "Missing comment" }
      return new CommentShort(json.comment);
    case "commentLong":
      if (!json.comment) { throw "Missing comment" }
      return new CommentLong(json.comment);
    default:
      throw `Unknown alg type: ${json.type}`;
  }
}
