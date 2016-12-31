(function() {
  'use strict'
  const BASE_BLOCK_WIDTH = 10

  class Board {
    constructor (x, y) {
      this.x = x
      this.y = y
      this.width = BASE_BLOCK_WIDTH * 10
      this.height = BASE_BLOCK_WIDTH * 20
      this.color = '#ccc'
      this.activeBlock = new BaseBlock(this)
      this.blocks = []
    }

    draw (ctx) {
      ctx.fillStyle = this.color
      ctx.strokeRect(this.x, this.y, this.width, this.height)

      this.activeBlock.draw(ctx)
      this.blocks.forEach(block => block.draw(ctx))
    }

    handleAction (keyPressed) {
      if (this.activeBlock.y < this.height + this.y - BASE_BLOCK_WIDTH) {
        Object.keys(keyPressed).forEach(key => {
          if (keyPressed[key]) {
            this.activeBlock.move(key)
          }
          keyPressed[key] = false
        })
        this.activeBlock.move()
      } else {
        this.blocks.push(this.activeBlock)
        this.spawnNewBlock()
      }
    }

    spawnNewBlock () {
      this.activeBlock = new BaseBlock(this)
    }
  }

  class BaseBlock {
    constructor(board) {
      this.board = board
      this.x = board.x + 4 * BASE_BLOCK_WIDTH
      this.y = board.y
      this.width = BASE_BLOCK_WIDTH
      this.height = BASE_BLOCK_WIDTH
      this.color = '#f00'
    }

    move (action) {
      console.log('moving block')
      this.y++
      switch (action) {
        case 'left':
          this.x -= BASE_BLOCK_WIDTH
          break
        case 'right':
          this.x += BASE_BLOCK_WIDTH
          break
        case 'down':
          this.y++
          break
        case 'up':
          this.rotate()
          break
      }
    }

    draw (ctx) {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    rotate () {
      console.log('rotating')
    }
  }

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
})()
