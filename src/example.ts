import {Algorithm, Sequence, BaseMove, Commutator, Group, Conjugate, Pause, NewLine, CommentShort, CommentLong} from "./algorithm"

"use strict";

export namespace Example {

  export const Sune: Sequence = new Sequence([
    new BaseMove("R", 1),
    new BaseMove("U", 1),
    new BaseMove("R", -1),
    new BaseMove("U", 1),
    new BaseMove("R", 1),
    new BaseMove("U", -2),
    new BaseMove("R", -1)
  ]);

  export const AntiSune: Sequence = new Sequence([
    new BaseMove("R", 1),
    new BaseMove("U", 2),
    new BaseMove("R", -1),
    new BaseMove("U", -1),
    new BaseMove("R", 1),
    new BaseMove("U", -1),
    new BaseMove("R", -1)
  ]);

  export const SuneCommutator: Algorithm = new Commutator(
    new Sequence([
      new BaseMove("R", 1),
      new BaseMove("U", 1),
      new BaseMove("R", -2)
    ]),
    new Sequence([
      new BaseMove("R", 1),
      new BaseMove("U", 1),
      new BaseMove("R", -1)
    ]),
    1
  )

  export const Niklas: Sequence = new Sequence([
    new BaseMove("R", 1),
    new BaseMove("U", -1),
    new BaseMove("L", -1),
    new BaseMove("U", 1),
    new BaseMove("R", -1),
    new BaseMove("U", -1),
    new BaseMove("L", 1),
    new BaseMove("U", 1)
  ]);

  export const FURURFCompact: Algorithm = new Conjugate(
    new BaseMove("F", 1),
    new Commutator(
      new BaseMove("U", 1),
      new BaseMove("R", 1),
      1
    ),
    1
  );

  export const APermCompact: Algorithm = new Conjugate(
    new BaseMove("R", 2),
    new Commutator(
      new BaseMove("F", 2),
      new Sequence([
        new BaseMove("R", -1),
        new BaseMove("B", -1),
        new BaseMove("R", 1),
      ]),
      1
    ),
    1
  );

  export const FURURFMoves: Algorithm = new Sequence([
    new BaseMove("F", 1),
    new BaseMove("U", 1),
    new BaseMove("R", 1),
    new BaseMove("U", -1),
    new BaseMove("R", -1),
    new BaseMove("F", -1)
  ]);

  export const TPerm: Algorithm = new Sequence([
    new BaseMove("R", 1),
    new BaseMove("U", 1),
    new BaseMove("R", -1),
    new BaseMove("U", -1),
    new BaseMove("R", -1),
    new BaseMove("F", 1),
    new BaseMove("R", 2),
    new BaseMove("U", -1),
    new BaseMove("R", -1),
    new BaseMove("U", -1),
    new BaseMove("R", 1),
    new BaseMove("U", 1),
    new BaseMove("R", -1),
    new BaseMove("F", -1)
  ]);


  export const HeadlightSwaps: Algorithm = new Conjugate(
    new BaseMove("F", 1),
    new Commutator(
      new BaseMove("R", 1),
      new BaseMove("U", 1),
      3
    ),
    1
  );


  export const AllAlgTypes: Algorithm[] = [
    new Sequence([new BaseMove("R", 1), new BaseMove("U", -1)]),
    new Group(new BaseMove("F", 1), 2),
    new BaseMove("R", 2),
    new Commutator(new BaseMove("R", 2), new BaseMove("U", 2), 2),
    new Conjugate(new BaseMove("L", 2), new BaseMove("D", -1), 2),
    new Pause(),
    new NewLine(),
    new CommentShort("short comment"),
    new CommentLong("long comment")
  ];

}
