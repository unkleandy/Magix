class LoginBox {
    constructor() {
        this.node = document.querySelector("form");
        this.opacity = 0;
    }

    tick() {
        if (this.opacity < 1) {
            this.opacity += .05;
            this.node.style.opacity = this.opacity;
            return true;
        }
        else {
            return false
        }
    }
}