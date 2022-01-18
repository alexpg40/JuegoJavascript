"uses strict";
export default class gameBoard {
    constructor(sz) {
        this.size = sz;
    }
    get getSize() {
        return this.size;
    }
    draw() {
        let size = this.getSize;
        let board = document.createElement('div');
        board.style.display = 'grid';
        board.style.gridTemplateColumns = `repeat(${size}, 75px)`;
        board.style.gridTemplateRows = `repeat(${size}, 75px)`;
        board.style.gridGap = "10px";
        for (let y = size -1;  y >= 0; y--) {
            for (let x = 0; x < size; x++) {
                let box = document.createElement('div');
                box.className = "box";
                box.id = `box[${x},${y}]`;
                board.appendChild(box);
            }
        }
        document.body.appendChild(board);
    }
}