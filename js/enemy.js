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
        this.x = this.x + Math.round(Math.random()*-2 + 1);
        this.y = this.y + Math.round(Math.random()*-2 + 1);
        let enemy = document.getElementsByTagName('enemy')[0];
        let divBox = document.getElementById(`box[${this.x},${this.y}]`);
        divBox.appendChild(enemy);
    }
}