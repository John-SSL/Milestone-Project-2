
// // Shuffles cards and choses random symbol on page load
window.addEventListener("load", function () {
    shuffleTurns();
    pickSymbol();
});

const sources = [];
let turns = [];
let symbols = document.querySelectorAll(".symbol");
let correctSymbol = "";
let score = document.getElementById("score").innerText;

// // stores the src of each element into an array
for (let symbol of symbols) {
    sources.push(symbol.src);
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
    console.log(randomSymbol.src);
}


// Add event listeners to all symbols
for (let symbol of document.getElementsByClassName("card2-symbol")) {
    symbol.addEventListener("click", responseCheck);
}

/**
 *  Checks if the symbol clicked is the correct one 
 */
function responseCheck (e) {
    console.log(e.srcElement.src);
    if (e.srcElement.src === correctSymbol.src){
        shuffleTurns();
        pickSymbol();
        addScore();
    };
}

// Increase score
function addScore () {
    parseInt(score);
    document.getElementById("score").innerText = ++score;
}

// Set time for the countdown and when reaches 0 stops
let secondsLeft = 10;
let count = setInterval(function() {
    document.getElementById("time").innerHTML = `${secondsLeft}s`;
    secondsLeft--;

    if (secondsLeft <= 0 ) {
        
        clearInterval(count);
        alert(`You Scored ${score}!`);
    }

}, 1000);