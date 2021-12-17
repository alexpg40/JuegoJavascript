import Character from "./character.js";
import gameBoard from "./gameBoard.js";

window.onload = () => {
    let board = new gameBoard(10);
    board.draw();
    let personaje = new Character('Alex');
    personaje.draw(0,0);
}