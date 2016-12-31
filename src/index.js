'use strict'

import {Board, BaseBlock} from './board'

main()

function main () {
  const canvas = document.querySelector('#main')
  const ctx = canvas.getContext('2d')
  const keyPressed = {}
  const FPS = 60
  
  const board = new Board(20, 20)
  
  document.addEventListener('keydown', evt => {
    console.log(evt.which)
    let action = ''
    switch (evt.which) {
      case 72:
        action = 'left'
        break
      case 74:
        action = 'down'
        break
      case 75:
        action = 'up'
        break
      case 76:
        action = 'right'
        break
    }
    keyPressed[action] = true
  })

  setInterval(() => {
    update(keyPressed, board)
    draw(canvas, ctx, board);
  }, 1000 / FPS)
}

function update(keyPressed, board) {
  board.handleAction(keyPressed)
}

function draw (canvas, ctx, board) {
  // redraw entire canvas to be blank before next render
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  board.draw(ctx)
}
