"uses strict";

import Character from "./character.js";
import Enemy from "./enemy.js";
import gameBoard from "./gameBoard.js";

window.onload = () => {
    let boton = document.getElementById('jugar');
    boton.addEventListener('click', (eve) => {
        eve.preventDefault();
        let nombre = document.getElementById('nombre').value;
        validarNombre(nombre);
    })
}

const post = async() => {
    const data = new FormData(document.getElementById('formulario'));
    return fetch("http://liquid-hilltops.000webhostapp.com/control-nombre.php", {
        method: 'POST',
        body: data
    })
    .then((response) => {
        if(response.ok){
            return response.text();
        } else {
            throw new Error('No se puedo validar el nombre en el servidor');
        }
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
        post().then((respuesta) => {respuesta == 'Ok' ? jugar(nombre) : alert('El nombre debe ser impar!')});
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
        let dado = document.createElement('img');
        document.body.appendChild(dado);
        dado.id = 'dado';
        dado.src = "../img/dado1.png";
        let enemy = new Enemy();
        enemy.draw(); 
        dado.addEventListener('click', () => {
            if(document.getElementsByClassName('pointer').length === 0){
                let numeroAletorio = Math.round(Math.random()*5 + 1);
                personaje.where(numeroAletorio, 10, enemy);
                dado.src = `../img/dado${numeroAletorio}.png`;
            }
        });
        let personajeImg = document.getElementById('character');
        personajeImg.addEventListener('DOMNodeInserted', () => {
            console.log('Me movi');
            if(enemy.cerca(personaje)){
                enemy.ataque(personaje);
                console.log('Me pegastes');
                if(personaje.muerto()){
                    console.log('Te moristes')
                }
            }
            console.log(personaje)
        })
}