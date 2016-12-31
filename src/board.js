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

export {
  Board,
  BaseBlock
}
