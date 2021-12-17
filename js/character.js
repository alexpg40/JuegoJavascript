export default class Character{
    constructor(nom){
        this.nombre = nom;
        this.x = 0;
        this.y = 0;
        this.sprite = "../img/reina.png";
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

    draw(long, lat){
        let box = document.getElementById(`box[${long},${lat}]`);
        let img = document.createElement('img');
        img.src=`${this.getSprite}`;
        box.appendChild(img);
    }
    where(dado){
        let xRight = this.getX + dado;
        let xLeft = this.getY - dado;
        let yTop = this.getX + dado;
        let yBot = this.getY - dado;
    }
}
