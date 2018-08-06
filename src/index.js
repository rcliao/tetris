import {Board, BaseBlock} from './board'

// unify requestAnimationFrame method for all vendors
const vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

const canvas = document.querySelector('#main')
const ctx = canvas.getContext('2d')
const board = new Board(20, 20)
board.draw(ctx, true)

const startButton = document.querySelector('#start')
const hostButton = document.querySelector('#host')
const connectButton = document.querySelector('#connect')

startButton.addEventListener('click', () => {
  main()
  startButton.disabled = true
  hostButton.disabled = true
  connectButton.disabled = true
})

hostButton.addEventListener('click', () => {
  console.log('hosting')
})

connectButton.addEventListener('click', () => {
  console.log('connecting')
})

function main () {
  const keyPressed = {}
  
  board = new Board(20, 20)
  
  // handle and translate keyboard into action
  document.addEventListener('keydown', evt => {
    let action = ''
    switch (evt.which) {
      case 32:
        action = 'drop'
        break
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
    if (action !== '') {
      evt.preventDefault()
      evt.stopPropagation()
    }
    keyPressed[action] = true
  })

  gameLoop()
  
  function gameLoop () {
    if (!board.gameOver) {
      window.requestAnimationFrame(gameLoop)
      board.handleAction(keyPressed)
      draw(canvas, ctx, board)
    } else {
      startButton.disabled = false
      hostButton.disabled = false
      connectButton.disabled = false
    }
  }
}

function draw (canvas, ctx, board) {
  // redraw entire canvas to be blank before next render
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  board.draw(ctx)
}
