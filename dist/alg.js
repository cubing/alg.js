(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["alg"] = factory();
	else
		root["alg"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
exports.Algorithm = algorithm_1.Algorithm;
exports.Unit = algorithm_1.Unit;
exports.UnitWithAmount = algorithm_1.UnitWithAmount;
exports.BaseMove = algorithm_1.BaseMove;
exports.Sequence = algorithm_1.Sequence;
exports.Group = algorithm_1.Group;
exports.BlockMove = algorithm_1.BlockMove;
exports.Commutator = algorithm_1.Commutator;
exports.Conjugate = algorithm_1.Conjugate;
exports.Pause = algorithm_1.Pause;
exports.NewLine = algorithm_1.NewLine;
exports.CommentShort = algorithm_1.CommentShort;
exports.CommentLong = algorithm_1.CommentLong;
var traversal_1 = __webpack_require__(2);
exports.TraversalDownUp = traversal_1.TraversalDownUp;
exports.TraversalUp = traversal_1.TraversalUp;
exports.invert = traversal_1.invert;
exports.expand = traversal_1.expand;
exports.structureEquals = traversal_1.structureEquals;
exports.coalesceBaseMoves = traversal_1.coalesceBaseMoves;
exports.algToString = traversal_1.algToString;
var example_1 = __webpack_require__(3);
exports.Example = example_1.Example;
var json_1 = __webpack_require__(4);
exports.fromJSON = json_1.fromJSON;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm = /** @class */ (function () {
    function Algorithm() {
    }
    // TODO: Figure out if we can statically enforce that all Algorithm subclasses
    // are frozen after initial construction.
    Algorithm.prototype.freeze = function () {
        Object.freeze(this);
    };
    return Algorithm;
}());
exports.Algorithm = Algorithm;
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Unit;
}(Algorithm));
exports.Unit = Unit;
var UnitWithAmount = /** @class */ (function (_super) {
    __extends(UnitWithAmount, _super);
    // TODO: Make `amount` an optional argument in derived class constructors.
    function UnitWithAmount(amount) {
        var _this = _super.call(this) || this;
        _this.amount = amount;
        return _this;
    }
    return UnitWithAmount;
}(Unit));
exports.UnitWithAmount = UnitWithAmount;
var BaseMove = /** @class */ (function (_super) {
    __extends(BaseMove, _super);
    function BaseMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseMove;
}(UnitWithAmount));
exports.BaseMove = BaseMove;
var Sequence = /** @class */ (function (_super) {
    __extends(Sequence, _super);
    function Sequence(nestedAlgs) {
        var _this = _super.call(this) || this;
        _this.nestedAlgs = nestedAlgs;
        _this.type = "sequence";
        if (nestedAlgs.length == 0) {
            throw "A sequence cannot be empty.";
        }
        for (var _i = 0, nestedAlgs_1 = nestedAlgs; _i < nestedAlgs_1.length; _i++) {
            var n = nestedAlgs_1[_i];
            if (!(n instanceof Unit)) {
                throw "A Sequence can only contain `Unit`s.";
            }
        }
        _this.freeze();
        return _this;
    }
    return Sequence;
}(Algorithm));
exports.Sequence = Sequence;
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(nestedAlg, amount) {
        var _this = _super.call(this, amount) || this;
        _this.nestedAlg = nestedAlg;
        _this.type = "group";
        _this.freeze();
        return _this;
    }
    return Group;
}(UnitWithAmount));
exports.Group = Group;
var blockMoveFamilies = {
    "U": true,
    "L": true,
    "F": true,
    "R": true,
    "B": true,
    "D": true
};
function validateBlockMove(family) {
    return blockMoveFamilies[family] === true;
}
// TODO: Handle layers
var BlockMove = /** @class */ (function (_super) {
    __extends(BlockMove, _super);
    function BlockMove(family, amount) {
        var _this = _super.call(this, amount) || this;
        _this.family = family;
        _this.type = "blockMove";
        if (!validateBlockMove(family)) {
            throw "Invalid block move family: " + family;
        }
        _this.freeze();
        return _this;
    }
    return BlockMove;
}(BaseMove));
exports.BlockMove = BlockMove;
var Commutator = /** @class */ (function (_super) {
    __extends(Commutator, _super);
    function Commutator(A, B, amount) {
        var _this = _super.call(this, amount) || this;
        _this.A = A;
        _this.B = B;
        _this.type = "commutator";
        _this.freeze();
        return _this;
    }
    return Commutator;
}(UnitWithAmount));
exports.Commutator = Commutator;
var Conjugate = /** @class */ (function (_super) {
    __extends(Conjugate, _super);
    function Conjugate(A, B, amount) {
        var _this = _super.call(this, amount) || this;
        _this.A = A;
        _this.B = B;
        _this.type = "conjugate";
        _this.freeze();
        return _this;
    }
    return Conjugate;
}(UnitWithAmount));
exports.Conjugate = Conjugate;
var Pause = /** @class */ (function (_super) {
    __extends(Pause, _super);
    function Pause() {
        var _this = _super.call(this) || this;
        _this.type = "pause";
        _this.freeze();
        return _this;
    }
    return Pause;
}(Unit));
exports.Pause = Pause;
var NewLine = /** @class */ (function (_super) {
    __extends(NewLine, _super);
    function NewLine() {
        var _this = _super.call(this) || this;
        _this.type = "newLine";
        _this.freeze();
        return _this;
    }
    return NewLine;
}(Algorithm));
exports.NewLine = NewLine;
var CommentShort = /** @class */ (function (_super) {
    __extends(CommentShort, _super);
    function CommentShort(comment) {
        var _this = _super.call(this) || this;
        _this.comment = comment;
        _this.type = "commentShort";
        _this.freeze();
        return _this;
    }
    return CommentShort;
}(Algorithm));
exports.CommentShort = CommentShort;
var CommentLong = /** @class */ (function (_super) {
    __extends(CommentLong, _super);
    function CommentLong(comment) {
        var _this = _super.call(this) || this;
        _this.comment = comment;
        _this.type = "commentLong";
        _this.freeze();
        return _this;
    }
    return CommentLong;
}(Algorithm));
exports.CommentLong = CommentLong;
// TODO
// export class TimeStamp extends Algorithm implements Algorithm


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
function dispatch(t, algorithm, dataDown) {
    switch (algorithm.type) {
        case "sequence":
            if (!(algorithm instanceof algorithm_1.Sequence)) {
                throw "Algorithm is not an object of type Sequence despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseSequence(algorithm, dataDown);
        case "group":
            if (!(algorithm instanceof algorithm_1.Group)) {
                throw "Algorithm is not an object of type Group despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseGroup(algorithm, dataDown);
        case "blockMove":
            if (!(algorithm instanceof algorithm_1.BlockMove)) {
                throw "Algorithm is not an object of type BlockMove despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseBlockMove(algorithm, dataDown);
        case "commutator":
            if (!(algorithm instanceof algorithm_1.Commutator)) {
                throw "Algorithm is not an object of type Commutator despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseCommutator(algorithm, dataDown);
        case "conjugate":
            if (!(algorithm instanceof algorithm_1.Conjugate)) {
                throw "Algorithm is not an object of type Conjugate despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseConjugate(algorithm, dataDown);
        case "pause":
            if (!(algorithm instanceof algorithm_1.Pause)) {
                throw "Algorithm is not an object of type Pause despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traversePause(algorithm, dataDown);
        case "newLine":
            if (!(algorithm instanceof algorithm_1.NewLine)) {
                throw "Algorithm is not an object of type NewLine despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseNewLine(algorithm, dataDown);
        case "commentShort":
            if (!(algorithm instanceof algorithm_1.CommentShort)) {
                throw "Algorithm is not an object of type CommentShort despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseCommentShort(algorithm, dataDown);
        case "commentLong":
            if (!(algorithm instanceof algorithm_1.CommentLong)) {
                throw "Algorithm is not an object of type CommentLong despite having \"type\": \"" + algorithm.type + "\"";
            }
            return t.traverseCommentLong(algorithm, dataDown);
        default:
            throw "Unknown algorithm type: " + algorithm.type;
    }
}
var TraversalDownUp = /** @class */ (function () {
    function TraversalDownUp() {
    }
    // Immediate subclasses should overwrite this.
    TraversalDownUp.prototype.traverse = function (algorithm, dataDown) {
        return dispatch(this, algorithm, dataDown);
    };
    TraversalDownUp.prototype.traverseIntoUnit = function (algorithm, dataDown) {
        var out = this.traverse(algorithm, dataDown);
        if (!(out instanceof algorithm_1.Unit)) {
            throw "Traversal did not produce a unit as expected.";
        }
        return out;
    };
    return TraversalDownUp;
}());
exports.TraversalDownUp = TraversalDownUp;
var TraversalUp = /** @class */ (function (_super) {
    __extends(TraversalUp, _super);
    function TraversalUp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TraversalUp.prototype.traverse = function (algorithm) {
        return dispatch(this, algorithm, undefined);
    };
    TraversalUp.prototype.traverseIntoUnit = function (algorithm) {
        var out = this.traverse(algorithm);
        if (!(out instanceof algorithm_1.Unit)) {
            throw "Traversal did not produce a unit as expected.";
        }
        return out;
    };
    return TraversalUp;
}(TraversalDownUp));
exports.TraversalUp = TraversalUp;
;
// TODO: Test that inverses are bijections.
var Invert = /** @class */ (function (_super) {
    __extends(Invert, _super);
    function Invert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Invert.prototype.traverseSequence = function (sequence) {
        var _this = this;
        // TODO: Handle newLines and comments correctly
        return new algorithm_1.Sequence(sequence.nestedAlgs.slice().reverse().map(function (a) { return _this.traverseIntoUnit(a); }));
    };
    Invert.prototype.traverseGroup = function (group) {
        return new algorithm_1.Group(this.traverse(group.nestedAlg), group.amount);
    };
    Invert.prototype.traverseBlockMove = function (blockMove) {
        return new algorithm_1.BlockMove(blockMove.family, -blockMove.amount);
    };
    Invert.prototype.traverseCommutator = function (commutator) {
        return new algorithm_1.Commutator(commutator.B, commutator.A, commutator.amount);
    };
    Invert.prototype.traverseConjugate = function (conjugate) {
        return new algorithm_1.Conjugate(conjugate.A, this.traverse(conjugate.B), conjugate.amount);
    };
    Invert.prototype.traversePause = function (pause) { return pause; };
    Invert.prototype.traverseNewLine = function (newLine) { return newLine; };
    Invert.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
    Invert.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
    return Invert;
}(TraversalUp));
exports.Invert = Invert;
var Expand = /** @class */ (function (_super) {
    __extends(Expand, _super);
    function Expand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Expand.prototype.flattenSequenceOneLevel = function (algList) {
        var flattened = [];
        for (var _i = 0, algList_1 = algList; _i < algList_1.length; _i++) {
            var part = algList_1[_i];
            if (part instanceof algorithm_1.Sequence) {
                flattened = flattened.concat(part.nestedAlgs);
            }
            else if (part instanceof algorithm_1.Unit) {
                flattened.push(part);
            }
            else {
                throw "expand() encountered an internal error. Did you pass in a valid Algorithm?";
            }
        }
        return flattened;
    };
    Expand.prototype.repeat = function (algList, accordingTo) {
        var amount = Math.abs(accordingTo.amount);
        var amountDir = (accordingTo.amount > 0) ? 1 : -1; // Mutable
        // TODO: Cleaner inversion
        var once;
        if (amountDir == -1) {
            // TODO: Avoid casting to sequence.
            once = (exports.invert(new algorithm_1.Sequence(algList))).nestedAlgs;
        }
        else {
            once = algList;
        }
        var repeated = [];
        for (var i = 0; i < amount; i++) {
            repeated = repeated.concat(once);
        }
        return new algorithm_1.Sequence(repeated);
    };
    Expand.prototype.traverseSequence = function (sequence) {
        var _this = this;
        return new algorithm_1.Sequence(this.flattenSequenceOneLevel(sequence.nestedAlgs.map(function (a) { return _this.traverse(a); })));
    };
    Expand.prototype.traverseGroup = function (group) {
        // TODO: Pass raw Algorithm[] to sequence.
        return this.repeat([this.traverseIntoUnit(group.nestedAlg)], group);
    };
    Expand.prototype.traverseBlockMove = function (blockMove) {
        return blockMove;
    };
    Expand.prototype.traverseCommutator = function (commutator) {
        var expandedA = this.traverse(commutator.A);
        var expandedB = this.traverse(commutator.B);
        var once = [];
        once = once.concat(expandedA, expandedB, exports.invert(expandedA), exports.invert(expandedB));
        return this.repeat(this.flattenSequenceOneLevel(once), commutator);
    };
    Expand.prototype.traverseConjugate = function (conjugate) {
        var expandedA = this.traverse(conjugate.A);
        var expandedB = this.traverse(conjugate.B);
        var once = [];
        once = once.concat(expandedA, expandedB, exports.invert(expandedA));
        return this.repeat(this.flattenSequenceOneLevel(once), conjugate);
    };
    Expand.prototype.traversePause = function (pause) { return pause; };
    Expand.prototype.traverseNewLine = function (newLine) { return newLine; };
    Expand.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
    Expand.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
    return Expand;
}(TraversalUp));
exports.Expand = Expand;
var StructureEquals = /** @class */ (function (_super) {
    __extends(StructureEquals, _super);
    function StructureEquals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StructureEquals.prototype.traverseSequence = function (sequence, dataDown) {
        if (!(dataDown instanceof algorithm_1.Sequence)) {
            return false;
        }
        if (sequence.nestedAlgs.length !== dataDown.nestedAlgs.length) {
            return false;
        }
        for (var i = 0; i < sequence.nestedAlgs.length; i++) {
            if (!this.traverse(sequence.nestedAlgs[i], dataDown.nestedAlgs[i])) {
                return false;
            }
        }
        return true;
    };
    StructureEquals.prototype.traverseGroup = function (group, dataDown) {
        return (dataDown instanceof algorithm_1.Group) && this.traverse(group.nestedAlg, dataDown.nestedAlg);
    };
    StructureEquals.prototype.traverseBlockMove = function (blockMove, dataDown) {
        // TODO: Handle layers.
        return dataDown instanceof algorithm_1.BlockMove &&
            blockMove.family === dataDown.family &&
            blockMove.amount === dataDown.amount;
    };
    StructureEquals.prototype.traverseCommutator = function (commutator, dataDown) {
        return (dataDown instanceof algorithm_1.Commutator) &&
            this.traverse(commutator.A, dataDown.A) &&
            this.traverse(commutator.B, dataDown.B);
    };
    StructureEquals.prototype.traverseConjugate = function (conjugate, dataDown) {
        return (dataDown instanceof algorithm_1.Conjugate) &&
            this.traverse(conjugate.A, dataDown.A) &&
            this.traverse(conjugate.B, dataDown.B);
    };
    StructureEquals.prototype.traversePause = function (pause, dataDown) {
        return dataDown instanceof algorithm_1.Pause;
    };
    StructureEquals.prototype.traverseNewLine = function (newLine, dataDown) {
        return dataDown instanceof algorithm_1.NewLine;
    };
    StructureEquals.prototype.traverseCommentShort = function (commentShort, dataDown) {
        return (dataDown instanceof algorithm_1.CommentShort) && (commentShort.comment == dataDown.comment);
    };
    StructureEquals.prototype.traverseCommentLong = function (commentLong, dataDown) {
        return (dataDown instanceof algorithm_1.CommentLong) && (commentLong.comment == dataDown.comment);
    };
    return StructureEquals;
}(TraversalDownUp));
exports.StructureEquals = StructureEquals;
// TODO: Test that inverses are bijections.
var CoalesceBaseMoves = /** @class */ (function (_super) {
    __extends(CoalesceBaseMoves, _super);
    function CoalesceBaseMoves() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CoalesceBaseMoves.prototype.sameBlock = function (moveA, moveB) {
        // TODO: Handle layers
        return moveA.family === moveB.family;
    };
    // TODO: Handle
    CoalesceBaseMoves.prototype.traverseSequence = function (sequence) {
        var coalesced = [];
        for (var _i = 0, _a = sequence.nestedAlgs; _i < _a.length; _i++) {
            var part = _a[_i];
            if (!(part instanceof algorithm_1.BlockMove)) {
                coalesced.push(this.traverseIntoUnit(part));
            }
            else if (coalesced.length > 0) {
                var last = coalesced[coalesced.length - 1];
                if (last instanceof algorithm_1.BlockMove &&
                    this.sameBlock(last, part)) {
                    // TODO: This is cube-specific. Perhaps pass the modules as DataDown?
                    var amount = last.amount + part.amount;
                    coalesced.pop();
                    if (amount !== 0) {
                        // We could modify the last element instead of creating a new one,
                        // but this is safe against shifting coding practices.
                        // TODO: Figure out if the shoot-in-the-foot risk
                        // modification is worth the speed.
                        coalesced.push(new algorithm_1.BlockMove(part.family, amount));
                    }
                }
                else {
                    coalesced.push(part);
                }
            }
            else {
                coalesced.push(part);
            }
        }
        return new algorithm_1.Sequence(coalesced);
    };
    CoalesceBaseMoves.prototype.traverseGroup = function (group) { return group; };
    CoalesceBaseMoves.prototype.traverseBlockMove = function (blockMove) { return blockMove; };
    CoalesceBaseMoves.prototype.traverseCommutator = function (commutator) { return commutator; };
    CoalesceBaseMoves.prototype.traverseConjugate = function (conjugate) { return conjugate; };
    CoalesceBaseMoves.prototype.traversePause = function (pause) { return pause; };
    CoalesceBaseMoves.prototype.traverseNewLine = function (newLine) { return newLine; };
    CoalesceBaseMoves.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
    CoalesceBaseMoves.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
    return CoalesceBaseMoves;
}(TraversalUp));
exports.CoalesceBaseMoves = CoalesceBaseMoves;
// export class Concat extends TraversalDownUp<Algorithm, Sequence> {
//   private concatIntoSequence(A: Algorithm[], B: Algorithm): Sequence {
//     var nestedAlgs: Algorithm[] = A.slice();
//     if (B instanceof Sequence) {
//       nestedAlgs = nestedAlgs.concat(B.nestedAlgs)
//     } else {
//       nestedAlgs.push(B);
//     }
//     return new Sequence(nestedAlgs)
//   }
//   public traverseSequence(     sequence:     Sequence,     dataDown: Algorithm): Sequence {return this.concatIntoSequence(sequence.nestedAlgs, dataDown); }
//   public traverseGroup(        group:        Group,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([group]          , dataDown); }
//   public traverseBlockMove(    BlockMove:    BlockMove,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([BlockMove]      , dataDown); }
//   public traverseCommutator(   commutator:   Commutator,   dataDown: Algorithm): Sequence {return this.concatIntoSequence([commutator]     , dataDown); }
//   public traverseConjugate(    conjugate:    Conjugate,    dataDown: Algorithm): Sequence {return this.concatIntoSequence([conjugate]      , dataDown); }
//   public traversePause(        pause:        Pause,        dataDown: Algorithm): Sequence {return this.concatIntoSequence([pause]          , dataDown); }
//   public traverseNewLine(      newLine:      NewLine,      dataDown: Algorithm): Sequence {return this.concatIntoSequence([newLine]        , dataDown); }
//   public traverseCommentShort( commentShort: CommentShort, dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentShort]   , dataDown); }
//   public traverseCommentLong(  commentLong:  CommentLong,  dataDown: Algorithm): Sequence {return this.concatIntoSequence([commentLong]    , dataDown); }
// }
var ToString = /** @class */ (function (_super) {
    __extends(ToString, _super);
    function ToString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToString.prototype.repetitionSuffix = function (amount) {
        var absAmount = Math.abs(amount);
        var s = "";
        if (absAmount !== 1) {
            s += String(absAmount);
        }
        if (absAmount !== amount) {
            s += "'";
        }
        return s;
    };
    ToString.prototype.spaceBetween = function (u1, u2) {
        if (u1 instanceof algorithm_1.Pause && u2 instanceof algorithm_1.Pause) {
            return "";
        }
        return " ";
    };
    ToString.prototype.traverseSequence = function (sequence) {
        var output = "";
        output += this.traverse(sequence.nestedAlgs[0]);
        for (var i = 1; i < sequence.nestedAlgs.length; i++) {
            output += this.spaceBetween(sequence.nestedAlgs[i - 1], sequence.nestedAlgs[i]);
            output += this.traverse(sequence.nestedAlgs[i]);
        }
        return output;
    };
    ToString.prototype.traverseGroup = function (group) { return "(" + this.traverse(group.nestedAlg) + ")" + this.repetitionSuffix(group.amount); };
    ToString.prototype.traverseBlockMove = function (blockMove) { return blockMove.family + this.repetitionSuffix(blockMove.amount); };
    ToString.prototype.traverseCommutator = function (commutator) { return "[" + this.traverse(commutator.A) + ", " + this.traverse(commutator.B) + "]" + this.repetitionSuffix(commutator.amount); };
    ToString.prototype.traverseConjugate = function (conjugate) { return "[" + this.traverse(conjugate.A) + ": " + this.traverse(conjugate.B) + "]" + this.repetitionSuffix(conjugate.amount); };
    // TODO: Remove spaces between repeated pauses (in traverseSequence)
    ToString.prototype.traversePause = function (pause) { return "."; };
    ToString.prototype.traverseNewLine = function (newLine) { return "\n"; };
    // TODO: Enforce being followed by a newline (or the end of the alg)?
    ToString.prototype.traverseCommentShort = function (commentShort) { return "//" + commentShort.comment; };
    // TODO: Sanitize `*/`
    ToString.prototype.traverseCommentLong = function (commentLong) { return "/*" + commentLong.comment + "*/"; };
    return ToString;
}(TraversalUp));
exports.ToString = ToString;
function makeDownUp(ctor) {
    var instance = new ctor();
    return instance.traverse.bind(instance);
}
function makeUp(ctor) {
    var instance = new ctor();
    return instance.traverse.bind(instance);
}
exports.invert = makeUp(Invert);
exports.expand = makeUp(Expand);
exports.structureEquals = makeDownUp(StructureEquals);
exports.coalesceBaseMoves = makeUp(CoalesceBaseMoves);
exports.algToString = makeUp(ToString);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
var Example;
(function (Example) {
    Example.Sune = new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", -2),
        new algorithm_1.BlockMove("R", -1)
    ]);
    Example.AntiSune = new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", 2),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", -1)
    ]);
    Example.SuneCommutator = new algorithm_1.Commutator(new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", -2)
    ]), new algorithm_1.Conjugate(new algorithm_1.BlockMove("R", 1), new algorithm_1.BlockMove("U", 1), 1), 1);
    Example.Niklas = new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("L", -1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("L", 1),
        new algorithm_1.BlockMove("U", 1)
    ]);
    // export const EPerm: Sequence = new Sequence([
    //   new Rotation("x", -1),
    //   new Commutator(
    //     new Conjugate(new BlockMove("R", 1), new BlockMove("U", -1), 1),
    //     new BlockMove("D", 1),
    //     1
    //   ),
    //   new Commutator(
    //     new Conjugate(new BlockMove("R", 1), new BlockMove("U", 1), 1),
    //     new BlockMove("D", 1),
    //     1
    //   ),
    //   new Rotation("x", 1)
    // ]);
    Example.FURURFCompact = new algorithm_1.Conjugate(new algorithm_1.BlockMove("F", 1), new algorithm_1.Commutator(new algorithm_1.BlockMove("U", 1), new algorithm_1.BlockMove("R", 1), 1), 1);
    Example.APermCompact = new algorithm_1.Conjugate(new algorithm_1.BlockMove("R", 2), new algorithm_1.Commutator(new algorithm_1.BlockMove("F", 2), new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("B", -1),
        new algorithm_1.BlockMove("R", 1),
    ]), 1), 1);
    Example.FURURFMoves = new algorithm_1.Sequence([
        new algorithm_1.BlockMove("F", 1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("F", -1)
    ]);
    Example.TPerm = new algorithm_1.Sequence([
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("F", 1),
        new algorithm_1.BlockMove("R", 2),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("U", -1),
        new algorithm_1.BlockMove("R", 1),
        new algorithm_1.BlockMove("U", 1),
        new algorithm_1.BlockMove("R", -1),
        new algorithm_1.BlockMove("F", -1)
    ]);
    Example.HeadlightSwaps = new algorithm_1.Conjugate(new algorithm_1.BlockMove("F", 1), new algorithm_1.Commutator(new algorithm_1.BlockMove("R", 1), new algorithm_1.BlockMove("U", 1), 3), 1);
    Example.TriplePause = new algorithm_1.Sequence([
        new algorithm_1.Pause(),
        new algorithm_1.Pause(),
        new algorithm_1.Pause(),
    ]);
    Example.AllAlgTypes = [
        new algorithm_1.Sequence([new algorithm_1.BlockMove("R", 1), new algorithm_1.BlockMove("U", -1)]),
        new algorithm_1.Group(new algorithm_1.BlockMove("F", 1), 2),
        // new Rotation("y", -1),
        new algorithm_1.BlockMove("R", 2),
        new algorithm_1.Commutator(new algorithm_1.BlockMove("R", 2), new algorithm_1.BlockMove("U", 2), 2),
        new algorithm_1.Conjugate(new algorithm_1.BlockMove("L", 2), new algorithm_1.BlockMove("D", -1), 2),
        new algorithm_1.Pause(),
        new algorithm_1.NewLine(),
        new algorithm_1.CommentShort("short comment"),
        new algorithm_1.CommentLong("long comment")
    ];
})(Example = exports.Example || (exports.Example = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
// TODO: Implement using Traversal?
function fromJSON(json) {
    var _this = this;
    switch (json.type) {
        case "sequence":
            if (!json.nestedAlgs) {
                throw "Missing nestedAlgs";
            }
            return new algorithm_1.Sequence(json.nestedAlgs.map(function (j) { return _this.fromJSON(j); }));
        case "group":
            if (!json.nestedAlg) {
                throw "Missing nestedAlg";
            }
            if (!json.amount) {
                throw "Missing amount";
            }
            return new algorithm_1.Group(this.fromJSON(json.nestedAlg), json.amount);
        case "blockMove":
            // TODO: Handle layers
            if (!json.family) {
                throw "Missing family";
            }
            if (!json.amount) {
                throw "Missing amount";
            }
            return new algorithm_1.BlockMove(json.family, json.amount);
        case "commutator":
            if (!json.A) {
                throw "Missing A";
            }
            if (!json.B) {
                throw "Missing B";
            }
            if (!json.amount) {
                throw "Missing amount";
            }
            return new algorithm_1.Commutator(this.fromJSON(json.A), this.fromJSON(json.B), json.amount);
        case "conjugate":
            if (!json.A) {
                throw "Missing A";
            }
            if (!json.B) {
                throw "Missing B";
            }
            if (!json.amount) {
                throw "Missing amount";
            }
            return new algorithm_1.Conjugate(this.fromJSON(json.A), this.fromJSON(json.B), json.amount);
        case "pause":
            return new algorithm_1.Pause();
        case "newLine":
            return new algorithm_1.NewLine();
        case "commentShort":
            if (!json.comment) {
                throw "Missing comment";
            }
            return new algorithm_1.CommentShort(json.comment);
        case "commentLong":
            if (!json.comment) {
                throw "Missing comment";
            }
            return new algorithm_1.CommentLong(json.comment);
        default:
            throw "Unknown alg type: " + json.type;
    }
}
exports.fromJSON = fromJSON;


/***/ })
/******/ ]);
});