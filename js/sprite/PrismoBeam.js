class PrismoBeam {
    constructor(posX, windowheight, spritelist) {
        this.counter = 0
        this.spritelist = spritelist;
        this.x = posX;
        this.windowHeigth = windowheight;
    }

    tick() {
        this.counter += 1;
        let alive = this.counter < 45;
        let nbRays = Math.random() * 15;
        for (let i = 0; i < nbRays; i++) {
            this.spritelist.push(new PrismoRay(this.x, Math.random() * this.windowHeigth));
        }
        if (!alive) {
            this.spritelist.push(new PrismoPickle(this.x))
        }
        return alive;
    }
}


class PrismoRay {
    constructor(posX, posY) {
        this.y = posY;
        this.speed = Math.random() * 2 - 1;
        this.counter = 0;
        let color = Math.random() * 3;
        if (color < 1) {
            this.color = "rgb(251,153,162)";
        }
        else if (color < 2) {
            this.color = "rgb(115,218,255)";
        }
        else {
            this.color = "rgb(255,255,255)";
        }

        this.node = document.createElement("div");
        this.node.classList.add("prismo_ray");
        this.node.style.backgroundColor = this.color;
        this.node.style.top = this.y + "px";
        this.node.style.left = Math.random() * 100 - 50 + posX + "px";

        this.parent = document.querySelector("body");
        this.parent.appendChild(this.node);
    }

    tick() {
        this.counter += 1;
        let alive = this.counter < 45;
        this.y += this.speed;
        this.node.style.top = this.y;
        if (!alive) {
            this.parent.removeChild(this.node);
        }
        return alive;
    }
}


class PrismoPickle {
    constructor(posX) {
        this.opacity = 0;
        this.node = document.createElement("div");
        this.node.classList.add("prismo_pickle");
        this.node.style.bottom = "50px";
        this.node.style.left = posX - 50 + "px";

        this.parent = document.querySelector("body");
        this.parent.appendChild(this.node);
    }

    tick() {
        this.opacity += .02;
        this.node.style.opacity = this.opacity;

        return this.opacity < 1
    }
}





