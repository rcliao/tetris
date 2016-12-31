const BASE_BLOCK_WIDTH = 30
const WIDTH = 10
const HEIGHT = 20

class Board {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.width = BASE_BLOCK_WIDTH * WIDTH 
    this.height = BASE_BLOCK_WIDTH * HEIGHT
    this.color = '#333'
    this.activeBlock = new BaseBlock(this)
    this.state = []
    for (var i = 0; i < HEIGHT; i ++) {
      this.state.push([])
      for (var j = 0; j < WIDTH; j ++) {
        this.state[i].push(new BaseBlock(this, j, i, 'empty'))
      }
    }
  }

  draw (ctx) {
    ctx.strokeStyle = this.color
    ctx.strokeRect(this.x, this.y, this.width, this.height)

    this.state.forEach(row => {
      row.forEach(b => {
        b.draw(ctx)
      })
    })
    this.activeBlock.draw(ctx)
  }

  handleAction (keyPressed) {
    if (!this.collide()) {
      Object.keys(keyPressed).forEach(key => {
        if (keyPressed[key]) {
          if (!(key === 'left' && this.activeBlock.x === 0 ||
              key === 'right' && this.activeBlock.x === (WIDTH - 1))) {
            this.activeBlock.move(key)
          }
        }
        keyPressed[key] = false
      })
      this.activeBlock.move()
    } else {
      this.state[parseInt(this.activeBlock.y)][this.activeBlock.x] = this.activeBlock
      this.spawnNewBlock()
    }
  }

  collide () {
    let y = parseInt(this.activeBlock.y)
    let x = this.activeBlock.x
    return y >= (HEIGHT - 1) || 
      (
        this.state[y+1][x] &&
        this.state[y+1][x].type === 'block'
      )
  }

  spawnNewBlock () {
    this.activeBlock = new BaseBlock(this)
  }
}

class BaseBlock {
  constructor(board, x = 4, y = 0, type = 'block') {
    this.board = board
    this.x = x
    this.y = y
    this.width = BASE_BLOCK_WIDTH
    this.height = BASE_BLOCK_WIDTH
    this.type = type
    this.color = this.type === 'empty' ? '#ccc' : '#f00'
  }

  move (action) {
    this.y+=0.05
    switch (action) {
      case 'left':
        this.x--
        break
      case 'right':
        this.x++
        break
      case 'down':
        this.y+=0.1
        break
      case 'up':
        this.rotate()
        break
    }
  }

  draw (ctx) {
    let x = this.board.x + this.x * BASE_BLOCK_WIDTH
    let y = this.board.y + this.y * BASE_BLOCK_WIDTH
    ctx.fillStyle = this.color
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#eee'
    ctx.strokeRect(x, y, this.width, this.height)
  }

  rotate () {
    console.log('rotating')
  }
}

export {
  Board,
  BaseBlock
}
