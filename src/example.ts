import {
  Algorithm,
  Unit,
  BaseMove,
  Sequence,
  Group,
  MoveFamily,
  SiGNMove,
  BareSiGNMove,
  Commutator,
  Conjugate,
  Pause,
  NewLine,
  CommentShort,
  CommentLong
} from "./algorithm";

export namespace Example {

  export const Sune: Sequence = new Sequence([
    BareSiGNMove("R",  1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R", -1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R",  1),
    BareSiGNMove("U", -2),
    BareSiGNMove("R", -1)
  ]);

  export const AntiSune: Sequence = new Sequence([
    BareSiGNMove("R",  1),
    BareSiGNMove("U",  2),
    BareSiGNMove("R", -1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R",  1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R", -1)
  ]);

  export const SuneCommutator: Algorithm = new Commutator(
    new Sequence([
      BareSiGNMove("R",  1),
      BareSiGNMove("U",  1),
      BareSiGNMove("R", -2)
    ]),
    new Conjugate(
      BareSiGNMove("R",  1),
      BareSiGNMove("U",  1),
      1
    ),
    1
  )

  export const Niklas: Sequence = new Sequence([
    BareSiGNMove("R",  1),
    BareSiGNMove("U",  -1),
    BareSiGNMove("L", -1),
    BareSiGNMove("U", 1),
    BareSiGNMove("R",  -1),
    BareSiGNMove("U",  -1),
    BareSiGNMove("L", 1),
    BareSiGNMove("U", 1)
  ]);

  export const EPerm: Sequence = new Sequence([
    BareSiGNMove("x", -1),
    new Commutator(
      new Conjugate(BareSiGNMove("R", 1), BareSiGNMove("U", -1), 1),
      BareSiGNMove("D", 1),
      1
    ),
    new Commutator(
      new Conjugate(BareSiGNMove("R", 1), BareSiGNMove("U", 1), 1),
      BareSiGNMove("D", 1),
      1
    ),
    BareSiGNMove("x", 1)
  ]);

  export const FURURFCompact: Algorithm = new Conjugate(
    BareSiGNMove("F",  1),
    new Commutator(
      BareSiGNMove("U",  1),
      BareSiGNMove("R",  1),
      1
    ),
    1
  );

  export const APermCompact: Algorithm = new Conjugate(
    BareSiGNMove("R", 2),
    new Commutator(
      BareSiGNMove("F", 2),
      new Sequence([
        BareSiGNMove("R", -1),
        BareSiGNMove("B", -1),
        BareSiGNMove("R", 1),
      ]),
      1
    ),
    1
  );

  export const FURURFMoves: Algorithm = new Sequence([
    BareSiGNMove("F",  1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R",  1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R", -1),
    BareSiGNMove("F", -1)
  ]);

  export const TPerm: Algorithm = new Sequence([
    BareSiGNMove("R",  1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R", -1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R", -1),
    BareSiGNMove("F",  1),
    BareSiGNMove("R",  2),
    BareSiGNMove("U", -1),
    BareSiGNMove("R", -1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R",  1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R", -1),
    BareSiGNMove("F", -1)
  ]);


  export const HeadlightSwaps: Algorithm = new Conjugate(
    BareSiGNMove("F", 1),
    new Commutator(
      BareSiGNMove("R", 1),
      BareSiGNMove("U", 1),
      3
    ),
    1
  );


  export const TriplePause: Algorithm = new Sequence([
      new Pause(),
      new Pause(),
      new Pause(),
    ]
  );


  export const AllAlgTypes: Algorithm[] = [
    new Sequence([BareSiGNMove("R", 1), BareSiGNMove("U", -1)]),
    new Group(BareSiGNMove("F", 1), 2),
    // new Rotation("y", -1),
    BareSiGNMove("R", 2),
    new Commutator(BareSiGNMove("R", 2), BareSiGNMove("U", 2), 2),
    new Conjugate(BareSiGNMove("L", 2), BareSiGNMove("D", -1), 2),
    new Pause(),
    new NewLine(),
    new CommentShort("short comment"),
    new CommentLong("long comment")
  ];

}
