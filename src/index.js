'use strict'

import {Board, BaseBlock} from './board'

// polyfill requestAnimationFrame method
const vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

main()

function main () {
  const canvas = document.querySelector('#main')
  const ctx = canvas.getContext('2d')
  const keyPressed = {}
  
  const board = new Board(20, 20)
  
  // handle and translate keyboard into action
  document.addEventListener('keydown', evt => {
    console.log(evt.which)
    let action = ''
    switch (evt.which) {
      case 37:
        action = 'left'
        break
      case 38:
        action = 'rotate'
        break
      case 39:
        action = 'right'
        break
      case 40:
        action = 'down'
        break
      case 72:
        action = 'left'
        break
      case 74:
        action = 'down'
        break
      case 75:
        action = 'rotate'
        break
      case 76:
        action = 'right'
        break
    }
    keyPressed[action] = true
  })

  gameLoop()
  
  function gameLoop () {
    window.requestAnimationFrame(gameLoop)
    board.handleAction(keyPressed)
    draw(canvas, ctx, board)
  }
}

function draw (canvas, ctx, board) {
  // redraw entire canvas to be blank before next render
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  board.draw(ctx)
}
