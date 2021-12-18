"use strict;"

export default class Character{
    constructor(nom){
        this.nombre = nom;
        this.x = 0;
        this.y = 0;
        this.sprite = "../img/queen.png";
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
        let pointers = document.getElementsByClassName('pointer');
        while(pointers.length > 0){
            pointers[0].parentNode.removeChild(pointers[0]);
        }
        if(this.getX + dado < size){
            let boxRight = document.getElementById(`box[${this.getX + dado},${this.getY}]`);
            let pointer = document.createElement('div');
            pointer.className = 'pointer';
            pointer.id = `${this.getX + dado},${this.getY}`;
            pointer.addEventListener('click', () => {
                let boxPoint = pointer.id.split(",");
                this.move(boxPoint[0], boxPoint[1]);
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
                this.move(boxPoint[0], boxPoint[1]);
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
                this.move(boxPoint[0], boxPoint[1]);
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
                this.move(boxPoint[0], boxPoint[1]);
            })
            boxTop.appendChild(pointer);
        }
    }

    createTag(){
        let tagName = this.getNombre;
        let tag = document.createElement('div');
        tag.innerText = tagName;
        tag.className = 'tag';
        let divCharacter = document.getElementsByTagName('img')[0];
        let x = divCharacter.offsetLeft;
        let y = divCharacter.offsetTop;
        y-=40;
        tag.style.position = 'relative';
        tag.style.left = x + 'px';
        tag.style.top = y + 'px';
        document.body.appendChild(tag);
    }

    move(x, y){
        let box = document.getElementById(`box[${x},${y}]`);
        let personaje = document.getElementById('character');
        box.appendChild(personaje);
        this.setX = x;
        this.setY = y;
        this.where(3, 10);
    }
}
