import {BaseMove} from "./alg-part"

// TODO: Move SiGN move defs into a separate file.
export type MoveFamily = string; // TODO: Convert to an enum with string mappings.

// TODO: Handle layers
export class SiGNMove extends BaseMove {
  public type: string = "signMove";

  // If `outerLayer` is set, `innerLayer` must also be set.
  public outerLayer?: number;
  public innerLayer?: number;
  constructor(outerLayer: number | undefined, innerLayer: number | undefined, public family: MoveFamily, amount?: number) {
    super(amount);
    this.outerLayer = outerLayer;
    this.innerLayer = innerLayer;
    this.freeze();
  }
}

export function BareSiGNMove(family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(undefined, undefined, family, amount);
}

export function LayerSiGNMove(innerLayer: number, family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(undefined, innerLayer, family, amount);
}

export function RangeSiGNMove(outerLayer: number,innerLayer: number, family: MoveFamily, amount?: number): SiGNMove {
  return new SiGNMove(outerLayer, innerLayer, family, amount);
}
