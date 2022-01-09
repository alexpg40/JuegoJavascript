"use strict;"

export default class Character{
    constructor(nom){
        this.nombre = nom;
        this.x = 0;
        this.y = 0;
        this.sprite = "../img/queen.png";
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

    get getY(){
        return this.y;
    }

    set setX(j){
        this.x = j;
    }

    set setY(k){
        this.y = k;
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
        this.createTag();
    }

    where(dado, size){
        console.log(this.attempts);
        if(this.getX + dado < size){
            let boxRight = document.getElementById(`box[${this.getX + dado},${this.getY}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX + dado},${this.getY}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(parseInt(boxPoint[0]), parseInt(boxPoint[1]), size);
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
            })
            boxTop.appendChild(pointer);
        }
        this.setAttempts = this.getAttempts+1;
    }

    createTag(){
        let oldTag = document.getElementsByClassName('tag')[0];
        if(oldTag != undefined){
            oldTag.parentNode.removeChild(oldTag);
        }
        let tagName = this.getNombre;
        let tag = document.createElement('div');
        tag.innerText = tagName;
        tag.className = 'tag';
        let divCharacter = document.getElementsByTagName('img')[0];
        let x = divCharacter.offsetLeft;
        let y = divCharacter.offsetTop;
        y-=34;
        tag.style.position = 'fixed';
        tag.style.left = x + 'px';
        tag.style.top = y + 'px';
        document.body.appendChild(tag);
    }

    move(x, y, size){
        let box = document.getElementById(`box[${x},${y}]`);
        let personaje = document.getElementById('character');
        box.appendChild(personaje);
        this.setX = x;
        this.setY = y;
        this.removePointers();
        this.createTag();
        if(this.getX == size - 1 && this.getY == 0){
            alert('Has ganado!');
        }
    }
    removePointers(){
        let pointers = document.getElementsByClassName('pointer');
        while(pointers.length > 0){
            pointers[0].parentNode.removeChild(pointers[0]);
        }
    }

}
