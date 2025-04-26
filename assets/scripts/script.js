document.addEventListener("DOMContentLoaded", function() {
    // Stores the src of each element into an array
    for (let symbol of symbols) {
    sources.push(symbol.src);
    }
    // Add event listeners to all symbols
    for (let symbol of document.getElementsByClassName("card2-symbol")) {
    symbol.addEventListener("click", responseCheck);
    }
})
// Shuffles cards and choses random symbol on page load
window.addEventListener("load", startGame);

let game = {
    sources: [],
    turns:[],
    correctSymbol: "",
    score: 0,
    secondsLeft: 60
}

let sources = game.sources;
let turns = game.turns;
let symbols = document.querySelectorAll(".symbol");
let correctSymbol = game.correctSymbol;
let secondsLeft = game.secondsLeft;

// Starts the game
function startGame () {
    shuffleTurns();
    pickSymbol();
    startTimer();
}

// Stores unique sequences of numbers between 0 and 17 into turns array
function shuffleTurns () {
    turns = [];
    while (turns.length < 18) {
        let randomNumber = Math.floor(Math.random() * 18);
    
        if (turns.includes(randomNumber) === false){
            turns.push(randomNumber);
        };
    };
    // Shuffles symbols in cards
    for (let i = 0; i < 18; i++) {
    symbols[i].src = sources[turns[i]];
    };
}

// Pick a random symbol to display on both cards
function pickSymbol () {
    const card1Symbols = document.getElementsByClassName("card1-symbol");
    const card2Symbols = document.getElementsByClassName("card2-symbol");
    const randomSymbol = card1Symbols[Math.floor(Math.random() * 9)];
    card2Symbols[Math.floor(Math.random() * 9)].src = randomSymbol.src;
    correctSymbol = randomSymbol;
}

/**
 *  Checks if the symbol clicked is the correct one
 */
function responseCheck (e) {
    if (e.srcElement.src === correctSymbol.src){
        shuffleTurns();
        pickSymbol();
        addScore();
    };
}

// Increase score
function addScore () {
    game.score++
    document.getElementById("score").innerText = game.score;
}

// Set time for the countdown and when reaches 0 stops
function startTimer () {
    secondsLeft = 60;
    let count = setInterval(function() {
    document.getElementById("time").innerHTML = `${secondsLeft}s`;
    secondsLeft--;

    if (secondsLeft < 0 ) {
        clearInterval(count);
        displayModal();
    }
}, 1000);
}

// Display Bootstrap modal with score
function displayModal () {
    const myModal = new bootstrap.Modal("#score-modal");
    document.getElementById("score-message").innerHTML = `You Scored ${game.score}!`;
    myModal.show();
}

let playAgainButton = document.getElementById("play-again");
// Checks that playAgainButton is not null before adding event listeners
if (playAgainButton) {
    playAgainButton.addEventListener("click", function () {
       newGame();
       startGame();
    });
}

function newGame() {
    document.getElementById("score").innerText = 0;
    game.score = 0;
    game.secondsLeft = 60
    };

    
module.exports = { game, addScore, newGame };

