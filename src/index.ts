import { Board } from "./board";

const actionKeyMap: { [key: number]: string; } = {
    32: "drop",
    37: "left",
    38: "rotate",
    39: "right",
    40: "down",
    72: "left",
    74: "down",
    75: "rotate",
    76: "right",
};

const canvas = <HTMLCanvasElement> document.querySelector("#main");
const ctx = canvas.getContext("2d");
let board = new Board(20, 20);
board.draw(ctx, true);

const startButton = <HTMLButtonElement> document.querySelector("#start");

startButton!.addEventListener("click", () => {
    main();
    startButton!.disabled = true;
});

function main () {
    const keyPressed: { [key: string]: boolean } = {};

    board = new Board(20, 20);

    // handle and translate keyboard into action
    document.addEventListener("keydown", evt => {
        let action = actionKeyMap[evt.which];
        if (action !== "") {
            evt.preventDefault();
            evt.stopPropagation();
        }
        keyPressed[action] = true;
    });

    gameLoop();

    function gameLoop () {
        if (!board.gameOver) {
            window.requestAnimationFrame(gameLoop);
            board.handleAction(keyPressed);
            draw(canvas, ctx, board);
        } else {
            startButton.disabled = false;
        }
    }
}

function draw (canvas: any, ctx: any, board: Board) {
    // redraw entire canvas to be blank before next render
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    board.draw(ctx);
}
