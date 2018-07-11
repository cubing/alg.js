// TODO Figure out if we can create a default global easily.
// export as namespace Alg;

export {
  Algorithm,
  Repeatable,
  MoveFamily,
  Sequence,
  Group,
  BaseMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong
} from "./algorithm";

export {
  clone,
  invert,
  expand,
  countBaseMoves,
  structureEquals,
  coalesceMoves,
  concat,
  algToString
} from "./traversal";

export {Example} from "./example"

export {AlgorithmJSON, fromJSON} from "./json"
