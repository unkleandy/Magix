class Intro {
    constructor() {
        this.nodes = []
        this.nodes[0] = document.querySelector(".intro_magix_tm");
        this.nodes[1] = document.querySelector(".intro_ie");
        this.scale = 0
        this.nodes.forEach(element => {
            element.style.transform = "scale(" + this.scale + "," + this.scale + ")";
        });
    }


    tick() {

        if (this.scale < 1) {
            this.scale = this.scale + 0.05;
        }

        this.nodes.forEach(element => {
            element.style.transform = "scale(" + this.scale + "," + this.scale + ")";
        });

        if (this.scale >= 1) {
            return false
        }
        else {
            return true;
        }
    }

}
