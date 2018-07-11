export declare abstract class Algorithm {
    abstract readonly type: string;
    protected freeze(): void;
}
export declare class Sequence extends Algorithm {
    nestedAlgs: Algorithm[];
    type: string;
    constructor(nestedAlgs: Algorithm[]);
}
export declare abstract class Repeatable extends Algorithm {
    amount: number;
    constructor(amount: number);
}
export declare type MoveFamily = string;
export declare class Group extends Repeatable {
    nestedAlg: Algorithm;
    type: string;
    constructor(nestedAlg: Algorithm, amount: number);
}
export declare abstract class BaseMove extends Repeatable {
}
export declare class BlockMove extends BaseMove {
    family: MoveFamily;
    type: string;
    constructor(family: MoveFamily, amount: number);
}
export declare class Commutator extends Repeatable {
    A: Algorithm;
    B: Algorithm;
    type: string;
    constructor(A: Algorithm, B: Algorithm, amount: number);
}
export declare class Conjugate extends Repeatable {
    A: Algorithm;
    B: Algorithm;
    type: string;
    constructor(A: Algorithm, B: Algorithm, amount: number);
}
export declare class Pause extends Algorithm {
    type: string;
    constructor();
}
export declare class NewLine extends Algorithm {
    type: string;
    constructor();
}
export declare class CommentShort extends Algorithm {
    comment: string;
    type: string;
    constructor(comment: string);
}
export declare class CommentLong extends Algorithm {
    comment: string;
    type: string;
    constructor(comment: string);
}
