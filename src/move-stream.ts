import {Sequence, Unit} from "./algorithm"

type MoveInProgress = {
  move: Unit // TODO: Scope down to BaseMove? Also needs to include things like Pause, though.
  amount: number
}

interface MoveStream {
  history(): Sequence;
  current(): MoveInProgress[];
  // TODO: Emit finished moves?
}

export class SimpleMoveStream implements MoveStream {
  private historyMoves: Unit[] = [];
  private currentMoves: MoveInProgress[] = [];
  private queued: Unit[];
  queueMove(m: Unit): void {
    this.queued.push(m);
  }
  history(): Sequence {
    return new Sequence(this.historyMoves.slice(0));
  }
  current(): MoveInProgress[] {
    return this.currentMoves;
  }
}
