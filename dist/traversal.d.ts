import { Algorithm, Unit, Sequence, Group, BlockMove, Commutator, Conjugate, Pause, NewLine, CommentShort, CommentLong } from "./algorithm";
export declare abstract class DownUp<DataDown, DataUp> {
    traverse(algorithm: Algorithm, dataDown: DataDown): DataUp;
    traverseIntoUnit(algorithm: Algorithm, dataDown: DataDown): Unit;
    abstract traverseSequence(sequence: Sequence, dataDown: DataDown): DataUp;
    abstract traverseGroup(group: Group, dataDown: DataDown): DataUp;
    abstract traverseBlockMove(blockMove: BlockMove, dataDown: DataDown): DataUp;
    abstract traverseCommutator(commutator: Commutator, dataDown: DataDown): DataUp;
    abstract traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataUp;
    abstract traversePause(pause: Pause, dataDown: DataDown): DataUp;
    abstract traverseNewLine(newLine: NewLine, dataDown: DataDown): DataUp;
    abstract traverseCommentShort(commentShort: CommentShort, dataDown: DataDown): DataUp;
    abstract traverseCommentLong(commentLong: CommentLong, dataDown: DataDown): DataUp;
}
export declare abstract class Up<DataUp> extends DownUp<undefined, DataUp> {
    traverse(algorithm: Algorithm): DataUp;
    traverseIntoUnit(algorithm: Algorithm): Unit;
    abstract traverseSequence(sequence: Sequence): DataUp;
    abstract traverseGroup(group: Group): DataUp;
    abstract traverseBlockMove(blockMove: BlockMove): DataUp;
    abstract traverseCommutator(commutator: Commutator): DataUp;
    abstract traverseConjugate(conjugate: Conjugate): DataUp;
    abstract traversePause(pause: Pause): DataUp;
    abstract traverseNewLine(newLine: NewLine): DataUp;
    abstract traverseCommentShort(commentShort: CommentShort): DataUp;
    abstract traverseCommentLong(commentLong: CommentLong): DataUp;
}
export declare class Invert extends Up<Algorithm> {
    traverseSequence(sequence: Sequence): Sequence;
    traverseGroup(group: Group): Algorithm;
    traverseBlockMove(blockMove: BlockMove): Algorithm;
    traverseCommutator(commutator: Commutator): Algorithm;
    traverseConjugate(conjugate: Conjugate): Algorithm;
    traversePause(pause: Pause): Algorithm;
    traverseNewLine(newLine: NewLine): Algorithm;
    traverseCommentShort(commentShort: CommentShort): Algorithm;
    traverseCommentLong(commentLong: CommentLong): Algorithm;
}
export declare class Expand extends Up<Algorithm> {
    private flattenSequenceOneLevel;
    private repeat;
    traverseSequence(sequence: Sequence): Sequence;
    traverseGroup(group: Group): Algorithm;
    traverseBlockMove(blockMove: BlockMove): Algorithm;
    traverseCommutator(commutator: Commutator): Algorithm;
    traverseConjugate(conjugate: Conjugate): Algorithm;
    traversePause(pause: Pause): Algorithm;
    traverseNewLine(newLine: NewLine): Algorithm;
    traverseCommentShort(commentShort: CommentShort): Algorithm;
    traverseCommentLong(commentLong: CommentLong): Algorithm;
}
export declare class StructureEquals extends DownUp<Algorithm, boolean> {
    traverseSequence(sequence: Sequence, dataDown: Algorithm): boolean;
    traverseGroup(group: Group, dataDown: Algorithm): boolean;
    traverseBlockMove(blockMove: BlockMove, dataDown: Algorithm): boolean;
    traverseCommutator(commutator: Commutator, dataDown: Algorithm): boolean;
    traverseConjugate(conjugate: Conjugate, dataDown: Algorithm): boolean;
    traversePause(pause: Pause, dataDown: Algorithm): boolean;
    traverseNewLine(newLine: NewLine, dataDown: Algorithm): boolean;
    traverseCommentShort(commentShort: CommentShort, dataDown: Algorithm): boolean;
    traverseCommentLong(commentLong: CommentLong, dataDown: Algorithm): boolean;
}
export declare class CoalesceBaseMoves extends Up<Algorithm> {
    private sameBlock;
    traverseSequence(sequence: Sequence): Sequence;
    traverseGroup(group: Group): Algorithm;
    traverseBlockMove(blockMove: BlockMove): Algorithm;
    traverseCommutator(commutator: Commutator): Algorithm;
    traverseConjugate(conjugate: Conjugate): Algorithm;
    traversePause(pause: Pause): Algorithm;
    traverseNewLine(newLine: NewLine): Algorithm;
    traverseCommentShort(commentShort: CommentShort): Algorithm;
    traverseCommentLong(commentLong: CommentLong): Algorithm;
}
export declare class ToString extends Up<string> {
    private repetitionSuffix;
    private spaceBetween;
    traverseSequence(sequence: Sequence): string;
    traverseGroup(group: Group): string;
    traverseBlockMove(blockMove: BlockMove): string;
    traverseCommutator(commutator: Commutator): string;
    traverseConjugate(conjugate: Conjugate): string;
    traversePause(pause: Pause): string;
    traverseNewLine(newLine: NewLine): string;
    traverseCommentShort(commentShort: CommentShort): string;
    traverseCommentLong(commentLong: CommentLong): string;
}
export declare const invert: (a: Algorithm) => Algorithm;
export declare const expand: (a: Algorithm) => Algorithm;
export declare const structureEquals: (a: Algorithm, dataDown: Algorithm) => boolean;
export declare const coalesceBaseMoves: (a: Algorithm) => Algorithm;
export declare const algToString: (a: Algorithm) => string;
