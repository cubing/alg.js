import {
  AlgPart,
  Sequence,
  Group,
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

  export const SuneCommutator: Sequence = new Sequence([new Commutator(
    new Sequence([
      BareSiGNMove("R",  1),
      BareSiGNMove("U",  1),
      BareSiGNMove("R", -2)
    ]),
    new Sequence([new Conjugate(
      new Sequence([BareSiGNMove("R",  1)]),
      new Sequence([BareSiGNMove("U",  1)]),
      1
    )]),
    1
  )]);

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
      new Sequence([new Conjugate(
        new Sequence([BareSiGNMove("R", 1)]),
        new Sequence([BareSiGNMove("U", -1)])
      )]),
      new Sequence([BareSiGNMove("D", 1)]),
      1
    ),
    new Commutator(
      new Sequence([new Conjugate(
        new Sequence([BareSiGNMove("R", 1)]),
        new Sequence([BareSiGNMove("U", 1)])
      )]),
      new Sequence([BareSiGNMove("D", 1)]),
      1
    ),
    BareSiGNMove("x", 1)
  ]);

  export const FURURFCompact: Sequence = new Sequence([new Conjugate(
    new Sequence([BareSiGNMove("F",  1)]),
    new Sequence([new Commutator(
      new Sequence([BareSiGNMove("U",  1)]),
      new Sequence([BareSiGNMove("R",  1)]),
      1
    )]),
    1
  )]);

  export const APermCompact: Sequence = new Sequence([new Conjugate(
    new Sequence([BareSiGNMove("R", 2)]),
    new Sequence([new Commutator(
      new Sequence([BareSiGNMove("F", 2)]),
      new Sequence([
        BareSiGNMove("R", -1),
        BareSiGNMove("B", -1),
        BareSiGNMove("R", 1),
      ]),
      1
    )]),
    1
  )]);

  export const FURURFMoves: Sequence = new Sequence([
    BareSiGNMove("F",  1),
    BareSiGNMove("U",  1),
    BareSiGNMove("R",  1),
    BareSiGNMove("U", -1),
    BareSiGNMove("R", -1),
    BareSiGNMove("F", -1)
  ]);

  export const TPerm: Sequence = new Sequence([
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


  export const HeadlightSwaps: Sequence = new Sequence([new Conjugate(
    new Sequence([BareSiGNMove("F", 1)]),
    new Sequence([new Commutator(
      new Sequence([BareSiGNMove("R", 1)]),
      new Sequence([BareSiGNMove("U", 1)]),
      3
    )]),
    1
  )]);


  export const TriplePause: Sequence = new Sequence([
      new Pause(),
      new Pause(),
      new Pause(),
    ]
  );


  export const AllAlgParts: AlgPart[] = [
    new Sequence([BareSiGNMove("R", 1), BareSiGNMove("U", -1)]),
    new Group(new Sequence([BareSiGNMove("F", 1)]), 2),
    // new Rotation("y", -1),
    BareSiGNMove("R", 2),
    new Commutator(new Sequence([BareSiGNMove("R", 2)]), new Sequence([BareSiGNMove("U", 2)]), 2),
    new Conjugate(new Sequence([BareSiGNMove("L", 2)]), new Sequence([BareSiGNMove("D", -1)]), 2),
    new Pause(),
    new NewLine(),
    new CommentShort("short comment"),
    new CommentLong("long comment")
  ];

}
