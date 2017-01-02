const BASE_BLOCK_WIDTH = 30
const WIDTH = 10
const HEIGHT = 20
const VELOCITY = 0.1

const SHAPES = {
  'o': [
    [[1, 1], [1, 1]]
  ],
  'i': [
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]]
  ],
  's': [
    [[0, 1], [1, 1], [1]],
    [[1, 1], [0, 1, 1]]
  ],
  'z': [
    [[1], [1, 1], [0, 1]],
    [[0, 1, 1], [1, 1]]
  ],
  'l': [
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1], [1], [1]],
    [[1], [1, 1, 1]],
    [[0, 1], [0, 1], [1, 1]]
  ],
  'j': [
    [[0, 0, 1], [1, 1, 1]],
    [[1, 1], [0, 1], [0, 1]],
    [[1, 1, 1], [1]],
    [[1], [1], [1, 1]]
  ],
  't': [
    [[1, 0], [1, 1], [1]],
    [[0, 1], [1, 1, 1]],
    [[0, 1], [1, 1], [0, 1]],
    [[1, 1, 1], [0, 1]]
  ]
}

class Board {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.width = BASE_BLOCK_WIDTH * WIDTH 
    this.height = BASE_BLOCK_WIDTH * HEIGHT
    this.color = '#333'
    this.board = []
    // initialize starting board position based on the width and height
    for (var i = 0; i < HEIGHT; i ++) {
      this.board.push([])
      for (var j = 0; j < WIDTH; j ++) {
        this.board[i].push(new BaseBlock(this, j, i, 'empty'))
      }
    }
    this.spawnNewBlock()
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
    // validate input (boundary)
    Object.keys(keyPressed).forEach(key => {
      if (keyPressed[key]) {
        let newBlock = this.activeBlock.move(key)
        if (newBlock.blocks.every(b => this.isValid(b))) {
          this.activeBlock = newBlock
        }
        keyPressed[key] = false
      }
    })
    // check if the current active block is colliding if so, spawn a new block
    if (this.activeBlock.blocks.some(b => this.collide(b))) {
      // collide
      this.activeBlock.blocks.forEach(b => {
        let y = Math.round(b.y)
        b.y = y
        this.board[b.y][b.x] = b
      })
      this.spawnNewBlock()
    } else {
      let newBlock = this.activeBlock.move()
      if (newBlock.blocks.every(b => this.isValid(b))) {
        this.activeBlock = newBlock
      }
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

  collide (block) {
    let y = Math.floor(block.y)
    let x = block.x
    return y >= (HEIGHT - 1) || 
      (
        this.board[y+1][x] &&
        this.board[y+1][x].type === 'block'
      )
  }

  spawnNewBlock () {
    let shapes = Object.keys(SHAPES)
    let randomShape = shapes[Math.floor(Math.random() * shapes.length)]
    this.activeBlock = new ComplexBlock(this, randomShape)
  }
}

class ComplexBlock {
  constructor(board, shape, shapeIndex = 0, x = 4, y = 0) {
    this.board = board
    this.shape = shape
    this.blocks = []
    this.shapeIndex = shapeIndex
    let shapeMatrix = SHAPES[this.shape][shapeIndex]
    shapeMatrix.forEach((row, i) => {
      row.forEach((col, j)=> {
        if (shapeMatrix[i][j] === 1) {
          this.blocks.push(new BaseBlock(board, x+i, y+j))
        }
      })
    })
  }

  move (action) {
    if (action === 'rotate') {
      let x = this.blocks[0].x
      let y = this.blocks[0].y
      let shapeIndex = (this.shapeIndex === SHAPES[this.shape].length - 1) ?
        0 : this.shapeIndex + 1
      console.log(shapeIndex)
      let newBlock = new ComplexBlock(this.board, this.shape, shapeIndex, x, y)
      return newBlock
    }

    let newBlock = Object.assign(Object.create(this), this)
    newBlock.blocks = newBlock.blocks.map(b => b.move(action))
    return newBlock
  }

  draw (ctx) {
    this.blocks.forEach(b => b.draw(ctx))
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
    this.velocity = VELOCITY
  }

  move (action) {
    let newBlock = Object.assign(Object.create(this), this)
    switch (action) {
      case 'left':
        newBlock.x--
        break
      case 'right':
        newBlock.x++
        break
      case 'down':
        newBlock.y+=this.velocity
        break
      default:
        newBlock.y+=this.velocity
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
}

export {
  Board,
  BaseBlock
}
