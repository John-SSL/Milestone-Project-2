
const symbols = document.querySelectorAll(".symbol");
const sources = [];
const turns = [];

// stores the src of each element into an array
for (let symbol of symbols) {
    sources.push(symbol.src);
}

// Stores unique number between 0 and 17 into turns array
while (turns.length < 18) {
    let randomNumber = Math.floor(Math.random() * 18);

    if (turns.includes(randomNumber) === false){
        turns.push(randomNumber);
    };
}

// Shuffles symbols in cards
for (let i = 0; i < 18; i++){
    symbols[i].src = sources[turns[i]];
}

// Pick a random symbol to display on both cards
const card1Symbols = document.getElementsByClassName("card1-symbol");
const card2Symbols = document.getElementsByClassName("card2-symbol");
const randomSymbol = card1Symbols[Math.floor(Math.random() * 9)];
card2Symbols[Math.floor(Math.random() * 9)].src = randomSymbol.src;

console.log(randomSymbol.src);

// Add event listeners to all symbols
for (let symbol of card2Symbols) {
    symbol.addEventListener("click", responseCheck);
}

/**
 *  Checks if the symbol clicked is the correct one 
 */
function responseCheck (e) {
    console.log(e.srcElement.src);
    if (e.srcElement.src === randomSymbol.src){
        prompt("Working!");
    };
}



