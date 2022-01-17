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


    draw(long, lat){
        let box = document.getElementById(`box[${long},${lat}]`);
        let img = document.createElement('img');
        img.src=`${this.getSprite}`;
        img.id = 'character';
        box.appendChild(img);
        this.setX = long;
        this.setY = lat;
    }

    where(dado, size, enemy){
        console.log(this.attempts);
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
        if(this.getY + dado <= size - 1){
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

    move(x, y){
        let box = document.getElementById(`box[${x},${y}]`);
        let personaje = document.getElementById('character');
        this.setX = x;
        this.setY = y;
        box.appendChild(personaje);
        this.removePointers();
    }

    removePointers(){
        let pointers = document.getElementsByClassName('pointer');
        while(pointers.length > 0){
            pointers[0].parentNode.removeChild(pointers[0]);
        }
    }

    muerto(){
        return this.getHealth == 0;
    }

    win(){
        return this.getX == 9 && this.getY == 0;
    }

}
