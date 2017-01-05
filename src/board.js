const BASE_BLOCK_WIDTH = 30
const WIDTH = 10
const HEIGHT = 20
const COLLIDE_LIMIT = 30

const BLOCK_COLORS = {
  'o': '#FBC02D',
  'i': '#0097A7',
  's': '#4CAF50',
  'z': '#F44336',
  'l': '#FF9800',
  'j': '#2196F3',
  't': '#9C27B0'
}
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
  constructor (x, y, level = 1) {
    this.score = 0
    this.lineCleared = 0
    this.level = level
    this.velocity = 0.05 * this.level
    this.gameOver = false
    this.tetris = false
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
    ctx.fillStyle = '#333'
    ctx.font = '24px monospace'
    let rightX = this.x * 2 + this.width
    ctx.fillText('Level: ', rightX, this.y * 2)
    ctx.fillText(this.level, rightX, this.y * 3)
    ctx.fillText('Score: ', rightX, this.y * 5)
    ctx.fillText(this.score, rightX, this.y * 7)
    ctx.fillText('Lines:', rightX, this.y * 9)
    ctx.fillText(this.lineCleared, rightX, this.y * 11)
    ctx.fillText('Next: ', rightX, this.y * 13)

    this.board.forEach(row => {
      row.forEach(b => {
        b.draw(ctx)
      })
    })
    this.nextBlock.draw(ctx)
    this.activeBlock.draw(ctx)
  }

  handleAction (keyPressed) {
    if (this.gameOver) {
      return
    }
    // validate input (boundary)
    Object.keys(keyPressed).forEach(key => {
      if (keyPressed[key]) {
        if (!(this.activeBlock.collideCounter > 0 && key === 'down')) {
          let newBlock = this.activeBlock.move(key)
          if (newBlock.blocks.every(b => this.isValid(b))) {
            this.activeBlock = newBlock
          }
        } else if (key === 'down') {
          this.activeBlock.collideCounter = COLLIDE_LIMIT
        }
        keyPressed[key] = false
      }
    })
    // check if the current active block is colliding if so, spawn a new block
    if (this.activeBlock.blocks.some(b => this.collide(b))) {
      // collide
      this.activeBlock.collideCounter ++
      if (this.activeBlock.collideCounter >= COLLIDE_LIMIT) {
        this.activeBlock.blocks.forEach(b => {
          let y = Math.round(b.y)
            b.y = y
            this.board[b.y][b.x] = b
        })
        this.spawnNewBlock()
      }
    } else {
      let newBlock = this.activeBlock.move()
      if (newBlock.blocks.every(b => this.isValid(b))) {
        this.activeBlock = newBlock
      }
    }
    this.clearLine()
  }

  clearLine () {
    let lineCleared = 0
    this.board.forEach((row, index) => {
      if (row.every(b => b.type !== 'empty')) {
        lineCleared ++
        let emptyRow = []
        for (var j = 0; j < WIDTH; j ++) {
          emptyRow.push(new BaseBlock(this, j, 0, 'empty'))
        }
        for (var i = index; i > 0; i --) {
          let rowAbove = this.board[i - 1]
          rowAbove.forEach(b => {
            b.y = b.y+1
          })
          this.board[i] = rowAbove
        }
        this.board[0] = emptyRow
      }
    })
    if (lineCleared > 0) {
      if (this.tetris && lineCleared === 4) {
        // back to back tetris!
        this.score += 400
      }
      this.tetris = lineCleared === 4
      this.score += 100 * Math.pow(2, lineCleared - 1)
    }
    this.lineCleared += lineCleared
    this.level += Math.floor(lineCleared / 30)
    this.velocity = 0.05 * this.level
  }

  isValid (block) {
    let y = Math.round(block.y)
    let x = block.x
    return x >= 0 &&
      x <= WIDTH - 1 &&
      y < HEIGHT &&
      y >= 0 &&
      this.board[y][x].type === 'empty'
  }

  collide (block) {
    let y = Math.floor(block.y)
    let x = block.x
    return y >= (HEIGHT - 1) || 
      (
        this.board[y+1][x] &&
        this.board[y+1][x].type !== 'empty'
      )
  }

  spawnNewBlock () {
    let shapes = Object.keys(SHAPES)
    let randomShape = shapes[Math.floor(Math.random() * shapes.length)]

    if (!this.activeBlock) {
      this.activeBlock = new ComplexBlock(this, randomShape)
      randomShape = shapes[Math.floor(Math.random() * shapes.length)]
    } else {
      this.activeBlock = new ComplexBlock(this, this.nextBlock.shape)
    }
    let x = this.x * 2 + this.width
    let y = this.y * 14
    this.nextBlock = new ComplexBlock({x, y}, randomShape, 0, 1, 0)

    if (this.activeBlock.blocks.some(b => this.collide(b))) {
      this.gameOver = true
    }
  }
}

class ComplexBlock {
  constructor(board, shape, shapeIndex = 0, x = 4, y = 0) {
    this.board = board
    this.shape = shape
    this.blocks = []
    this.shapeIndex = shapeIndex
    this.collideCounter = 0
    let shapeMatrix = SHAPES[this.shape][shapeIndex]
    shapeMatrix.forEach((row, i) => {
      row.forEach((col, j)=> {
        if (shapeMatrix[i][j] === 1) {
          this.blocks.push(new BaseBlock(board, x+i, y+j, this.shape))
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
      let newBlock = new ComplexBlock(this.board, this.shape, shapeIndex, x, y)
      return newBlock
    } else if (action === 'drop') {
      let newBlock = this.move()
      // TODO: probably find a better way to loop though this better later
      while (!newBlock.blocks.some(b => this.board.collide(b))) {
        newBlock = newBlock.move()
      }
      newBlock.collideCounter = COLLIDE_LIMIT
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
    this.color = this.type === 'empty' ? '#ccc' : BLOCK_COLORS[type]
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
        newBlock.y+=this.board.velocity + 0.2
        break
      default:
        newBlock.y+=this.board.velocity
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
