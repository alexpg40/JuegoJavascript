"uses strict";

import Character from "./character.js";
import gameBoard from "./gameBoard.js";

window.onload = () => {
    let boton = document.getElementById('jugar');
    boton.addEventListener('click', (eve) => {
        let nombre = document.getElementById('nombre').value;
        validarNombre(nombre);
        eve.preventDefault();
    })
}

const post = (nombre) => {
    console.log(nombre);
    fetch("../control-nombre.php", {
        method: 'POST',
        body: nombre.value
    })
    .then((response) => {
        if(response.ok){
            return response.text();
        }
    })
    .then((text) => {
        jugar(text);
    })
    .catch((error) => console.error(error));
}

const validarNombre = (nombre) => {
    let regexNumero = /\d/;
    if(nombre.length < 4){
        alert('El nombre debe tener 4 o más letras');
    } else if(regexNumero.test(nombre)){
        alert('Números no permitidos');
    } else{
        post(nombre);
    }
}

const jugar = (nombre) => {
        while(document.body.hasChildNodes()){
            document.body.removeChild(document.body.childNodes[0])
        }
        let board = new gameBoard(10);
        board.draw();
        let personaje = new Character(nombre);
        personaje.draw(0,board.getSize - 1);
        let dado = document.createElement('buton');
        document.body.appendChild(dado);
        dado.innerText = "Dado";
        dado.addEventListener('click', () => {
            if(document.getElementsByClassName('pointer').length === 0){
                let numeroAletorio = Math.floor(Math.random()*5 + 1);
                personaje.where(numeroAletorio, 10);
            }
        });
}