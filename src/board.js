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
    this.board = []
    // initialize starting board position based on the width and height
    for (var i = 0; i < HEIGHT; i ++) {
      this.board.push([])
      for (var j = 0; j < WIDTH; j ++) {
        this.board[i].push(new BaseBlock(this, j, i, 'empty'))
      }
    }
  }

  draw (ctx) {
    ctx.strokeStyle = this.color
    ctx.strokeRect(this.x, this.y, this.width, this.height)

    this.board.forEach(row => {
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
          let newBlock = this.activeBlock.move(key)
          if (this.isValid(newBlock)) {
            this.activeBlock = newBlock
          }
        }
        keyPressed[key] = false
      })
      let newBlock = this.activeBlock.move()
      if (this.isValid(newBlock)) {
        this.activeBlock = newBlock
      }
    } else {
      this.board[parseInt(this.activeBlock.y)][this.activeBlock.x] = this.activeBlock
      this.spawnNewBlock()
    }
  }

  isValid (block) {
    let y = parseInt(block.y)
    let x = block.x
    return x >= 0 &&
      x <= WIDTH - 1 &&
      this.board[y][x].type === 'empty' &&
      y < HEIGHT
  }

  collide () {
    let y = parseInt(this.activeBlock.y)
    let x = this.activeBlock.x
    return y >= (HEIGHT-1) || 
      (
        this.board[y+1][x] &&
        this.board[y+1][x].type === 'block'
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
    let newBlock = Object.assign(Object.create(this), this)
    newBlock.y++
    switch (action) {
      case 'left':
        newBlock.x--
        break
      case 'right':
        newBlock.x++
        break
      case 'down':
        newBlock.y++
        break
      case 'up':
        newBlock.rotate()
        break
    }
    return newBlock
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
