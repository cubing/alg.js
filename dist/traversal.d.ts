import { Algorithm, Sequence, Rotation, BlockMove, Commutator, Group, Conjugate, Pause, NewLine, CommentShort, CommentLong } from "./algorithm";
export declare namespace Traversal {
    abstract class DownUp<DataDown, DataUp> {
        traverse(algorithm: Algorithm, dataDown: DataDown): DataUp;
        abstract traverseSequence(sequence: Sequence, dataDown: DataDown): DataUp;
        abstract traverseGroup(group: Group, dataDown: DataDown): DataUp;
        abstract traverseBlockMove(blockMove: BlockMove, dataDown: DataDown): DataUp;
        abstract traverseRotation(rotation: Rotation, dataDown: DataDown): DataUp;
        abstract traverseCommutator(commutator: Commutator, dataDown: DataDown): DataUp;
        abstract traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataUp;
        abstract traversePause(pause: Pause, dataDown: DataDown): DataUp;
        abstract traverseNewLine(newLine: NewLine, dataDown: DataDown): DataUp;
        abstract traverseCommentShort(commentShort: CommentShort, dataDown: DataDown): DataUp;
        abstract traverseCommentLong(commentLong: CommentLong, dataDown: DataDown): DataUp;
    }
    abstract class Up<DataUp> extends DownUp<undefined, DataUp> {
        traverse(algorithm: Algorithm): DataUp;
        abstract traverseSequence(sequence: Sequence): DataUp;
        abstract traverseGroup(group: Group): DataUp;
        abstract traverseBlockMove(blockMove: BlockMove): DataUp;
        abstract traverseRotation(rotation: Rotation): DataUp;
        abstract traverseCommutator(commutator: Commutator): DataUp;
        abstract traverseConjugate(conjugate: Conjugate): DataUp;
        abstract traversePause(pause: Pause): DataUp;
        abstract traverseNewLine(newLine: NewLine): DataUp;
        abstract traverseCommentShort(commentShort: CommentShort): DataUp;
        abstract traverseCommentLong(commentLong: CommentLong): DataUp;
    }
    class Clone extends Up<Algorithm> {
        traverseSequence(sequence: Sequence): Sequence;
        traverseGroup(group: Group): Algorithm;
        traverseRotation(rotation: Rotation): Algorithm;
        traverseBlockMove(blockMove: BlockMove): Algorithm;
        traverseCommutator(commutator: Commutator): Algorithm;
        traverseConjugate(conjugate: Conjugate): Algorithm;
        traversePause(pause: Pause): Algorithm;
        traverseNewLine(newLine: NewLine): Algorithm;
        traverseCommentShort(commentShort: CommentShort): Algorithm;
        traverseCommentLong(commentLong: CommentLong): Algorithm;
    }
    class Invert extends Up<Algorithm> {
        traverseSequence(sequence: Sequence): Sequence;
        traverseGroup(group: Group): Algorithm;
        traverseRotation(rotation: Rotation): Algorithm;
        traverseBlockMove(blockMove: BlockMove): Algorithm;
        traverseCommutator(commutator: Commutator): Algorithm;
        traverseConjugate(conjugate: Conjugate): Algorithm;
        traversePause(pause: Pause): Algorithm;
        traverseNewLine(newLine: NewLine): Algorithm;
        traverseCommentShort(commentShort: CommentShort): Algorithm;
        traverseCommentLong(commentLong: CommentLong): Algorithm;
    }
    class Expand extends Up<Algorithm> {
        private flattenSequenceOneLevel;
        private repeat;
        traverseSequence(sequence: Sequence): Sequence;
        traverseGroup(group: Group): Algorithm;
        traverseRotation(rotation: Rotation): Algorithm;
        traverseBlockMove(blockMove: BlockMove): Algorithm;
        traverseCommutator(commutator: Commutator): Algorithm;
        traverseConjugate(conjugate: Conjugate): Algorithm;
        traversePause(pause: Pause): Algorithm;
        traverseNewLine(newLine: NewLine): Algorithm;
        traverseCommentShort(commentShort: CommentShort): Algorithm;
        traverseCommentLong(commentLong: CommentLong): Algorithm;
    }
    class CountBaseMoves extends Up<number> {
        traverseSequence(sequence: Sequence): number;
        traverseGroup(group: Group): number;
        traverseRotation(rotation: Rotation): number;
        traverseBlockMove(blockMove: BlockMove): number;
        traverseCommutator(commutator: Commutator): number;
        traverseConjugate(conjugate: Conjugate): number;
        traversePause(pause: Pause): number;
        traverseNewLine(newLine: NewLine): number;
        traverseCommentShort(commentShort: CommentShort): number;
        traverseCommentLong(commentLong: CommentLong): number;
    }
    class StructureEquals extends DownUp<Algorithm, boolean> {
        traverseSequence(sequence: Sequence, dataDown: Algorithm): boolean;
        traverseGroup(group: Group, dataDown: Algorithm): boolean;
        traverseRotation(rotation: Rotation, dataDown: Algorithm): boolean;
        traverseBlockMove(blockMove: BlockMove, dataDown: Algorithm): boolean;
        traverseCommutator(commutator: Commutator, dataDown: Algorithm): boolean;
        traverseConjugate(conjugate: Conjugate, dataDown: Algorithm): boolean;
        traversePause(pause: Pause, dataDown: Algorithm): boolean;
        traverseNewLine(newLine: NewLine, dataDown: Algorithm): boolean;
        traverseCommentShort(commentShort: CommentShort, dataDown: Algorithm): boolean;
        traverseCommentLong(commentLong: CommentLong, dataDown: Algorithm): boolean;
    }
    class CoalesceMoves extends Up<Algorithm> {
        private sameBlock;
        traverseSequence(sequence: Sequence): Sequence;
        traverseGroup(group: Group): Algorithm;
        traverseRotation(rotation: Rotation): Algorithm;
        traverseBlockMove(blockMove: BlockMove): Algorithm;
        traverseCommutator(commutator: Commutator): Algorithm;
        traverseConjugate(conjugate: Conjugate): Algorithm;
        traversePause(pause: Pause): Algorithm;
        traverseNewLine(newLine: NewLine): Algorithm;
        traverseCommentShort(commentShort: CommentShort): Algorithm;
        traverseCommentLong(commentLong: CommentLong): Algorithm;
    }
    class Concat extends DownUp<Algorithm, Sequence> {
        private concatIntoSequence;
        traverseSequence(sequence: Sequence, dataDown: Algorithm): Sequence;
        traverseGroup(group: Group, dataDown: Algorithm): Sequence;
        traverseRotation(Rotation: Rotation, dataDown: Algorithm): Sequence;
        traverseBlockMove(BlockMove: BlockMove, dataDown: Algorithm): Sequence;
        traverseCommutator(commutator: Commutator, dataDown: Algorithm): Sequence;
        traverseConjugate(conjugate: Conjugate, dataDown: Algorithm): Sequence;
        traversePause(pause: Pause, dataDown: Algorithm): Sequence;
        traverseNewLine(newLine: NewLine, dataDown: Algorithm): Sequence;
        traverseCommentShort(commentShort: CommentShort, dataDown: Algorithm): Sequence;
        traverseCommentLong(commentLong: CommentLong, dataDown: Algorithm): Sequence;
    }
    class ToString extends Up<string> {
        private repetitionSuffix;
        traverseSequence(sequence: Sequence): string;
        traverseGroup(group: Group): string;
        traverseRotation(rotation: Rotation): string;
        traverseBlockMove(blockMove: BlockMove): string;
        traverseCommutator(commutator: Commutator): string;
        traverseConjugate(conjugate: Conjugate): string;
        traversePause(pause: Pause): string;
        traverseNewLine(newLine: NewLine): string;
        traverseCommentShort(commentShort: CommentShort): string;
        traverseCommentLong(commentLong: CommentLong): string;
    }
    namespace Singleton {
        const clone: Clone;
        const invert: Invert;
        const expand: Expand;
        const countBaseMoves: CountBaseMoves;
        const structureEquals: StructureEquals;
        const coalesceMoves: CoalesceMoves;
        const concat: Concat;
        const toString: ToString;
    }
}
