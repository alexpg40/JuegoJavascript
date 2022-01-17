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

const post = async () => {
    const data = new FormData(document.getElementById('formulario'));
    return fetch("http://liquid-hilltops.000webhostapp.com/control-nombre.php", {
        method: 'POST',
        body: data
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('No se puedo validar el nombre en el servidor');
            }
        })
        .catch((error) => console.error(error));
}

const validarNombre = (nombre) => {
    let regexNumero = /\d/;
    if (nombre.length < 4) {
        alert('El nombre debe tener 4 o más letras');
    } else if (regexNumero.test(nombre)) {
        alert('Números no permitidos');
    } else {
        post().then((respuesta) => { respuesta == 'Ok' ? jugar(nombre) : alert('El nombre debe ser impar!') });
    }
}

const jugar = (nombre) => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.childNodes[0])
    }
    let board = new gameBoard(10);
    board.draw();
    let personaje = new Character(nombre);
    personaje.draw(0, board.getSize - 1);
    let dado = document.createElement('img');
    document.body.appendChild(dado);
    dado.id = 'dado';
    dado.src = "../img/dado1.png";
    let enemy = new Enemy();
    enemy.draw();
    dado.addEventListener('click', () => {
        if (document.getElementsByClassName('pointer').length === 0) {
            let numeroAletorio = Math.round(Math.random() * 5 + 1);
            personaje.where(numeroAletorio, 10, enemy);
            dado.src = `../img/dado${numeroAletorio}.png`;
        }
    });
    let personajeImg = document.getElementById('character');
    personajeImg.addEventListener('DOMNodeInserted', () => {
        console.log('Me movi');
        if (enemy.cerca(personaje)) {
            console.log('Me pegaron')
            enemy.ataque(personaje);
            if (personaje.muerto()) {
                console.log('Te moristes')
                gameOver();
            }
        }
        if (personaje.win()) {
            alert('Has ganado!');
            if(!localStorage.getItem(nombre) == null){
                if(personaje.getAttempts< localStorage.getItem(nombre)){
                    localStorage.setItem(nombre, String(personaje.getAttempts));
                }
            } else {
                localStorage.setItem(nombre, String(personaje.getAttempts));
            }
            gameOver();
        }
    })
}

const gameOver = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.childNodes[0])
    }
    let gameOver = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = 'Has terminado!';
    gameOver.appendChild(h2);
    gameOver.id = "gameOver";
    let opciones = document.createElement('div');
    let jugarOtra = document.createElement('a');
    jugarOtra.href = '../html/index.html';
    jugarOtra.id = 'jugarOtra';
    jugarOtra.innerText = "Juega otra vez!";
    opciones.appendChild(jugarOtra);
    let tablaPuntuacionesButton = document.createElement('button');
    tablaPuntuacionesButton.addEventListener('click', () => { panelPuntuaciones() });
    tablaPuntuacionesButton.innerText = 'Ver tabla de puntuaciones';
    opciones.appendChild(tablaPuntuacionesButton);
    opciones.id = 'opciones';
    gameOver.appendChild(opciones);
    document.body.appendChild(gameOver);
}


const panelPuntuaciones = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.childNodes[0])
    }
    let panelPuntuaciones = document.createElement('div');
    panelPuntuaciones.className = "panelPuntuaciones";
    let h2 = document.createElement('h2');
    h2.innerText = 'Tabla de puntuaciones';
    let tabla;
    panelPuntuaciones.appendChild(h2);
    tabla = tablaPuntuaciones();
    panelPuntuaciones.appendChild(tabla);
    let volver = document.createElement('a');
    volver.innerText = 'Volver a jugar';
    volver.href = "index.html";
    panelPuntuaciones.appendChild(volver);
    document.body.appendChild(panelPuntuaciones);
}

function tablaPuntuaciones(){
    let puntuaciones = [];
    for (let i = 0; i < localStorage.length; i++) {
        puntuaciones.push({nombre: localStorage.key(i), puntuacion: localStorage.getItem(localStorage.key(i))});
    }
    let tablaPuntuaciones = document.createElement('table');
    let trHead = document.createElement('tr');
    let thNombre = document.createElement('th');
    let thPuntuacion = document.createElement('th');
    thNombre.innerText = 'Nombre';
    thPuntuacion.innerText = 'Puntuacion';
    trHead.appendChild(thNombre);
    trHead.appendChild(thPuntuacion);
    tablaPuntuaciones.appendChild(trHead);
    puntuaciones.forEach(puntuacion => {
        let filaPuntuacion = document.createElement('tr');
        let tdNombre = document.createElement('td');
        let tdPuntuacion = document.createElement('td');
        tdNombre.innerText = puntuacion.nombre;
        tdPuntuacion.innerText = puntuacion.puntuacion;
        filaPuntuacion.appendChild(tdNombre);
        filaPuntuacion.appendChild(tdPuntuacion);
        tablaPuntuaciones.appendChild(filaPuntuacion);
    })
    return tablaPuntuaciones;
}