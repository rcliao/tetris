/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _board = __webpack_require__(1);

	// unify requestAnimationFrame method for all vendors
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	var canvas = document.querySelector('#main');
	var ctx = canvas.getContext('2d');
	var board = new _board.Board(20, 20);
	board.draw(ctx, true);

	var startButton = document.querySelector('#start');
	var hostButton = document.querySelector('#host');
	var connectButton = document.querySelector('#connect');

	startButton.addEventListener('click', function () {
	  main();
	  startButton.disabled = true;
	  hostButton.disabled = true;
	  connectButton.disabled = true;
	});

	hostButton.addEventListener('click', function () {
	  console.log('hosting');
	});

	connectButton.addEventListener('click', function () {
	  console.log('connecting');
	});

	function main() {
	  var keyPressed = {};

	  board = new _board.Board(20, 20);

	  // handle and translate keyboard into action
	  document.addEventListener('keydown', function (evt) {
	    var action = '';
	    switch (evt.which) {
	      case 32:
	        action = 'drop';
	        break;
	      case 37:
	        action = 'left';
	        break;
	      case 38:
	        action = 'rotate';
	        break;
	      case 39:
	        action = 'right';
	        break;
	      case 40:
	        action = 'down';
	        break;
	      case 72:
	        action = 'left';
	        break;
	      case 74:
	        action = 'down';
	        break;
	      case 75:
	        action = 'rotate';
	        break;
	      case 76:
	        action = 'right';
	        break;
	    }
	    if (action !== '') {
	      evt.preventDefault();
	      evt.stopPropagation();
	    }
	    keyPressed[action] = true;
	  });

	  gameLoop();

	  function gameLoop() {
	    if (!board.gameOver) {
	      window.requestAnimationFrame(gameLoop);
	      board.handleAction(keyPressed);
	      draw(canvas, ctx, board);
	    } else {
	      startButton.disabled = false;
	      hostButton.disabled = false;
	      connectButton.disabled = false;
	    }
	  }
	}

	function draw(canvas, ctx, board) {
	  // redraw entire canvas to be blank before next render
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  board.draw(ctx);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BASE_BLOCK_WIDTH = 30;
	var WIDTH = 10;
	var HEIGHT = 20;
	var COLLIDE_LIMIT = 30;
	var LEVEL_UP_COUNTER = 30;

	var BLOCK_COLORS = {
	  'o': '#FBC02D',
	  'i': '#0097A7',
	  's': '#4CAF50',
	  'z': '#F44336',
	  'l': '#FF9800',
	  'j': '#2196F3',
	  't': '#9C27B0'
	};
	var SHAPES = {
	  'o': [[[1, 1], [1, 1]]],
	  'i': [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
	  's': [[[0, 1], [1, 1], [1]], [[1, 1], [0, 1, 1]]],
	  'z': [[[1], [1, 1], [0, 1]], [[0, 1, 1], [1, 1]]],
	  'l': [[[1, 1, 1], [0, 0, 1]], [[1, 1], [1], [1]], [[1], [1, 1, 1]], [[0, 1], [0, 1], [1, 1]]],
	  'j': [[[0, 0, 1], [1, 1, 1]], [[1, 1], [0, 1], [0, 1]], [[1, 1, 1], [1]], [[1], [1], [1, 1]]],
	  't': [[[1, 0], [1, 1], [1]], [[0, 1], [1, 1, 1]], [[0, 1], [1, 1], [0, 1]], [[1, 1, 1], [0, 1]]]
	};

	var Board = function () {
	  function Board(x, y) {
	    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	    _classCallCheck(this, Board);

	    this.score = 0;
	    this.lineCleared = 0;
	    this.startLevel = level;
	    this.level = level;
	    this.velocity = 0.05 * this.level;
	    this.gameOver = false;
	    this.tetris = false;
	    this.x = x;
	    this.y = y;
	    this.width = BASE_BLOCK_WIDTH * WIDTH;
	    this.height = BASE_BLOCK_WIDTH * HEIGHT;
	    this.color = '#333';
	    this.board = [];
	    // initialize starting board position based on the width and height
	    for (var i = 0; i < HEIGHT; i++) {
	      this.board.push([]);
	      for (var j = 0; j < WIDTH; j++) {
	        this.board[i].push(new BaseBlock(this, j, i, 'empty'));
	      }
	    }
	    this.spawnNewBlock();
	  }

	  _createClass(Board, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      ctx.strokeStyle = this.color;
	      ctx.strokeRect(this.x, this.y, this.width, this.height);
	      ctx.fillStyle = '#333';
	      ctx.font = '24px monospace';
	      var rightX = this.x * 2 + this.width;
	      ctx.fillText('Level: ', rightX, this.y * 2);
	      ctx.fillText(this.level, rightX, this.y * 3);
	      ctx.fillText('Score: ', rightX, this.y * 5);
	      ctx.fillText(this.score, rightX, this.y * 7);
	      ctx.fillText('Lines:', rightX, this.y * 9);
	      ctx.fillText(this.lineCleared, rightX, this.y * 11);
	      ctx.fillText('Next: ', rightX, this.y * 13);

	      this.board.forEach(function (row) {
	        row.forEach(function (b) {
	          b.draw(ctx);
	        });
	      });
	      if (!initial) {
	        this.nextBlock.draw(ctx);
	        this.activeBlock.draw(ctx);
	      }
	    }
	  }, {
	    key: 'handleAction',
	    value: function handleAction(keyPressed) {
	      var _this = this;

	      if (this.gameOver) {
	        return;
	      }
	      // validate input (boundary)
	      Object.keys(keyPressed).forEach(function (key) {
	        if (keyPressed[key]) {
	          if (!(_this.activeBlock.collideCounter > 0 && key === 'down')) {
	            var newBlock = _this.activeBlock.move(key);
	            if (newBlock.blocks.every(function (b) {
	              return _this.isValid(b);
	            })) {
	              _this.activeBlock = newBlock;
	            }
	          } else if (key === 'down') {
	            _this.activeBlock.collideCounter = COLLIDE_LIMIT;
	          }
	          keyPressed[key] = false;
	        }
	      });
	      // check if the current active block is colliding if so, spawn a new block
	      if (this.activeBlock.blocks.some(function (b) {
	        return _this.collide(b);
	      })) {
	        // collide
	        this.activeBlock.collideCounter++;
	        if (this.activeBlock.collideCounter >= COLLIDE_LIMIT) {
	          this.activeBlock.blocks.forEach(function (b) {
	            var y = Math.round(b.y);
	            b.y = y;
	            _this.board[b.y][b.x] = b;
	          });
	          this.spawnNewBlock();
	        }
	      } else {
	        var newBlock = this.activeBlock.move();
	        if (newBlock.blocks.every(function (b) {
	          return _this.isValid(b);
	        })) {
	          this.activeBlock = newBlock;
	        }
	      }
	      this.clearLine();
	    }
	  }, {
	    key: 'clearLine',
	    value: function clearLine() {
	      var _this2 = this;

	      var lineCleared = 0;
	      this.board.forEach(function (row, index) {
	        if (row.every(function (b) {
	          return b.type !== 'empty';
	        })) {
	          lineCleared++;
	          var emptyRow = [];
	          for (var j = 0; j < WIDTH; j++) {
	            emptyRow.push(new BaseBlock(_this2, j, 0, 'empty'));
	          }
	          for (var i = index; i > 0; i--) {
	            var rowAbove = _this2.board[i - 1];
	            rowAbove.forEach(function (b) {
	              b.y = b.y + 1;
	            });
	            _this2.board[i] = rowAbove;
	          }
	          _this2.board[0] = emptyRow;
	        }
	      });
	      if (lineCleared > 0) {
	        if (this.tetris && lineCleared === 4) {
	          // back to back tetris!
	          this.score += 400;
	        }
	        this.tetris = lineCleared === 4;
	        this.score += 100 * Math.pow(2, lineCleared - 1);
	      }
	      this.lineCleared += lineCleared;
	      this.level = this.startLevel + Math.floor(this.lineCleared / LEVEL_UP_COUNTER);
	      this.velocity = 0.05 * this.level;
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid(block) {
	      var y = Math.round(block.y);
	      var x = block.x;
	      return x >= 0 && x <= WIDTH - 1 && y < HEIGHT && y >= 0 && this.board[y][x].type === 'empty';
	    }
	  }, {
	    key: 'collide',
	    value: function collide(block) {
	      var y = Math.floor(block.y);
	      var x = block.x;
	      return y >= HEIGHT - 1 || this.board[y + 1][x] && this.board[y + 1][x].type !== 'empty';
	    }
	  }, {
	    key: 'spawnNewBlock',
	    value: function spawnNewBlock() {
	      var _this3 = this;

	      var shapes = Object.keys(SHAPES);
	      var randomShape = shapes[Math.floor(Math.random() * shapes.length)];

	      if (!this.activeBlock) {
	        this.activeBlock = new ComplexBlock(this, randomShape);
	        randomShape = shapes[Math.floor(Math.random() * shapes.length)];
	      } else {
	        this.activeBlock = new ComplexBlock(this, this.nextBlock.shape);
	      }
	      var x = this.x * 2 + this.width;
	      var y = this.y * 14;
	      this.nextBlock = new ComplexBlock({ x: x, y: y }, randomShape, 0, 1, 0);

	      if (this.activeBlock.blocks.some(function (b) {
	        return _this3.collide(b);
	      })) {
	        this.gameOver = true;
	      }
	    }
	  }]);

	  return Board;
	}();

	var ComplexBlock = function () {
	  function ComplexBlock(board, shape) {
	    var shapeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	    var _this4 = this;

	    var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;
	    var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

	    _classCallCheck(this, ComplexBlock);

	    this.board = board;
	    this.shape = shape;
	    this.blocks = [];
	    this.shapeIndex = shapeIndex;
	    this.collideCounter = 0;
	    var shapeMatrix = SHAPES[this.shape][shapeIndex];
	    shapeMatrix.forEach(function (row, i) {
	      row.forEach(function (col, j) {
	        if (shapeMatrix[i][j] === 1) {
	          _this4.blocks.push(new BaseBlock(board, x + i, y + j, _this4.shape));
	        }
	      });
	    });
	  }

	  _createClass(ComplexBlock, [{
	    key: 'move',
	    value: function move(action) {
	      var _this5 = this;

	      if (action === 'rotate') {
	        var x = this.blocks[0].x;
	        var y = this.blocks[0].y;
	        var shapeIndex = this.shapeIndex === SHAPES[this.shape].length - 1 ? 0 : this.shapeIndex + 1;
	        var _newBlock = new ComplexBlock(this.board, this.shape, shapeIndex, x, y);
	        return _newBlock;
	      } else if (action === 'drop') {
	        var _newBlock2 = this.move();
	        // TODO: probably find a better way to loop though this better later
	        while (!_newBlock2.blocks.some(function (b) {
	          return _this5.board.collide(b);
	        })) {
	          _newBlock2 = _newBlock2.move();
	        }
	        _newBlock2.collideCounter = COLLIDE_LIMIT;
	        return _newBlock2;
	      }

	      var newBlock = Object.assign(Object.create(this), this);
	      newBlock.blocks = newBlock.blocks.map(function (b) {
	        return b.move(action);
	      });
	      return newBlock;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      this.blocks.forEach(function (b) {
	        return b.draw(ctx);
	      });
	    }
	  }]);

	  return ComplexBlock;
	}();

	var BaseBlock = function () {
	  function BaseBlock(board) {
	    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'block';

	    _classCallCheck(this, BaseBlock);

	    this.board = board;
	    this.x = x;
	    this.y = y;
	    this.width = BASE_BLOCK_WIDTH;
	    this.height = BASE_BLOCK_WIDTH;
	    this.type = type;
	    this.color = this.type === 'empty' ? '#ccc' : BLOCK_COLORS[type];
	  }

	  _createClass(BaseBlock, [{
	    key: 'move',
	    value: function move(action) {
	      var newBlock = Object.assign(Object.create(this), this);
	      switch (action) {
	        case 'left':
	          newBlock.x--;
	          break;
	        case 'right':
	          newBlock.x++;
	          break;
	        case 'down':
	          newBlock.y += this.board.velocity + 0.2;
	          break;
	        default:
	          newBlock.y += this.board.velocity;
	      }
	      return newBlock;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var x = this.board.x + this.x * BASE_BLOCK_WIDTH;
	      var y = this.board.y + this.y * BASE_BLOCK_WIDTH;
	      ctx.fillStyle = this.color;
	      ctx.fillRect(x, y, this.width, this.height);
	      ctx.strokeStyle = '#eee';
	      ctx.strokeRect(x, y, this.width, this.height);
	    }
	  }]);

	  return BaseBlock;
	}();

	exports.Board = Board;
	exports.BaseBlock = BaseBlock;

/***/ }
/******/ ]);