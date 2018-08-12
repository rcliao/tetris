const BASE_BLOCK_WIDTH = 30;
const WIDTH = 10;
const HEIGHT = 20;
const COLLIDE_LIMIT = 30;
const LEVEL_UP_COUNTER = 30;

interface Axis {
    x: number;
    y: number;
    velocity: number;
}

const BLOCK_COLORS: { [key: string]: string } = {
    "o": "#FBC02D",
    "i": "#0097A7",
    "s": "#4CAF50",
    "z": "#F44336",
    "l": "#FF9800",
    "j": "#2196F3",
    "t": "#9C27B0"
};
const SHAPES: { [key: string]: number[][][] } = {
    "o": [
        [[1, 1], [1, 1]]
    ],
    "i": [
        [[1, 1, 1, 1]],
        [[1], [1], [1], [1]]
    ],
    "s": [
        [[0, 1], [1, 1], [1]],
        [[1, 1], [0, 1, 1]]
    ],
    "z": [
        [[1], [1, 1], [0, 1]],
        [[0, 1, 1], [1, 1]]
    ],
    "l": [
        [[1, 1, 1], [0, 0, 1]],
        [[1, 1], [1], [1]],
        [[1], [1, 1, 1]],
        [[0, 1], [0, 1], [1, 1]]
    ],
    "j": [
        [[0, 0, 1], [1, 1, 1]],
        [[1, 1], [0, 1], [0, 1]],
        [[1, 1, 1], [1]],
        [[1], [1], [1, 1]]
    ],
    "t": [
        [[1, 0], [1, 1], [1]],
        [[0, 1], [1, 1, 1]],
        [[0, 1], [1, 1], [0, 1]],
        [[1, 1, 1], [0, 1]]
    ]
};

class Board implements Axis {
    private score: number;
    private lineCleared: number;
    private startLevel: number;
    private level: number;
    public velocity: number;
    public gameOver: boolean;
    private tetris: boolean;
    public x: number;
    public y: number;
    private width: number;
    private height: number;
    private color: string;
    private board: BaseBlock[][];
    private nextBlock: ComplexBlock;
    private activeBlock: ComplexBlock;

    constructor (x: number, y: number, level: number = 1) {
        this.score = 0;
        this.lineCleared = 0;
        this.startLevel = level;
        this.level = level;
        this.velocity = 0.05 * this.level;
        this.gameOver = false;
        this.tetris = false;
        this.x = x;
        this.y = y;
        this.width = BASE_BLOCK_WIDTH * WIDTH;
        this.height = BASE_BLOCK_WIDTH * HEIGHT;
        this.color = "#333";
        this.board = [];
        // initialize starting board position based on the width and height
        for (let i = 0; i < HEIGHT; i ++) {
            this.board.push([]);
            for (let j = 0; j < WIDTH; j ++) {
                this.board[i].push(new BaseBlock(this, j, i, "empty"));
            }
        }
        this.spawnNewBlock();
    }

    draw (ctx: any, initial = false) {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#333";
        ctx.font = "24px monospace";
        let rightX = this.x * 2 + this.width;
        ctx.fillText("Level: ", rightX, this.y * 2);
        ctx.fillText(this.level, rightX, this.y * 3);
        ctx.fillText("Score: ", rightX, this.y * 5);
        ctx.fillText(this.score, rightX, this.y * 7);
        ctx.fillText("Lines:", rightX, this.y * 9);
        ctx.fillText(this.lineCleared, rightX, this.y * 11);
        ctx.fillText("Next: ", rightX, this.y * 13);

        this.board.forEach(row => {
            row.forEach(b => {
                b.draw(ctx);
            });
        });
        if (!initial) {
            this.nextBlock.draw(ctx);
            this.activeBlock.draw(ctx);
        }
    }

    handleAction (keyPressed: { [key: string]: boolean }) {
        if (this.gameOver) {
            return;
        }
        // validate input (boundary)
        Object.keys(keyPressed).forEach(key => {
            if (keyPressed[key]) {
                if (!(this.activeBlock.collideCounter > 0 && key === "down")) {
                    let newBlock = this.activeBlock.move(key);
                    if (newBlock.blocks.every(b => this.isValid(b))) {
                        this.activeBlock = newBlock;
                    }
                } else if (key === "down") {
                    this.activeBlock.collideCounter = COLLIDE_LIMIT;
                }
                keyPressed[key] = false;
            }
        });
        // check if the current active block is colliding if so, spawn a new block
        if (this.activeBlock.blocks.some(b => this.collide(b))) {
            // collide
            this.activeBlock.collideCounter ++;
            if (this.activeBlock.collideCounter >= COLLIDE_LIMIT) {
                this.activeBlock.blocks.forEach(b => {
                    let y = Math.round(b.y);
                    b.y = y;
                    this.board[b.y][b.x] = b;
                });
                this.spawnNewBlock();
            }
        } else {
            let newBlock = this.activeBlock.move();
            if (newBlock.blocks.every(b => this.isValid(b))) {
                this.activeBlock = newBlock;
            }
        }
        this.clearLine();
    }

    clearLine () {
        let lineCleared = 0;
        this.board.forEach((row, index) => {
            if (row.every(b => b.type !== "empty")) {
                lineCleared ++;
                let emptyRow = [];
                for (let j = 0; j < WIDTH; j ++) {
                    emptyRow.push(new BaseBlock(this, j, 0, "empty"));
                }
                for (let i = index; i > 0; i --) {
                    let rowAbove = this.board[i - 1];
                    rowAbove.forEach(b => {
                        b.y = b.y + 1;
                    });
                    this.board[i] = rowAbove;
                }
                this.board[0] = emptyRow;
            }
        });
        if (lineCleared > 0) {
            if (this.tetris && lineCleared === 4) {
                // back to back tetris!
                this.score += 400;
            }
            this.tetris = lineCleared === 4;
            this.score += 100 * Math.pow(2, lineCleared - 1);
        }
        this.lineCleared += lineCleared;
        this.level = this.startLevel + Math.floor(this.lineCleared / LEVEL_UP_COUNTER);
        this.velocity = 0.05 * this.level;
    }

    isValid (block: BaseBlock) {
        let y = Math.round(block.y);
        let x = block.x;

        return x >= 0 &&
            x <= WIDTH - 1 &&
            y < HEIGHT &&
            y >= 0 &&
            this.board[y][x].type === "empty";
    }

    collide (block: BaseBlock): boolean {
        let y = Math.floor(block.y);
        let x = block.x;
        return y >= (HEIGHT - 1) ||
            (
                this.board[y + 1][x] &&
                this.board[y + 1][x].type !== "empty"
            );
    }

    spawnNewBlock () {
        let shapes = Object.keys(SHAPES);
        let randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        if (!this.activeBlock) {
            this.activeBlock = new ComplexBlock(this, randomShape);
            randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        } else {
            this.activeBlock = new ComplexBlock(this, this.nextBlock.shape);
        }
        let x = this.x * 2 + this.width;
        let y = this.y * 14;
        const axis = {x, y, velocity: 0};
        this.nextBlock = new ComplexBlock(axis, randomShape, 0, 1, 0);

        if (this.activeBlock.blocks.some(b => this.collide(b))) {
            this.gameOver = true;
        }
    }
}

class ComplexBlock {
    private board: Axis;
    private shapeIndex: number;
    private x: number;
    private y: number;
    public shape: string;
    public blocks: BaseBlock[];
    public collideCounter: number;

    constructor(board: Axis, shape: string, shapeIndex = 0, x = 4, y = 0) {
        this.board = board;
        this.shape = shape;
        this.blocks = [];
        this.shapeIndex = shapeIndex;
        this.collideCounter = 0;
        let shapeMatrix = SHAPES[this.shape][shapeIndex];
        shapeMatrix.forEach((row, i) => {
            row.forEach((col, j) => {
                if (shapeMatrix[i][j] === 1) {
                    this.blocks.push(new BaseBlock(board, x + i, y + j, this.shape));
                }
            });
        });
    }

    move (action: string = ""): ComplexBlock {
        if (action === "rotate") {
            let x = this.blocks[0].x;
            let y = this.blocks[0].y;
            let shapeIndex = (this.shapeIndex === SHAPES[this.shape].length - 1) ?
                0 : this.shapeIndex + 1;
            let newBlock = new ComplexBlock(this.board, this.shape, shapeIndex, x, y);
            return newBlock;
        } else if (action === "drop") {
            let newBlock = this.move();
            newBlock.collideCounter = COLLIDE_LIMIT;
            return newBlock;
        }

        let newBlock: ComplexBlock = Object.assign(Object.create(this), this);
        newBlock.blocks = newBlock.blocks.map(b => b.move(action));
        return newBlock;
    }

    draw (ctx: any) {
        this.blocks.forEach(b => b.draw(ctx));
    }
}

class BaseBlock {
    public x: number;
    public y: number;
    public type: string;
    private board: Axis;
    private width: number;
    private height: number;
    private color: string;

    constructor(board: Axis, x: number = 4, y: number = 0, type: string = "block") {
        this.board = board;
        this.x = x;
        this.y = y;
        this.width = BASE_BLOCK_WIDTH;
        this.height = BASE_BLOCK_WIDTH;
        this.type = type;
        this.color = this.type === "empty" ? "#ccc" : BLOCK_COLORS[type];
    }

    move (action: string) {
        let newBlock = Object.assign(Object.create(this), this);
        switch (action) {
            case "left":
                newBlock.x--;
                break;
            case "right":
                newBlock.x++;
                break;
            case "down":
                newBlock.y += this.board.velocity + 0.2;
                break;
            default:
                newBlock.y += this.board.velocity;
        }
        return newBlock;
    }

    draw (ctx: any) {
        let x = this.board.x + this.x * BASE_BLOCK_WIDTH;
        let y = this.board.y + this.y * BASE_BLOCK_WIDTH;
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.width, this.height);
        ctx.strokeStyle = "#eee";
        ctx.strokeRect(x, y, this.width, this.height);
    }
}

export {
    Board,
    BaseBlock
}
