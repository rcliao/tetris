'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_BLOCK_WIDTH = 10;

var Board = function () {
  function Board(x, y) {
    _classCallCheck(this, Board);

    this.x = x;
    this.y = y;
    this.width = BASE_BLOCK_WIDTH * 10;
    this.height = BASE_BLOCK_WIDTH * 20;
    this.color = '#ccc';
    this.activeBlock = new BaseBlock(this);
    this.blocks = [];
  }

  _createClass(Board, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.strokeRect(this.x, this.y, this.width, this.height);

      this.activeBlock.draw(ctx);
      this.blocks.forEach(function (block) {
        return block.draw(ctx);
      });
    }
  }, {
    key: 'handleAction',
    value: function handleAction(keyPressed) {
      var _this = this;

      if (this.activeBlock.y < this.height + this.y - BASE_BLOCK_WIDTH) {
        Object.keys(keyPressed).forEach(function (key) {
          if (keyPressed[key]) {
            _this.activeBlock.move(key);
          }
          keyPressed[key] = false;
        });
        this.activeBlock.move();
      } else {
        this.blocks.push(this.activeBlock);
        this.spawnNewBlock();
      }
    }
  }, {
    key: 'spawnNewBlock',
    value: function spawnNewBlock() {
      this.activeBlock = new BaseBlock(this);
    }
  }]);

  return Board;
}();

var BaseBlock = function () {
  function BaseBlock(board) {
    _classCallCheck(this, BaseBlock);

    this.board = board;
    this.x = board.x + 4 * BASE_BLOCK_WIDTH;
    this.y = board.y;
    this.width = BASE_BLOCK_WIDTH;
    this.height = BASE_BLOCK_WIDTH;
    this.color = '#f00';
  }

  _createClass(BaseBlock, [{
    key: 'move',
    value: function move(action) {
      console.log('moving block');
      this.y++;
      switch (action) {
        case 'left':
          this.x -= BASE_BLOCK_WIDTH;
          break;
        case 'right':
          this.x += BASE_BLOCK_WIDTH;
          break;
        case 'down':
          this.y++;
          break;
        case 'up':
          this.rotate();
          break;
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      console.log('rotating');
    }
  }]);

  return BaseBlock;
}();

exports.default = {
  Board: Board,
  BaseBlock: BaseBlock
};