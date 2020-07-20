const cards = document.querySelectorAll(".card"); //array of all cards
const button = document.querySelector(".new-game"); //new game button


let isFirst = false; //for checking first cards
let lockBoard = false; //for locking board when two cards are selected
let firstCard, secondCard; //for selecting first and second selected card


let addFlip = () => {     //add event listener so you can flip cards
    cards.forEach(card => {
        card.addEventListener("click", changeSide);
    });
}

var shuffle = () => { //shuffles cards around
    let length = cards.length; //number of all cards
    cards.forEach(card => {
        let orderNum = Math.ceil(Math.random() * length); //giving cards order
        card.style.order = orderNum;
    });
};


var lock = () => { //locks two same cards
    firstCard.removeEventListener("click", changeSide);
    secondCard.removeEventListener("click", changeSide);
    
    resetBoard();
};

resetBoard = () => { //reseting first and second card and whole board
    [firstCard, secondCard] = [null, null];
    [isFirst, lockBoard] = [false, false];

};

var flipBack = () => { //flipping back two different cards
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1200);
}


var checkCards = () => {
    let testCards = firstCard.getAttribute("data-card") === secondCard.getAttribute("data-card");
    testCards ? lock() : flipBack();
};



var changeSide = () => {
    if(lockBoard) {return;}
    var target = event.target;
    target.classList.add('flip');
    flipSide(target);
};



var flipSide = (target) => { //fliping selected card
    if(isFirst == false) { //checking if card is first card selected
        isFirst = true;
        firstCard = target;
    } else {
        lockBoard = true;
        secondCard = target;
        checkCards();
    }

}

let resetCards = () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener("click", changeSide);
    });
}

let resetGame = () => {
    resetBoard();
    resetCards();
    shuffle();
};



shuffle();
addFlip();
button.addEventListener("click", resetGame);