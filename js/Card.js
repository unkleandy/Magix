class Card {

    constructor(cardData, location) {
        this.location = location;
        this.id = cardData.id;
        this.uid = cardData.uid;
        this.sleeping = cardData.state == "SLEEP";
        this.div = document.createElement("div");
        let cardHTML = document.getElementById("card-template").innerHTML;
        this.div.innerHTML = cardHTML;
        this.div.querySelector(".cost").innerText = cardData.cost;
        this.div.querySelector(".atk").innerText = cardData.atk;
        this.div.querySelector(".hp").innerText = cardData.hp;
        this.div.querySelector(".mechanics").innerText = cardData.mechanics
        if (this.id > 1 && this.id < 65) {
            this.image = "./img/cards/" + this.id + ".png";
        }
        else {
            if (cardData.atk < 3) {
                this.image = "./img/cards/0_plus.png";
            }
            else if (cardData.atk < 5) {
                this.image = "./img/cards/3_plus.png";
            }
            else {
                this.image = "./img/cards/5_plus.png";
            }
        }
        this.div.querySelector(".card").style.background = "url('" + this.image + "')";
        this.div.querySelector(".card").style.backgroundSize = "100% 100%"
        this.taunt = false;
        if (cardData.mechanics.includes("Taunt")) {
            this.taunt = true;
            let node = document.createElement("div");
            node.setAttribute("class", "taunt");
            let container = this.div.querySelector(".special")
            container.appendChild(node);
        }
        this.charge = false;
        this.div.onclick = () => {
            this.selected();
        }
    }

    selected() {
        if (yourTurn && possibleAction) {
            if (this.location == ".player .hand") {
                makeAction("PLAY", this.uid, null);
            }
            if (this.location == ".player .board") {
                selectedCard = this;
            }
            if (this.location == ".opponent .board" && selectedCard != null) {
                makeAction("ATTACK", selectedCard.uid, this.uid)
                selectedCard = null;
            }
        }
    }

    update(cardData) {
        this.hp = cardData.hp;
        this.atk = cardData.atk;
        this.sleeping = cardData.state == "SLEEP";
        this.div.querySelector(".atk").innerText = cardData.atk;
        this.div.querySelector(".hp").innerText = cardData.hp;
        if (this.sleeping == true) {
            this.div.style.opacity = 0.6;
        }
        else {
            this.div.style.opacity = 1;
        }
    }

    show() {
        parent = document.querySelector(this.location);
        parent.appendChild(this.div);
    }

    setLocation(location) {
        this.remove();
        let toParent = document.querySelector(location);
        toParent.appendChild(this.div);
        this.location = location;
    }

    remove() {
        let formParent = document.querySelector(this.location);
        formParent.removeChild(this.div);
        this.location = null;
        window.alert("removed card")
    }

}