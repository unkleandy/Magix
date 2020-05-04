class Sword {
    constructor(windowWidth) {
        this.node = document.querySelector(".intro_sword");
        this.offset = -1 * windowWidth / 2;
        this.node.style.left = this.offset + "px";

    }


    tick() {
        if (this.offset < 0) {
            this.offset += 20;
            this.node.style.left = this.offset + "px";
            return true;
        }
        else {
            return false
        }
    }
}
