"use strict;"

export default class Character{
    constructor(nom){
        this.nombre = nom;
        this.x = 0;
        this.y = 0;
        this.health = 2;
        this.sprite = "../img/idle.gif";
        this.attempts = 0;
    }

    get getNombre(){
        return this.nombre;
    }

    get getSprite(){
        return this.sprite;
    }

    get getX(){
        return this.x;
    }

    get getHealth(){
        return this.health;
    }

    get getY(){
        return this.y;
    }

    set setX(j){
        this.x = j;
    }

    set setY(k){
        this.y = k;
    }

    set setHealth(salud){
        this.health = salud;
    }

    get getAttempts(){
        return this.attempts;
    }
    
    set setAttempts(att){
        this.attempts = att;
    }


    //Dibujo en una coordenada el personaje
    draw(long, lat){
        let box = document.getElementById(`box[${long},${lat}]`);
        let img = document.createElement('img');
        img.src=`${this.getSprite}`;
        img.id = 'character';
        box.appendChild(img);
        this.setX = long;
        this.setY = lat;
    }

    /*En esta función comprueba dado el número de tablero, como el número obtenido del dado y la posición personaje hacia que casillas se puede 
    mover si salirte del tablero */
    where(dado, size, enemy){
        //Comprueba sumando la posicion X actual del personaje y el dado, si es menor que el tamaño del tablero, para moverme positivamente en el eje X (derecha)
        if(this.getX + dado < size){
            let boxRight = document.getElementById(`box[${this.getX + dado},${this.getY}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX + dado},${this.getY}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(parseInt(boxPoint[0]), parseInt(boxPoint[1]), size);
                enemy.moveRandom();
            })
            boxRight.appendChild(pointer); 
        }
        //Comprueba restando el dado a la posicion X actual del personaje, si es mayor que 0, para moverme negativamente en el eje Y (izquierda)
        if(this.getX - dado >= 0){
            let boxLeft = document.getElementById(`box[${this.getX - dado},${this.getY}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX - dado},${this.getY}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(parseInt(boxPoint[0]), parseInt(boxPoint[1]), size);
                enemy.moveRandom();
            })
            boxLeft.appendChild(pointer);
        }
        //Compruebo restando el dado a la posicion Y actual del personaje, si es mayor que 0, para moverme negativamente en el eje Y (abajo)
        if(this.getY - dado >= 0){
            let boxBot = document.getElementById(`box[${this.getX},${this.getY - dado}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX},${this.getY - dado}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(parseInt(boxPoint[0]), parseInt(boxPoint[1]), size);
                enemy.moveRandom();
            })
            boxBot.appendChild(pointer);
        }
        //Compruebo sumando el dado y la posicíon X actual del personaje, si es menor que el tamaño del tablero, para moverme positivamente en el eje y (arriba)
        if(this.getY + dado < size){
            let boxTop = document.getElementById(`box[${this.getX},${this.getY + dado}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX},${this.getY + dado}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(parseInt(boxPoint[0]), parseInt(boxPoint[1]), size);
                enemy.moveRandom();
            })
            boxTop.appendChild(pointer);
        }
        this.setAttempts = this.getAttempts+1;
    }

    //Muevo el personaje a otra casilla
    move(x, y){
        let box = document.getElementById(`box[${x},${y}]`);
        let personaje = document.getElementById('character');
        this.setX = x;
        this.setY = y;
        box.appendChild(personaje);
        this.removePointers();
    }

    //Elimino todos los pointers
    removePointers(){
        let pointers = document.getElementsByClassName('pointer');
        while(pointers.length > 0){
            pointers[0].parentNode.removeChild(pointers[0]);
        }
    }

    //Comprueba si el personaje esta muerto
    muerto(){
        return this.getHealth == 0;
    }


    //Compruebo si el personaje ha ganado
    win(){
        return this.getX == 9 && this.getY == 0;
    }

}
