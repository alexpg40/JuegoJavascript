"use strict;"

export default class Enemy{

    constructor(sprite = "../img/velocidrome.gif"){
        this.health = 2;
        this.x = 0;
        this.y = 0;
        this.sprite = sprite;
    }
    
    draw(){
        this.x = Math.round(Math.random()*3 + 5);
        this.y = Math.round(Math.random()*4 + 2);
        let divBox = document.getElementById(`box[${this.x},${this.y}]`);
        let imgEnemy = document.createElement('img');
        imgEnemy.className = 'enemy';
        imgEnemy.src = this.sprite;
        divBox.appendChild(imgEnemy);
    }

    moveRandom(){
        let randomX = this.x + Math.round(Math.random()*-2 + 1);
        let randomY = this.y + Math.round(Math.random()*-2 + 1);
        let enemy = document.getElementsByClassName('enemy')[0];
        if(randomX < 10 && randomX > 0){
            this.x = randomX;
            if(randomY < 10 && randomY > 0){
                this.y = randomY;
            }
        } else if(randomY < 10 && randomY > 0){
            this.y = randomY;
        }
        let divBox = document.getElementById(`box[${this.x},${this.y}]`);
        if(!divBox.hasChildNodes()){
            divBox.appendChild(enemy);
        }
    }

    cerca(character){
        let a = Math.sqrt(Math.pow(Math.abs(parseInt(character.getX) - parseInt(this.x)), 2) + Math.pow(Math.abs(parseInt(character.getY) - parseInt(this.y)), 2));
        if(a == 1){
            return true;
        }
        return false;
    }

    ataque(character){
        character.setHealth = character.getHealth - 1;
        let characterImg = document.getElementById('character'); 
    }
}