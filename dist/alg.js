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

// TODO Figure out if we can create a default global easily.
// export as namespace Alg;
Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
exports.Algorithm = algorithm_1.Algorithm;
exports.Repeatable = algorithm_1.Repeatable;
exports.Sequence = algorithm_1.Sequence;
exports.Group = algorithm_1.Group;
exports.BaseMove = algorithm_1.BaseMove;
exports.Commutator = algorithm_1.Commutator;
exports.Conjugate = algorithm_1.Conjugate;
exports.Pause = algorithm_1.Pause;
exports.NewLine = algorithm_1.NewLine;
exports.CommentShort = algorithm_1.CommentShort;
exports.CommentLong = algorithm_1.CommentLong;
var traversal_1 = __webpack_require__(2);
exports.Traversal = traversal_1.Traversal;
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
var traversal_1 = __webpack_require__(2);
"use strict";
var Algorithm = /** @class */ (function () {
    function Algorithm() {
    }
    // TODO: Figure out if we can statically enforce that all Algorithm subclasses
    // are frozen after initial construction.
    Algorithm.prototype.freeze = function () {
        Object.freeze(this);
    };
    Algorithm.prototype.clone = function () { return traversal_1.Traversal.Singleton.clone.traverse(this); };
    Algorithm.prototype.invert = function () { return traversal_1.Traversal.Singleton.invert.traverse(this); };
    Algorithm.prototype.expand = function () { return traversal_1.Traversal.Singleton.expand.traverse(this); };
    Algorithm.prototype.countBaseMoves = function () { return traversal_1.Traversal.Singleton.countBaseMoves.traverse(this); };
    Algorithm.prototype.coalesceMoves = function () { return traversal_1.Traversal.Singleton.coalesceMoves.traverse(this); };
    Algorithm.prototype.toString = function () { return traversal_1.Traversal.Singleton.toString.traverse(this); };
    Algorithm.prototype.structureEquals = function (nestedAlg) {
        return traversal_1.Traversal.Singleton.structureEquals.traverse(this, nestedAlg);
    };
    Algorithm.prototype.concat = function (nestedAlg) {
        return traversal_1.Traversal.Singleton.concat.traverse(this, nestedAlg);
    };
    return Algorithm;
}());
exports.Algorithm = Algorithm;
var Sequence = /** @class */ (function (_super) {
    __extends(Sequence, _super);
    function Sequence(nestedAlgs) {
        var _this = _super.call(this) || this;
        _this.nestedAlgs = nestedAlgs;
        _this.type = "sequence";
        _this.freeze();
        return _this;
    }
    Sequence.prototype.dispatch = function (t, dataDown) {
        return t.traverseSequence(this, dataDown);
    };
    return Sequence;
}(Algorithm));
exports.Sequence = Sequence;
var Repeatable = /** @class */ (function (_super) {
    __extends(Repeatable, _super);
    // TODO: Make `amount` an optional argument in derived class constructors.
    function Repeatable(amount) {
        var _this = _super.call(this) || this;
        _this.amount = amount;
        return _this;
    }
    return Repeatable;
}(Algorithm));
exports.Repeatable = Repeatable;
// Group is is like a Sequence, but is enclosed in parentheses when
// written.
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(nestedAlg, amount) {
        var _this = _super.call(this, amount) || this;
        _this.nestedAlg = nestedAlg;
        _this.type = "group";
        _this.freeze();
        return _this;
    }
    Group.prototype.dispatch = function (t, dataDown) {
        return t.traverseGroup(this, dataDown);
    };
    return Group;
}(Repeatable));
exports.Group = Group;
var BaseMove = /** @class */ (function (_super) {
    __extends(BaseMove, _super);
    function BaseMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseMove;
}(Repeatable));
exports.BaseMove = BaseMove;
var BlockMove = /** @class */ (function (_super) {
    __extends(BlockMove, _super);
    // TODO: Handle layers in constructor
    function BlockMove(family, amount) {
        var _this = _super.call(this, amount) || this;
        _this.family = family;
        _this.type = "blockMove";
        _this.freeze();
        return _this;
    }
    BlockMove.prototype.dispatch = function (t, dataDown) {
        return t.traverseBlockMove(this, dataDown);
    };
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
    Commutator.prototype.dispatch = function (t, dataDown) {
        return t.traverseCommutator(this, dataDown);
    };
    return Commutator;
}(Repeatable));
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
    Conjugate.prototype.dispatch = function (t, dataDown) {
        return t.traverseConjugate(this, dataDown);
    };
    return Conjugate;
}(Repeatable));
exports.Conjugate = Conjugate;
var Pause = /** @class */ (function (_super) {
    __extends(Pause, _super);
    function Pause() {
        var _this = _super.call(this) || this;
        _this.type = "pause";
        _this.freeze();
        return _this;
    }
    Pause.prototype.dispatch = function (t, dataDown) {
        return t.traversePause(this, dataDown);
    };
    return Pause;
}(Algorithm));
exports.Pause = Pause;
var NewLine = /** @class */ (function (_super) {
    __extends(NewLine, _super);
    function NewLine() {
        var _this = _super.call(this) || this;
        _this.type = "newLine";
        _this.freeze();
        return _this;
    }
    NewLine.prototype.dispatch = function (t, dataDown) {
        return t.traverseNewLine(this, dataDown);
    };
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
    CommentShort.prototype.dispatch = function (t, dataDown) {
        return t.traverseCommentShort(this, dataDown);
    };
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
    CommentLong.prototype.dispatch = function (t, dataDown) {
        return t.traverseCommentLong(this, dataDown);
    };
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
"use strict";
var Traversal;
(function (Traversal) {
    var DownUp = /** @class */ (function () {
        function DownUp() {
        }
        // Immediate subclasses should overwrite this.
        DownUp.prototype.traverse = function (algorithm, dataDown) {
            return algorithm.dispatch(this, dataDown);
        };
        return DownUp;
    }());
    Traversal.DownUp = DownUp;
    var Up = /** @class */ (function (_super) {
        __extends(Up, _super);
        function Up() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Up.prototype.traverse = function (algorithm) {
            return algorithm.dispatch(this, undefined);
        };
        return Up;
    }(DownUp));
    Traversal.Up = Up;
    ;
    var Clone = /** @class */ (function (_super) {
        __extends(Clone, _super);
        function Clone() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Clone.prototype.traverseSequence = function (sequence) {
            var _this = this;
            return new algorithm_1.Sequence(sequence.nestedAlgs.map(function (a) { return _this.traverse(a); }));
        };
        Clone.prototype.traverseGroup = function (group) {
            return new algorithm_1.Group(this.traverse(group.nestedAlg), group.amount);
        };
        Clone.prototype.traverseBlockMove = function (blockMove) {
            return new algorithm_1.BlockMove(blockMove.family, blockMove.amount);
        };
        Clone.prototype.traverseCommutator = function (commutator) {
            return new algorithm_1.Commutator(this.traverse(commutator.A), this.traverse(commutator.B), commutator.amount);
        };
        Clone.prototype.traverseConjugate = function (conjugate) {
            return new algorithm_1.Conjugate(this.traverse(conjugate.A), this.traverse(conjugate.B), conjugate.amount);
        };
        Clone.prototype.traversePause = function (pause) { return pause; };
        Clone.prototype.traverseNewLine = function (newLine) { return newLine; };
        Clone.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
        Clone.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
        return Clone;
    }(Up));
    Traversal.Clone = Clone;
    // TODO: Test that inverses are bijections.
    var Invert = /** @class */ (function (_super) {
        __extends(Invert, _super);
        function Invert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Invert.prototype.traverseSequence = function (sequence) {
            var _this = this;
            // TODO: Handle newLines and comments correctly
            return new algorithm_1.Sequence(sequence.nestedAlgs.slice().reverse().map(function (a) { return _this.traverse(a); }));
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
    }(Up));
    Traversal.Invert = Invert;
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
                else {
                    flattened.push(part);
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
                once = (new algorithm_1.Sequence(algList)).invert().nestedAlgs;
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
            return this.repeat([this.traverse(group.nestedAlg)], group);
        };
        Expand.prototype.traverseBlockMove = function (blockMove) {
            return blockMove;
        };
        Expand.prototype.traverseCommutator = function (commutator) {
            var expandedA = this.traverse(commutator.A);
            var expandedB = this.traverse(commutator.B);
            var once = [];
            once = once.concat(expandedA, expandedB, expandedA.invert(), expandedB.invert());
            return this.repeat(this.flattenSequenceOneLevel(once), commutator);
        };
        Expand.prototype.traverseConjugate = function (conjugate) {
            var expandedA = this.traverse(conjugate.A);
            var expandedB = this.traverse(conjugate.B);
            var once = [];
            once = once.concat(expandedA, expandedB, expandedA.invert());
            return this.repeat(this.flattenSequenceOneLevel(once), conjugate);
        };
        Expand.prototype.traversePause = function (pause) { return pause; };
        Expand.prototype.traverseNewLine = function (newLine) { return newLine; };
        Expand.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
        Expand.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
        return Expand;
    }(Up));
    Traversal.Expand = Expand;
    var CountBaseMoves = /** @class */ (function (_super) {
        __extends(CountBaseMoves, _super);
        function CountBaseMoves() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CountBaseMoves.prototype.traverseSequence = function (sequence) {
            var total = 0;
            for (var _i = 0, _a = sequence.nestedAlgs; _i < _a.length; _i++) {
                var part = _a[_i];
                total += this.traverse(part);
            }
            return total;
        };
        CountBaseMoves.prototype.traverseGroup = function (group) {
            return this.traverse(group.nestedAlg);
        };
        CountBaseMoves.prototype.traverseBlockMove = function (blockMove) {
            return 1;
        };
        CountBaseMoves.prototype.traverseCommutator = function (commutator) {
            return 2 * (this.traverse(commutator.A) + this.traverse(commutator.B));
        };
        CountBaseMoves.prototype.traverseConjugate = function (conjugate) {
            return 2 * (this.traverse(conjugate.A)) + this.traverse(conjugate.B);
        };
        CountBaseMoves.prototype.traversePause = function (pause) { return 0; };
        CountBaseMoves.prototype.traverseNewLine = function (newLine) { return 0; };
        CountBaseMoves.prototype.traverseCommentShort = function (commentShort) { return 0; };
        CountBaseMoves.prototype.traverseCommentLong = function (commentLong) { return 0; };
        return CountBaseMoves;
    }(Up));
    Traversal.CountBaseMoves = CountBaseMoves;
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
            return (dataDown instanceof algorithm_1.CommentShort) && (commentLong.comment == dataDown.comment);
        };
        return StructureEquals;
    }(DownUp));
    Traversal.StructureEquals = StructureEquals;
    // TODO: Test that inverses are bijections.
    var CoalesceMoves = /** @class */ (function (_super) {
        __extends(CoalesceMoves, _super);
        function CoalesceMoves() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CoalesceMoves.prototype.sameBlock = function (moveA, moveB) {
            // TODO: Handle layers
            return moveA.family === moveB.family;
        };
        CoalesceMoves.prototype.traverseSequence = function (sequence) {
            var coalesced = [];
            for (var _i = 0, _a = sequence.nestedAlgs; _i < _a.length; _i++) {
                var part = _a[_i];
                if (!(part instanceof algorithm_1.BlockMove)) {
                    coalesced.push(this.traverse(part));
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
        CoalesceMoves.prototype.traverseGroup = function (group) { return group; };
        CoalesceMoves.prototype.traverseBlockMove = function (blockMove) { return blockMove; };
        CoalesceMoves.prototype.traverseCommutator = function (commutator) { return commutator; };
        CoalesceMoves.prototype.traverseConjugate = function (conjugate) { return conjugate; };
        CoalesceMoves.prototype.traversePause = function (pause) { return pause; };
        CoalesceMoves.prototype.traverseNewLine = function (newLine) { return newLine; };
        CoalesceMoves.prototype.traverseCommentShort = function (commentShort) { return commentShort; };
        CoalesceMoves.prototype.traverseCommentLong = function (commentLong) { return commentLong; };
        return CoalesceMoves;
    }(Up));
    Traversal.CoalesceMoves = CoalesceMoves;
    var Concat = /** @class */ (function (_super) {
        __extends(Concat, _super);
        function Concat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Concat.prototype.concatIntoSequence = function (A, B) {
            var nestedAlgs = A.slice();
            if (B instanceof algorithm_1.Sequence) {
                nestedAlgs = nestedAlgs.concat(B.nestedAlgs);
            }
            else {
                nestedAlgs.push(B);
            }
            return new algorithm_1.Sequence(nestedAlgs);
        };
        Concat.prototype.traverseSequence = function (sequence, dataDown) { return this.concatIntoSequence(sequence.nestedAlgs, dataDown); };
        Concat.prototype.traverseGroup = function (group, dataDown) { return this.concatIntoSequence([group], dataDown); };
        Concat.prototype.traverseBlockMove = function (BlockMove, dataDown) { return this.concatIntoSequence([BlockMove], dataDown); };
        Concat.prototype.traverseCommutator = function (commutator, dataDown) { return this.concatIntoSequence([commutator], dataDown); };
        Concat.prototype.traverseConjugate = function (conjugate, dataDown) { return this.concatIntoSequence([conjugate], dataDown); };
        Concat.prototype.traversePause = function (pause, dataDown) { return this.concatIntoSequence([pause], dataDown); };
        Concat.prototype.traverseNewLine = function (newLine, dataDown) { return this.concatIntoSequence([newLine], dataDown); };
        Concat.prototype.traverseCommentShort = function (commentShort, dataDown) { return this.concatIntoSequence([commentShort], dataDown); };
        Concat.prototype.traverseCommentLong = function (commentLong, dataDown) { return this.concatIntoSequence([commentLong], dataDown); };
        return Concat;
    }(DownUp));
    Traversal.Concat = Concat;
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
        ToString.prototype.traverseSequence = function (sequence) {
            var _this = this;
            return sequence.nestedAlgs.map(function (a) { return _this.traverse(a); }).join(" ");
        };
        ToString.prototype.traverseGroup = function (group) { return "(" + group.nestedAlg + ")" + this.repetitionSuffix(group.amount); };
        ToString.prototype.traverseBlockMove = function (blockMove) { return blockMove.family + this.repetitionSuffix(blockMove.amount); };
        ToString.prototype.traverseCommutator = function (commutator) { return "[" + commutator.A + ", " + commutator.B + "]" + this.repetitionSuffix(commutator.amount); };
        ToString.prototype.traverseConjugate = function (conjugate) { return "[" + conjugate.A + ": " + conjugate.B + "]" + this.repetitionSuffix(conjugate.amount); };
        // TODO: Remove spaces between repeated pauses (in traverseSequence)
        ToString.prototype.traversePause = function (pause) { return "."; };
        ToString.prototype.traverseNewLine = function (newLine) { return "\n"; };
        // TODO: Enforce being followed by a newline (or the end of the alg)?
        ToString.prototype.traverseCommentShort = function (commentShort) { return "//" + commentShort.comment; };
        // TODO: Sanitize `*/`
        ToString.prototype.traverseCommentLong = function (commentLong) { return "/*" + commentLong.comment + "*/"; };
        return ToString;
    }(Up));
    Traversal.ToString = ToString;
    var Singleton;
    (function (Singleton) {
        Singleton.clone = new Clone();
        Singleton.invert = new Invert();
        Singleton.expand = new Expand();
        Singleton.countBaseMoves = new CountBaseMoves();
        Singleton.structureEquals = new StructureEquals();
        Singleton.coalesceMoves = new CoalesceMoves();
        Singleton.concat = new Concat();
        Singleton.toString = new ToString();
    })(Singleton = Traversal.Singleton || (Traversal.Singleton = {}));
})(Traversal = exports.Traversal || (exports.Traversal = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(1);
"use strict";
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
    Example.AllAlgTypes = [
        new algorithm_1.Sequence([new algorithm_1.BlockMove("R", 1), new algorithm_1.BlockMove("U", -1)]),
        new algorithm_1.Group(new algorithm_1.BlockMove("F", 1), 2),
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
"use strict";
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
            throw "Unknown alg type.";
    }
}
exports.fromJSON = fromJSON;


/***/ })
/******/ ]);
});