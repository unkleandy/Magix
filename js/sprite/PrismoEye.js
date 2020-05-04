class PrismoEye {
    constructor() {
        this.node = document.querySelector(".prismo_eye")
        this.xMin = 335;
        this.xMax = 405;
        this.yMin = 155;
        this.yMax = 190;
        this.x = parseInt((this.xMin + this.xMax) / 2);
        this.y = parseInt((this.yMin + this.yMax) / 2);
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
        this.speed = 3;


    }
    tick(mousePosX, mousePosY) {
        this.xDir = this.x < mousePosX ? 1 : -1;
        this.xDir = this.x == mousePosX ? 0 : this.xDir;
        this.x += this.speed * this.xDir;
        this.x = this.xMin < this.x ? this.x : this.xMin;
        this.x = this.xMax > this.x ? this.x : this.xMax;
        this.node.style.left = (this.x) + "px";

        this.yDir = this.y < mousePosY ? 1 : -1;
        this.yDir = this.y == mousePosY ? 0 : this.yDir;
        this.y += this.speed * this.yDir;
        this.y = this.yMin < this.y ? this.y : this.yMin;
        this.y = this.yMax > this.y ? this.y : this.yMax;
        this.node.style.top = (this.y) + "px";
        // console.log(this.x, this.y);
    }
}