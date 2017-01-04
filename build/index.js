'use strict';

var _board = require('./board');

main();

function main() {
  var canvas = document.querySelector('#main');
  var ctx = canvas.getContext('2d');
  var keyPressed = {};
  var FPS = 60;

  var board = new _board.Board(20, 20);

  document.addEventListener('keydown', function (evt) {
    console.log(evt.which);
    var action = '';
    switch (evt.which) {
      case 72:
        action = 'left';
        break;
      case 74:
        action = 'down';
        break;
      case 75:
        action = 'up';
        break;
      case 76:
        action = 'right';
        break;
    }
    keyPressed[action] = true;
  });

  setInterval(function () {
    update(keyPressed, board);
    draw(canvas, ctx, board);
  }, 1000 / FPS);
}

function update(keyPressed, board) {
  board.handleAction(keyPressed);
}

function draw(canvas, ctx, board) {
  // redraw entire canvas to be blank before next render
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  board.draw(ctx);
}