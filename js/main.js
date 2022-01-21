"uses strict";

import Character from "./character.js";
import Enemy from "./enemy.js";
import gameBoard from "./gameBoard.js";

window.onload = () => {
    let comprobarNombre = document.getElementById('comprobarNombre');
    comprobarNombre.addEventListener('click', () => {
        let nombre = document.getElementById('nombre').value;
        validarNombre(nombre);
    })
    let botonPuntuaciones = document.getElementById('puntuaciones');
    botonPuntuaciones.addEventListener('click', () => {panelPuntuaciones()})
    let botonInstrucciones = document.getElementById('instrucciones');
    botonInstrucciones.addEventListener('click', () => {instrucciones()})
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
        post().then((respuesta) => {
            if(respuesta == 'Ok'){
                let boton = document.getElementById('jugar');
                boton.disabled = false;
                let h2Container = document.querySelector('.container h2');
                h2Container.innerText = `A luchar héroe, ${nombre}`;
                boton.style.backgroundColor = 'red';
                boton.addEventListener('click', (eve) => {
                    jugar(nombre);
                    eve.preventDefault();
                })
            } else{
                alert('El nombre debe ser impar!');
            }
        });
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
    let enemy = new Enemy();
    crearPanelDado(personaje, enemy);
    enemy.draw();
    let personajeImg = document.getElementById('character');
    personajeImg.addEventListener('DOMNodeInserted', () => {
        if (enemy.cerca(personaje)) {
            enemy.ataque(personaje);
            let corazones = document.querySelectorAll("#vidasContainer img");
            for (let i = 0; i < corazones.length; i++) {
                console.log(corazones[i].id);
                if(corazones[i].id == 'corazon_lleno'){
                    console.log(corazones[i].src);
                    corazones[i].src = "../img/corazon_vacio.png";
                    break;
                }
            }
            if (personaje.muerto()) {
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
/*Genera una tabla con las puntuaciones que han sido guardadas en el localStorage */
function tablaPuntuaciones(){
    let puntuaciones = [];
    for (let i = 0; i < localStorage.length; i++) {
        puntuaciones.push({nombre: localStorage.key(i), puntuacion: localStorage.getItem(localStorage.key(i))});
    }
    puntuaciones = puntuaciones.sort((a,b)=>a.puntuacion - b.puntuacion);
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

const crearPanelDado = (personaje, enemigo) => {
    let panelDado = document.createElement('div');
    panelDado.id = "panelDado";
    let nombrePersonaje = document.createElement('h1');
    nombrePersonaje.innerText = personaje.nombre;
    panelDado.appendChild(nombrePersonaje);
    let vidasContainer = document.createElement('div');
    vidasContainer.id = 'vidasContainer';
    let corazon1 = document.createElement('img');
    corazon1.src = '../img/corazon_lleno.png';
    corazon1.id = 'corazon_lleno';
    let corazon2 = document.createElement('img');
    corazon2.src = '../img/corazon_lleno.png';
    corazon2.id = 'corazon_lleno';
    vidasContainer.appendChild(corazon1);
    vidasContainer.appendChild(corazon2);
    panelDado.appendChild(vidasContainer);
    let dado = document.createElement('img');
    dado.id = 'dado';
    dado.src = "../img/dado1.png";
    panelDado.appendChild(dado);
    let intentos = document.createElement('h3');
    intentos.innerText = 'Llevas 0 intentos';
    dado.addEventListener('click', () => {
        if (document.getElementsByClassName('pointer').length === 0) {
            let numeroAletorio = Math.round(Math.random() * 5 + 1);
            personaje.where(numeroAletorio, 10, enemigo);
            dado.src = `../img/dado${numeroAletorio}.png`;
            intentos.innerText = `Llevas ${personaje.attempts} intentos`;
        }
    });
    panelDado.appendChild(intentos);
    document.body.appendChild(panelDado);
}

const instrucciones = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.childNodes[0])
    }
    let divInstrucciones = document.createElement('div');
    divInstrucciones.className = 'instrucciones';
    let h2Instrucciones = document.createElement('h2');
    h2Instrucciones.innerText = 'Como jugar';
    let descripcion = document.createElement('p');
    descripcion.innerText = 'Pulsa sobre el dado para obtener un número del 1 al 6, el número obtenido indicará el número de casillas que puedes moverte. Tu objetivo es llegar al cofre del tesoro, pero ten cuidado!, si te mueves a una casilla de distancia al Velocidrome (lagarto azul), perderás una vida, si eres golpeado 2 veces perderás!'
    divInstrucciones.appendChild(h2Instrucciones);
    divInstrucciones.appendChild(descripcion);
    let volver = document.createElement('a');
    volver.href = 'index.html';
    volver.innerText = 'Volver al menu';
    divInstrucciones.appendChild(volver);
    document.body.appendChild(divInstrucciones);
}