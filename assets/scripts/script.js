
// // Shuffles cards and choses random symbol on page load
window.addEventListener("load", startGame);

const sources = [];
let turns = [];
let symbols = document.querySelectorAll(".symbol");
let correctSymbol = "";
let score = document.getElementById("score").innerText;

// Starts the game
function startGame () {
    shuffleTurns();
    pickSymbol();
    startTimer();
}

// Stores the src of each element into an array
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
    };
}

// Increase score
function addScore () {
    parseInt(score);
    document.getElementById("score").innerText = ++score;
}

// Set time for the countdown and when reaches 0 stops
function startTimer () {

    let secondsLeft = 60;
    let count = setInterval(function() {
    document.getElementById("time").innerHTML = `${secondsLeft}s`;
    secondsLeft--;

    if (secondsLeft < 0 ) {
        
        clearInterval(count);
        displayModal();
    }

}, 1000);

}


// Display Bootsrap modal with score
function displayModal () {
    const myModal = new bootstrap.Modal('#score-modal');
    document.getElementById("score-message").innerHTML = `You Scored ${score}!`;
    myModal.show();
}

document.getElementById("play-again").addEventListener("click", function () {
    startGame();
})
    


