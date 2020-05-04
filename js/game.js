let isSetup = false;
let isWelcome = false;
let cardList = [];
let possibleAction = false;
let selectedCard = null;
let heroClass = null;
let yourTurn = null;


const state = () => {
    let result = $.ajax({
        url: "ajax-state.php",
        type: "POST"
    });
    result.done(function (msg) {
        console.log(msg);
        let reponse = JSON.parse(msg);
        console.log(reponse);
        showState(reponse);

        setTimeout(state, 1000);    // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000);        // Appel initial (attendre 1 seconde)

});

const showMessage = (state) => {
    if (state == "WAITING") {

    }
}
const showState = (state) => {
    if (state == "GAME_NOT_FOUND") {
        // TODO : retourner au lobby
    }
    else if (state == "LAST_GAME_LOST" || state == "LAST_GAME_WON") {
        console.log("endSCREEN");
        endScreen(state);
    }
    else if (state == "WAITING") {
        // TODO : montrer ecran attente
    }
    else {
        if (state instanceof Object) {
            updateCardView(state);
            updateStats(state);
        }
        if (!isSetup) {
            setupBoard(state);
        }
        if (!isWelcome) {
            welcome(state);
        }
    }
}

const setupBoard = (state) => {
    let opponent = document.querySelector(".opponent .heroClass");
    opponent.innerHTML = "<img src ='img/class/" + state.opponent.heroClass + ".png'>";
    opponent.onclick = () => {
        if (selectedCard) {
            makeAction("ATTACK", selectedCard.uid, 0);
        }
        document.querySelector(".opponent .username").innerText = state.opponent.username;
    }

    let player = document.querySelector(".player .heroClass");
    player.innerHTML = "<img src ='img/class/" + state.heroClass + ".png'>";
    heroClass = state.heroClass;
    document.querySelector(".endTurn").onclick = () => {
        makeAction("END_TURN", null, null);
    }


    isSetup = true;
}

// Affiche le welcome text
const welcome = (state) => {
    // TO DO
    // show welcome text
    isWelcome = true;
}

// Met les cartes à jour
const updateCardView = (state) => {
    showActiveCards(state);
}

// Met a jour l'emplacement des carte et efface les cartes qui n'existent plus
const updateCardsLocation = (state) => {
    for (existingCard in cardList)
        if (existingCard instanceof Card) {
            let found = false;
            found += locateCard(existingCard, state.hand, ".player .hand");
            found += locateCard(existingCard, state.board, ".player .board");
            found += locateCard(existingCard, state.opponent.board, ".opponent .board");
            if (!found) {
                console.log("carte non trouvee : " + existingCard.uid)
                existingCard.remove();
                cardList.pop(existingCard);
            }
        }
}

// Localise une carte dans un emplacement
const locateCard = (existingCard, stack, location) => {
    let found = false
    stack.forEach(cardData => {
        if (existingCard.uid == cardData.uid) {
            existingCard.setLocation(location);
            found = true;
        }
    });
    return found;
}

// Ajoute les nouvelles cartes
const showActiveCards = (state) => {
    showCardsInLocation(state.hand, ".player .hand");
    showCardsInLocation(state.board, ".player .board");
    showCardsInLocation(state.opponent.board, ".opponent .board");
}

// Ajoute les nouvelles catres par emplacement
const showCardsInLocation = (stack, location) => {
    let parent = document.querySelector(location);
    parent.innerText = "";
    stack.forEach(cardData => {
        let found = false;
        cardList.forEach(card => {
            if (card.uid == cardData.uid) {
                card.location = location;
                found = true;
                card.update(cardData)
                card.show();
            }
        });

        if (!found) {
            let card = new Card(cardData, location);
            cardList.push(card);
            card.show();
        }
    });
}

const updateStats = (state) => {
    document.querySelector(".opponent .hp").innerText = state.opponent.hp;
    document.querySelector(".player .character .hp").innerText = state.hp;
    document.querySelector(".player .mp").innerText = state.mp;
    yourTurn = state.yourTurn;
    possibleAction = canPlayCard(state) + canAttack(state);
    if (yourTurn && !possibleAction) {
        flash(msg_NoPossibleAction);
        makeAction("END_TURN", null, null);
    }
    let heroPower = document.querySelector(".heroPower");
    if (state.heroPowerAlreadyUsed) {
        heroPower.style.backgroundColor = "deeppink";
        heroPower.onclick = () => { };
    }
    else {
        heroPower.style.backgroundColor = " rgb(128, 255, 0)";
        heroPower.onclick = () => {
            makeAction("HERO_POWER", null, null);
        }
    }

    let your_turn = document.querySelector(".yourTurn")
    if (yourTurn) {
        your_turn.style.display = "block";
    }
    else {
        your_turn.style.display = "none";
    }
}

const cardCanBePlayed = (state, card) => {
    return card.cost <= state.mp ? true : false
}

// détermine si il y a assez de mp pour utiliser heroPower ou jouer une carte
const canPlayCard = (state) => {
    let canPlay = false;
    if (state.mp >= 2 && !state.heroPowerAlreadyUsed) {
        canPlay = true;
    }
    else {
        let minCardCost = 10;
        cardList.forEach(card => {
            if (card.cost < minCardCost) {
                minCardCost = card.cost;
            }
        });
        if (state.mp >= minCardCost) {
            canPlay = true;
        }
    }
    return canPlay;
}

const canAttack = (state) => {
    possibleAttack = false
    state.board.forEach(card => {
        if (card.state != "SLEEP") {
            possibleAttack = true;
        }
    });
    return possibleAttack;
}

const endScreen = (state) => {
    let endscreen = document.querySelector(".endScreen");
    if (state == "LAST_GAME_LOST")
        endscreen.style.backgroundImage = "url('img/LAST_GAME_LOST.png')";
    else
        endscreen.style.backgroundImage = "url('img/LAST_GAME_WON" + heroClass + ".png')"
    endscreen.style.display = "block";

    setTimeout(() => {
        window.location.href = "lobby.php";
    }, 2000);
}













const makeAction = (type, uid, targetuid) => {

    let formData = new FormData();
    formData.append("type", type);
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax-action.php", {
        method: "POST",
        credentials: 'include',
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            if (data instanceof Object) {
                showState(data);
            }
            else {
                flash(data);
            }
        });
}

const flash = (msg) => {
    document.querySelector(".flash").innerText = msg;
    document.querySelector(".flash").style.display = "block";

    setTimeout(() => {
        document.querySelector(".flash").style.display = "none";
    }, 1500);
}
