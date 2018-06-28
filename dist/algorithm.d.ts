import { Traversal } from "./traversal";
export declare abstract class Algorithm {
    abstract readonly type: string;
    abstract dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
    protected freeze(): void;
    clone(): Algorithm;
    invert(): Algorithm;
    expand(): Algorithm;
    countBaseMoves(): number;
    coalesceMoves(): Algorithm;
    toString(): string;
    structureEquals(nestedAlg: Algorithm): boolean;
    concat(nestedAlg: Algorithm): Sequence;
}
export declare abstract class Repeatable extends Algorithm {
    amount: number;
    constructor(amount: number);
}
export declare type MoveFamily = string;
export declare class Sequence extends Algorithm {
    nestedAlgs: Algorithm[];
    type: string;
    constructor(nestedAlgs: Algorithm[]);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class Group extends Repeatable {
    nestedAlg: Algorithm;
    type: string;
    constructor(nestedAlg: Algorithm, amount: number);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class BaseMove extends Repeatable {
    family: MoveFamily;
    type: string;
    layer?: number;
    startLayer?: number;
    endLayer?: number;
    constructor(family: MoveFamily, amount: number);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class Commutator extends Repeatable {
    A: Algorithm;
    B: Algorithm;
    type: string;
    constructor(A: Algorithm, B: Algorithm, amount: number);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class Conjugate extends Repeatable {
    A: Algorithm;
    B: Algorithm;
    type: string;
    constructor(A: Algorithm, B: Algorithm, amount: number);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class Pause extends Algorithm {
    type: string;
    constructor();
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class NewLine extends Algorithm {
    type: string;
    constructor();
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class CommentShort extends Algorithm {
    comment: string;
    type: string;
    constructor(comment: string);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
export declare class CommentLong extends Algorithm {
    comment: string;
    type: string;
    constructor(comment: string);
    dispatch<DataDown, DataUp>(t: Traversal.DownUp<DataDown, DataUp>, dataDown: DataDown): DataUp;
}
