import Character from "./character.js";
import gameBoard from "./gameBoard.js";

window.onload = () => {
    let board = new gameBoard(10);
    board.draw();
    let personaje = new Character('Alex');
    personaje.draw(0,board.getSize - 1);
    let dado = document.getElementById('dado');
    dado.addEventListener('click', () => {
        if(document.getElementsByClassName('pointer').length === 0){
            let numeroAletorio = Math.floor(Math.random()*5 + 1);
            personaje.where(numeroAletorio, 10);
            console.log(personaje.getAttempts)
        }
    });
}